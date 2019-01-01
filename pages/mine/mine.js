// pages/needUpload/needUpload.js
const app = getApp()
Page({

  data: {

  },
  onShow(){

    wx.setNavigationBarTitle({
       title: app.globalData.title + "的租仓助手"
    })
     
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  toUploadRequire : function(){
    wx.navigateTo({
      url: '../needUpload/needUpload?openId=' + app.globalData.openId
    })
  },
  toUploadWarehouse: function () {
    wx.navigateTo({
      url: '../warehouseUpload/warehouseUpload?openId=' + app.globalData.openId
    })
  },
  toMyWarehouse: function () {
    wx.navigateTo({
      url: '../myWarehouse/myWarehouse?openId=' + app.globalData.openId
    })
  },
  toMyRequire: function () {
    wx.navigateTo({
      url: '../myRequire/myRequire?openId=' + app.globalData.openId
    })
  },
  toAdmin: function () {
    wx.navigateTo({
      url: '../admin/adminPage'
    })
  },

  toChangeShop: function () {
    wx.navigateTo({
      url: '../changeShop/changeShop'
    })
  },

  doCollect: function () {
    wx.request({
      method:"GET",
      url: app.globalData.url+'/api/collect/add',
      data:{
        uid : app.globalData.uid,
        openId:app.globalData.openId,
        shopId:app.globalData.shopId,
      },
      success:(data)=>{
        wx.showToast({
          title: '保存成功！',
          icon: 'success',
          duration: 2000,
        })
      }
    })
  },

  doOpenUp(){
    wx.navigateTo({
      url: '../uploadConfirm/uploadConfirm',
    })
  }

  

})