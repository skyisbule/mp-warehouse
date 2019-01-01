// pages/myWarehouse/myWarehouse.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    warehouseCount: 2,
    warehouseArray: [],
    pageNum: 1,
    city: 'page',
    moreDataFlag: true,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let openId = options.openId;
    this.loadRequireData(1,openId);
  },
  loadRequireData: function (pageNum, openId) {
    wx.request({

      url: app.globalData.url + '/api/warehouse/get-warehouse-all-by-page',

      data: {
        pageNum: pageNum,
        pageSize: 10,
        status:5,
        openId:openId
      },

      success: (data) => {
        data = data.data;
        let dataArray = new Array();
        let warehouse;
        let units;
        for (let i = 0; i < data.length; i++) {

          let obj = {
            locate: '1',
            area: 2,
            price: 0,
            date: '',
            openId : '',
            wid : '',
            picture : '',
          }

          warehouse = data[i].warehouse;
          units = data[i].units;
          let totalArea = 0;
          let price = 0;
          for (let j = 0; j < units.length; j++) {
            totalArea += units[j].area;
          }
          let picture = '';
          console.log(warehouse.picture)
          if (warehouse.picture.length == 0) {
            picture = '/images/index/warehouse.jpg';
            obj.picture = picture;
          }
          else {
            picture = warehouse.picture.split(' ');
            obj.picture = picture[0];
          }
          obj.openId = warehouse.openId;
          obj.wid = warehouse.wid;
          obj.area = totalArea;
          obj.locate = warehouse.locate;
          if (units.length > 0)
            obj.price = units[0].price / 100;
          obj.date = warehouse.createTime.split(" ")[0];

          dataArray.push(obj);

        }

        console.log(dataArray.length + "sss")
        //数据连接，10条后接上10条
        let nowData = this.data.warehouseArray;
        let res = nowData.concat(dataArray);

        this.setData({ warehouseArray: res });

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