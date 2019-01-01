//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    openId:'',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    realName: '',
    telNum: '',
    company: '',
    uid : 1
  },
  //上一步
  backToMine: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  onLoad: function (options) {
    let openId = app.globalData.openId;
    wx.request({
      url: app.globalData.url + '/api/user/get-by-id',
      data: {
        openId: openId
      },
      success: (data) => {
        this.setData({
          uid : data.data.uid,
          realName:data.data.realName,
          telNum:data.data.telNum,
          company:data.data.company
        })
      }
    })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //唔信息则添加，有信息则修改信息
  formSubmit: function (e) {
    let that = this;
    let openId = app.globalData.openId;
    let realName = e.detail.value.realName;
    let telNum   = e.detail.value.telNum;
    let company  = e.detail.value.company;
    let userInfo = app.globalData.userInfo;
    let head     = userInfo.avatarUrl;
    let locate   = userInfo.country + ' ' + userInfo.city;
    let nickName = userInfo.nickName;
    
    wx.request({
      method: 'POST',
      url: app.globalData.url + '/api/user/update', //接口地址
      data: {
        openId : openId,
        realName:realName,
        telNum :telNum,
        company : company,
        uid : that.data.uid,
        headPic : head,
        locate: locate,
        nickName: nickName
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        wx.showToast({
          title: '确认成功，等待审核',
          icon:'success',
          duration: 3000
        }),
        wx.switchTab({
          url: '../index/index'
        })

      },
      fail: function (res) {
        console.log('cuowu' + ':' + res)
      }
    })
  },
})
