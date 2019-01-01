//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    warehouseCount: 2,
    warehouseArray: [],
    pageNum: 1,
    city: 'page',
    moreDataFlag: true,
  },

  onShow: function () {
    wx.setNavigationBarTitle({
      title: app.globalData.title + "的租仓助手"
    })
    this.setData({
      warehouseCount : app.globalData.warehouseCount
    })
  
    //换城市同时更换
    let thisCity = this.data.city;
    let globalCity = app.globalData.city;

    if (thisCity == globalCity && !app.globalData.warehouseFlushFlag &&this.data.warehouseCount == app.globalData.warehouseCount)
      return;

    app.globalData.warehouseFlushFlag = false;
    console.log(thisCity + "  "+globalCity)

    this.setData({
      city : globalCity,
      warehouseCount: app.globalData.warehouseCount,
      pageNum: 1,
      warehouseArray : []
    });

    this.loadRequireData(1);

  },

  loadRequireData: function (pageNum) {
  
    wx.request({
      url: app.globalData.url + '/api/warehouse/get-warehouse-all-by-page',

      data: {
        pageNum: pageNum,
        pageSize: 10,
        status: app.globalData.status,
        city: app.globalData.city,
        shopId:app.globalData.shopId
      },

      success: (data) => {
        data = data.data;
        let dataArray = new Array();
        let warehouse ;
        let units;

        for(let i = 0 ; i<data.length ;i++){

          let obj = {
            wid : 1,
            openId : '',
            locate : '1',
            area : 2,
            price : 0,
            date:'',
            picture : '',
          }

          warehouse = data[i].warehouse;
          units = data[i].units;
          let totalArea = 0;
          let price = 0;
          for(let j = 0; j < units.length; j++){
            totalArea += units[j].area;
          }
          let picture = '';
          console.log(warehouse.picture == null)
          if (warehouse.picture ==null ||warehouse.picture.length == 0){
            picture = '/images/index/warehouse.jpg';
            obj.picture = picture;
          }
          else{
            picture = warehouse.picture.split(' ');
            obj.picture = picture[0];
          }
          obj.openId = warehouse.openId;
          obj.wid = warehouse.wid;
          obj.area = totalArea;
          obj.locate = warehouse.locate.substring(warehouse.locate.indexOf(" "));
          if(units.length>0)
            obj.price = units[0].price/100;
          obj.date = warehouse.createTime.split(" ")[0];

          dataArray.push(obj);

        }

        
        //数据连接，10条后接上10条
        let nowData = this.data.warehouseArray;
        let res = nowData.concat(dataArray);

        this.setData({ warehouseArray : res});

      }
    })
  },

  loadPage: function () {
    let pageNum = this.data.pageNum + 1;
    this.loadRequireData(pageNum);
    this.setData({ pageNum: pageNum });
    if (this.data.warehouseCount / 10 < pageNum) {
      this.setData({ moreDataFlag: false });
    }

  },
  listClick: function (event) {
    console.log(event);
    var warehouseId = event.currentTarget.dataset.wid;
    var openId = event.currentTarget.dataset.open;
    let url1 = '/pages/warehouseDetail/warehouseDetail?warehouseId=' + warehouseId + '&openId=' + openId;
    console.log(url1)
    wx.navigateTo({ url: url1 })
  } 

})
