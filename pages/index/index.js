const app = getApp()
let util = require("../../utils/util.js")

Page({
  data: {
    requireCount : 0,
    warehouseCount : 0,
    city: '',
    cityPickerValue: [0, 0],
    cityPickerIsShow: false,
    region: ['全部', '全部', '全部'],
    customItem: '全部',
    shopId :0,
  },
  //城市选择
  bindRegionChange: function (e) {
    this.cityChecked();
    let city = this.data.city;
    this.setData({
      region:e.detail.value,
      city:city
    })
    app.globalData.region = e.detail.value;
    this.countRequire();
    this.countWarehouse();
  },
  countRequire : function(){
    this.cityChecked();
    let city = this.data.city;
    wx.request({
      url: app.globalData.url + '/api/require/count-by-status?status='+app.globalData.status+'&city=' + city+'&shopId='+ app.globalData.shopId,
      success: (data) => {
        app.globalData.requireCount = data.data;
        this.setData({ requireCount: data.data })
      }
    })
  },
  cityChecked : function(){
    let city = '';
    let region = this.data.region;
    if (region[0] != '全部' && region[1] ==  '全部' && region[2] == '全部')
      city = region[0];
    else if (region[0] != '全部' && region[1] != '全部' && region[2] == '全部' )
      city = region[1];
    else if (region[1] == '全部' && region[0] == '全部' && region[2] == '全部')
      city = '';
    else
      city = region[2];
    this.setData({
      city:city
    })
    app.globalData.city = city;
  },
  countWarehouse : function(){
    let that = this;
    this.cityChecked();
    let city = that.data.city;
    wx.request({
      url: app.globalData.url + '/api/warehouse/count-warehouse?status=' + app.globalData.status +'&city=' + city + '&shopId=' + app.globalData.shopId,
      success: (data) => {
        app.globalData.warehouseCount = data.data;
        this.setData({ warehouseCount: data.data })
      }
    })
    //在这里进行本地存储
    wx.getStorage({
      key: 'historyCity',
      success: function (data) {
        let region = that.data.region;
        let obj = {
          storageTime: Date.parse(new Date()),
          region: region
        }
        let array = data.data;
        let firstCity = array[0].region[2];
        if(that.data.city == firstCity)
          return ;
        array.unshift(obj)
        let newArray = array;
        if(array.length>6){
          newArray = new Array();
          for(let i = 0;i<6;i++){
            newArray.push(array[i])
          }
          array = newArray;
        }
        wx.setStorage({
          key: 'historyCity',
          data: array,
        })
      },
      fail: function (data) {
        //走到这里代表目前是没有缓存数据的 直接设置
        let region = that.data.region;
        let obj = {
          storageTime: Date.parse(new Date()),
          region : region
        }
        let array = [];
        array.push(obj)
        wx.setStorage({
          key: 'historyCity',
          data: array,
        })
      }
    })
  },

  onLoad: function () {
    
    let that = this;
    try {
      var value = wx.getStorageSync('shopId')
      console.log("index开始读取shopid："+value + "类型为："+typeof(value))
      if(value > 0){
        console.log("index开始设置全局的shopid：" + value)
        app.globalData.shopId = value;
      }
      else{
        console.log("set value+" + value)
        wx.setStorageSync("shopId", 6)
        app.globalData.shopId = 6;
      }
    } catch (e) {
      wx.setStorageSync("shopId", 6)
    }
    this.setData({
      shopId: app.globalData.shopId
    })
    //更新一下标题
    console.log("index标题开始读取shopid：" + app.globalData.shopId)
    wx.request({
      method:"GET",
      url: app.globalData.url +'/api/user/get-by-uid',
      data:{
        uid:app.globalData.shopId
      },
      success:(data)=>{
        let user = data.data;
        wx.setNavigationBarTitle({
          title: user.realName+"的租仓助手"
        })
        app.globalData.title = user.realName;
      }
    })
    


    this.setData({
      city : app.globalData.city
    })

    wx.getStorage({
      key: 'historyCity',
      success: function (data) {
        let array = data.data;
        let region = array[0].region;
        let region1 = region[1];
        let region2 = region[2];
        let cityName = '全部';
        if (region2 == '全部')
          cityName = region1;
        if (region1 == '')
          cityName = '全部';
        that.setData({
          region: region,
          city : cityName
        })
        app.globalData.region = region;
      }
    })

    setTimeout(function(){
      that.countWarehouse()
    },500);
    setTimeout(function(){
      that.countRequire()
    }, 500);

  },
  onShow: function () {

    if (app.globalData.shopId == app.globalData.uid){
      console.log("检测到是管理员")
      wx.showToast({
        title: '检测到您是管理员',
      })

      app.globalData.status = 5;
      app.globalData.isAdmin = true;
    }

    if(app.globalData.shopId!=this.data.shopId)
      this.onLoad();
    if(this.data.city == app.globalData.city)
      return ; 

    this.setData({
      city: app.globalData.city,
      region: app.globalData.region
    })

    this.countRequire();
    this.countWarehouse();

  },
  /**
  * 城市选择确认
  */
  cityPickerOnSureClick: function (e) {
    let prov = e.detail.valueName[0];
    let city = e.detail.valueName[1];
    let selectCity = city == '市辖区' ? prov : city ;
    this.setData({
      city: selectCity,
      cityPickerValue: e.detail.valueCode,
      cityPickerIsShow: false,
    });
    this.countRequire();
    this.countWarehouse();
    app.globalData.city = selectCity;
    
  },
  /**
   * 城市选择取消
   */
  cityPickerOnCancelClick: function (event) {
    this.setData({
      cityPickerIsShow: false,
    });
  },


  showCityPicker() {
    this.setData({
      cityPickerIsShow: true,
    });
  },
  toUploadRequire: function () {
    wx.navigateTo({
      url: '../needUpload/needUpload?openId=' + app.globalData.openId
    })
  },
  toUploadWarehouse: function () {
    wx.navigateTo({
      url: '../warehouseUpload/warehouseUpload?openId=' + app.globalData.openId
    })
  },
  toRequire: function () {
    wx.switchTab({
      url: '../need/need'
    })
  },
  toWarehouse: function () {
    wx.switchTab({
      url: '../warehouse/warehouse'
    })
  },
  toCitySelected:function (){
    wx.navigateTo({
      url:'../city/city'
    })
  },
  doReflush(){
    this.onLoad();
  }
})
