//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    requireCount: 2,
    requireArray: [],
    pageNum: 1,
    city: 'page',
    moreDataFlag: true,
    openId:'',
  },
  onLoad: function (options) {
    //换城市同时更换
    let openId = options.openId;
    this.loadRequireData(1,openId);
  },

  loadRequireData: function (pageNum,openId) {
    wx.request({
      url: app.globalData.url + '/api/require/get-by-page',
      data: {
        pageNum: pageNum,
        pageSize: 10,
        status:5,
        openId: openId
      },
      success: (data) => {
        let obj = data.data;
        let resultArray = obj.results.data.list;
        for (let i = 0; i < resultArray.length; i++) {
          let objTemp = resultArray[i];
          let title = objTemp.locates + "求租" + objTemp.area + "平米";
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

  loadPage: function () {
    let pageNum = this.data.pageNum + 1;
    this.loadRequireData(pageNum);
    this.setData({ pageNum: pageNum });
    if (this.data.requireCount / 10 < pageNum) {
      this.setData({ moreDataFlag: false });
    }
  },
  listClick: function (event) {
    console.log(event);
    var requireId = event.currentTarget.id;
    var openId = event.currentTarget.dataset.postId
    let url1 = '/pages/needDetail/needDetail?requireId=' + requireId + '&openId=' + openId;
    wx.navigateTo({ url: url1 })
  }

})
