var app = getApp();
Page({

  data: {
    shops:[]
  },


  onLoad: function (options) {
    let that = this;
    wx.request({
      method:'GET',
      url: app.globalData.url+'/api/collect/get',
      data:{
        uid : app.globalData.uid
      },
      success:(data)=>{
        that.setData({
          shops:data.data
        })
      }
    })
  },

  onReady: function () {

  },


  onShow: function () {

  },

  switchShop(element){
    let shopId = element.currentTarget.dataset.shopid;
    console.log(shopId)
    //更新app的全局data、更新本地存储、判断是否是管理员
    app.globalData.shopId = shopId;
    wx.setStorageSync("shopId", shopId)
    if(shopId == app.globalData.uid){
      app.globalData.isAdmin = true;
    }else{
      app.globalData.isAdmin = false;
    }
    app.globalData.needFlushFlag = true;
    app.globalData.warehouseFlushFlag = true;
  },

  toMyShop(){
    
    let shopId = app.globalData.uid;
    console.log(shopId)
    app.globalData.shopId = shopId;
    wx.setStorageSync("shopId", shopId)
    app.globalData.isAdmin = true;
    app.globalData.needFlushFlag = true;
    app.globalData.warehouseFlushFlag = true;

  }

})