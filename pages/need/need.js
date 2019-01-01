//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    requireCount: 2,
    requireArray:[],
    pageNum : 1,
    city : 'page',
    moreDataFlag :true,
    telNum : '',
    shopId : 6,
  },
  onShow: function () {
    wx.setNavigationBarTitle({
      title: app.globalData.title + "的租仓助手"
    })
    this.setData({
      requireCount : app.globalData.requireCount
    })
    //换城市同时更换
    let thisCity   = this.data.city;
    let globalCity = app.globalData.city;

    if (thisCity == globalCity && !app.globalData.needFlushFlag)
       return ;

    app.globalData.needFlushFlag = false;

    this.setData({
       requireCount : app.globalData.requireCount,
       city: app.globalData.city,
       pageNum : 1,
       requireArray : []
       });
    
    this.loadRequireData(1);
  },

  loadRequireData : function(pageNum){
    wx.request({
      url: app.globalData.url + '/api/require/get-by-page',
      data: {
        pageNum: pageNum,
        pageSize: 10,
        status: app.globalData.status,
        city: app.globalData.city,
        shopId:app.globalData.shopId
      },
      success: (data) => {
        let obj = data.data;
        let resultArray = obj.results.data.list;
        for (let i = 0; i < resultArray.length; i++) {
          let objTemp = resultArray[i];
          let locates = objTemp.locates.split(' ');
          let title = locates[0] + "求租" + objTemp.area + "平米";
          objTemp.title = title;
          let phoneCall = objTemp.realName + " ：" + objTemp.telNum;
          objTemp.phoneCall = phoneCall;
        }
        let nowData = this.data.requireArray;
        let res = nowData.concat(resultArray);
        this.setData({ requireArray: res })
      }
    })
  },

  loadPage : function(){
      let pageNum = this.data.pageNum+1;
      this.loadRequireData(pageNum);
      this.setData({ pageNum: pageNum });
      if (this.data.requireCount/10<pageNum){
        this.setData({ moreDataFlag: false });
       }
  },
  listClick:function(event) {
    console.log(event);
    var requireId = event.currentTarget.id;
    var openId = event.currentTarget.dataset.postId
    let url1 = '/pages/needDetail/needDetail?requireId=' + requireId + '&openId=' + openId;
    wx.navigateTo({ url: url1 })
  },
  //打电话
  phoneCall: function (e) {
    let phoneNumber = e.currentTarget.dataset.getphone;
    wx.makePhoneCall({
      phoneNumber: phoneNumber,
    })
  }

})
