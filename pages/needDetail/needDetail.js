// pages/needDetail/needDetail.js
import posterBuilder from "../../components/miniprogram_dist/poster/poster";
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    requireId:'',
    openId:'',
    area:1,
    floorRequire:22,
    purpose:'',
    realName:'',
    remark:'',
    telNum:'',
    fireControlRequire:'',
    floorRequire:'',
    platformRequire:'',
    remark:'', 
    headPic:'/images/index/warehouse.jpg',
    codePicDownLoad : '',
    isAdmin:false,
    jdConfig: {
      width: 828,
      height: 1472,
      backgroundColor: '#fff',
      debug: false,
      preload : false,
      blocks: [
        {
          width: 828,
          height: 220,
          x: 0,
          y: 0,
          borderWidth: 2,
          borderColor: '#1ca9f3',
          backgroundColor: "#1ca9f3",
          zIndex : 1
        }
      ],
      texts: [
        {
          x: 210,
          y: 140,
          baseLine: 'middle',
          text: '客户经理',
          fontSize: 28,
          color: '#f7fbfa',
          zIndex: 2
        },
        {
          x: 40,
          y: 300,
          baseLine: 'middle',
          text: '需要区域：',
          fontSize: 32,
          color: '#babfbe',
          zIndex: 2
        },
        {
          x: 40,
          y: 380,
          baseLine: 'middle',
          text: '需求面积：',
          fontSize: 32,
          color: '#babfbe',
          zIndex: 2
        },
        {
          x: 40,
          y: 460,
          baseLine: 'middle',
          text: '用      途：',
          fontSize: 32,
          color: '#babfbe',
          zIndex: 2
        },
        {
          x: 140,
          y: 1000,
          baseLine: 'middle',
          text: '   联系电话：17328308021',
          fontSize: 42,
          color: '#f39f26',
          zIndex: 2
        },
        {
          x: 480,
          y: 1190,
          baseLine: 'middle',
          text: '长按二维码',
          fontSize: 32,
          color: '#69635b',
          zIndex: 2
        },
        {
          x: 480,
          y: 1240,
          baseLine: 'middle',
          text: '获取最新需求信息',
          fontSize: 32,
          color: '#69635b',
          zIndex: 2
        },
      ],
      images: [

      ],
      lines:[
        {
          startX : 440,
          startY : 1150,
          endX   : 440,
          endY   : 1300,  
          width  : 5,
          color  : "#69635b",
        }
      ]

    },

  },
  initHeadPic : function(openId){
    wx.request({
      url: app.globalData.url + '/api/user/get-by-id',
      data: {
        openId: openId
      },
      success: (data) => {
        this.setData({
          headPic : data.data.headPic
        })
      }

    })
  }
  ,
  onShow() {
    this.setData({
      isAdmin: app.globalData.isAdmin
    })
  }
  ,


  onLoad: function (options) {
    let that = this;
    let requireId = options.requireId;
    let openId = options.openId;
    if(options.scene){
      let rid = options.scene;
      requireId = rid; 
    }
    this.setData({
      requireId : requireId
    })
    wx.request({
      url: app.globalData.url + '/api/require/get-by-id',
      data: {
        rid:requireId
      },
      success: (data) => {
          console.log(data.data)
          let locates = data.data.locates.substring(0, data.data.locates.length - 1).split(' ');
          console.log(data.data)
          //2018-10-30 全局更新shopId
          wx.setStorageSync("shopId", data.data.shopId)
          //2018-10-27 把拿到的结果挂载到app。globaldata里
          app.globalData.needData = data.data;
          this.setData({
            area:data.data.area,
            locates: locates,
            purpose:data.data.purpose,
            remark: data.data.remark,
            fireControlRequire: data.data.fireControlRequire,
            floorRequire: data.data.floorRequire,
            platformRequire: data.data.platformRequire,
            remark:data.data.remark            
          })

        wx.request({
          url: app.globalData.url + '/api/require/get-user-by-rid',
          data: {
            rid: requireId
          },
          success: (data) => {
            this.setData({
              realName: data.data.realName,
              telNum: data.data.telNum
            })
            let headTemp = "/images/index/warehouse.jpg";
            if (data.data.headPic != null) {
              if (data.data.headPic.length > 10){
                headTemp = data.data.headPic;
                this.setData({ headPic: headTemp })
              }
            }
            console.log(that.data.locates + headTemp)
            wx.request({
              method: 'GET',
              url: app.globalData.url + '/wechat/user/createCodeRequire?rid=' + that.data.requireId,
              success: function (data) {
                let key = data.data;
                let fullUrl = "https://pic.warehouse.saiwoyun.com/" + key;
                that.initPoster(that.data.locates, headTemp, fullUrl);
              }
            })
            
          }
        })

      }
    })
      
    
    
  },

  onShareAppMessage: function (res) {
    let that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: this.data.locates + '求租' +this.data.area + '平方米',
      path: '/pages/needDetail/needDetail?openId=' + app.globalData.openId + '&requireId=' + that.data.requireId,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  phoneCall: function (e) {
    let phoneNumber = e.currentTarget.dataset.getphone;
    wx.makePhoneCall({
      phoneNumber: phoneNumber,
    })
  },
  createQrcode : function(){
    let that = this;
    wx.request({
      method :'GET',
      url: app.globalData.url +'/wechat/user/createCodeRequire?rid='+that.data.requireId,
      success : function(data){
        let key = data.data;
        let fullUrl = "https://pic.warehouse.saiwoyun.com/"+key;
      }
    })
  //海报生成部分
  },
  initPoster: function (locates, headTemp, codePic){
    let that = this;
    let poster_data = this.data.jdConfig;
    let poster_text = poster_data.texts;
    poster_text[2].y -= 40;
    poster_text[3].y -= 40;
    //循环渲染需求位置
    for(let loop = 0;loop<locates.length;loop++){
      
      let locateObj = {
        x: 200,
        y: 300 + 60*loop,
        baseLine: 'middle',
        text: locates[loop],
        fontSize: 32,
        color: '#090909',
        zIndex: 3
      }

      poster_text.push(locateObj);
      //整体下移
      poster_text[2].y += 50;
      poster_text[3].y += 50;
    }
    //开始渲染需求面积
    let area = {
      x: 200,
      y: 380 - 40 + 50*(locates.length),
      baseLine: 'middle',
      text: that.data.area,
      fontSize: 32,
      color: '#090909',
      zIndex: 2
    }
    poster_text.push(area);
    //开始渲染用途
    let purpose = {
      x: 200,
      y: 460 -40 + 50 * (locates.length ),
      baseLine: 'middle',
      text: that.data.purpose,
      fontSize: 32,
      color: '#090909',
      zIndex: 2
    }
    poster_text.push(purpose);
    //开始渲染备注   每行20个字符
    let remarks = that.data.remark;
    let remarkArray = [];
    //   切割备注的字符串
    for(let loop = 0;loop<7;loop++){
      if(remarks.length<21){
        remarkArray.push(remarks)
        break;
      }
      let end = 20;
      let returnFlag = false;
      if(remarks.length - loop*20 <20){
        end = remarks.length - loop*20;
        returnFlag = true;
      }
      let str = remarks.substr(loop*20,end);
      remarkArray.push(str);
      if(returnFlag)
        break;
    }
    //循环渲染备注
    for(let loop = 0;loop < remarkArray.length;loop++){
      let remarkObj = {
        x: 40,
        y: 660 + 50 * loop,
        baseLine: 'middle',
        text: remarkArray[loop],
        fontSize: 32,
        color: 'black',
        zIndex: 2
      }
      poster_text.push(remarkObj);
    }
    //开始渲染手机号
    poster_text[4].text = "联系电话："+that.data.telNum;
    //开始渲染头像
    let headPicObj = {
      width: 100,
      height: 100,
      x: 40,
      y: 60,
      url: headTemp,
      zIndex: 3
    }
    let codePicObj = {
      width: 250,
      height: 250,
      x: 140,
      y: 1100,
      url: codePic,
      zIndex: 3
    }
    poster_data.images.push(headPicObj);
    poster_data.images.push(codePicObj);
    //渲染真实姓名
    let realName = {
      x: 180,
      y: 90,
      baseLine: 'middle',
      text: that.data.realName,
      fontSize: 42,
      color: '#f7fbfa',
      zIndex: 2
    }
    poster_text.push(realName)
    this.setData({
      jdConfig: poster_data
    })

    console.log(poster_data)
    
  }
  ,
  onPosterSuccess(e) {

    const { detail } = e;
    wx.previewImage({
      current: detail,
      urls: [detail]
    })
  },
  onPosterFail(err) {
    console.error(err);
  },

  onCreatePoster() {
    posterBuilder.create();
  },

  //跳转到编辑页面
  toEdit : function(){
    wx.navigateTo({
      url: '/pages/needEdit/needEdit'
    })
  },
  setPass: function () {
    let that = this;
    wx.request({
      method: "GET",
      url: app.globalData.url + '/api/require/pass',
      data: {
        pass: 1,
        rid: that.data.requireId,
      },
      success:(data)=>{
          wx.showToast({
            title: '通过成功',
            icon: 'success',
          })
      },
      fail: () => {
        wx.showToast({
          title: '请求失败',
          icon: 'fail',
        })
      }
    })
  },
  setNotPass: function () {
    let that = this;
    wx.request({
      method: "GET",
      url: app.globalData.url + '/api/require/pass',
      data: {
        pass: 2,
        rid: that.data.requireId,
      },
      success:(data)=>{
          wx.showToast({
            title: '拒绝成功！',
            icon: 'fail',
          })
      },
      fail:()=>{
        wx.showToast({
          title: '请求失败',
          icon: 'fail',
        })
      }
    })
  },

  backToIndex(){
    wx.switchTab({
      url: '../index/index'
    })
  }



})