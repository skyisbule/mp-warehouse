// pages/warehouseDetail/warehouseDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pictureArray: [],
    title:'',
    area:'',
    locates:'',
    remark:'',
    floor:'',
    price:11,
    advantage:'',
    realName:'',
    telNum:'',
    units:[],
    advantageArray:[],
    parkServiceArray:[],
    codePic:'',
    isAdmin:false,
    jdConfig:{
      width: 828,
      height: 1472,
      backgroundColor: '#fff',
      debug: false,
      blocks: [

      ],
      texts: [
        
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
          text: '获取最新供应信息',
          fontSize: 32,
          color: '#69635b',
          zIndex: 2
        },
      ],
      images: [
        
      ],
      lines: [
        {
          startX: 440,
          startY: 1150,
          endX: 440,
          endY: 1300,
          width: 5,
          color: "#69635b",
        }
      ]

    }

  },
  onShow(){
    this.setData({
      isAdmin : app.globalData.isAdmin
    })
  }
  ,
  onLoad: function (options) {
    let warehouseId = options.warehouseId;
    let openId = options.openId;
    if (options.scene) {
      let wid = options.scene;
      warehouseId = wid;
    }
    this.setData({
      warehouseId : warehouseId
    })
    wx.request({
      url: app.globalData.url + '/api/warehouse/get-detail-by-wid',
      data: {
        wid: warehouseId
      },
      success: (data) => {
        //2018-10-27 把拿到的结果挂载到app。globaldata里
        app.globalData.warehouseData = data.data;
        //2018-10-30 全局更新shopId
        wx.setStorageSync("shopId", data.data.warehouse.shopId)
        let warehouse = data.data.warehouse;
        let openId    = warehouse.openId;
        let units = data.data.units;
        let area=0;
        for (let i = 0; i < units.length; i++) {
          let objTemp = units[i];
          area += objTemp.area ;
          objTemp.price = (parseFloat(objTemp.price)/100).toFixed(2);
        }
        let title = warehouse.locate + "-" + area + "平方米仓库出租";
        let advantageArray = warehouse.advantage.split(' ');
        let parkServiceArray = warehouse.parkService.split(' ');
        let picData = [];
        
        if (warehouse.picture == '' || warehouse.picture == null){
          let picture = { url: '/images/index/warehouse.jpg'};
          picData.push(picture)
        }else{
          if (warehouse.picture != null) {
          let pictureArray = warehouse.picture.split(' ');
          for (let loop = 0; loop < pictureArray.length; loop++) {
            let tempObj = {
              url: pictureArray[loop]
            }
            picData.push(tempObj)
            }
          }
        }
        this.setData({
          units : units,
          remark: warehouse.remark,
          title:title,
          advantageArray: advantageArray,
          parkServiceArray: parkServiceArray,
          pictureArray : picData
        })
        wx.request({
          url: app.globalData.url + '/api/user/get-by-id',
          data: {
            openId: openId
          },
          success: (data) => {
            console.log(data)
            let phoneCall = data.data.realName + " ：" + data.data.telNum;
            let telNum = data.data.telNum;
            this.setData({
              phoneCall: phoneCall,
              telNum: telNum
            })
            this.initPoster();
          }
        })
      }
    })  
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: this.data.title,
      path: '/pages/warehouseDetail/warehouseDetail?openId=' + app.globalData.openId + '&warehouseId=' + warehouseId,             success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  //打电话
  phoneCall: function (e) {
    let phoneNumber = e.currentTarget.dataset.getphone;
    wx.makePhoneCall({
      phoneNumber: phoneNumber,
    })
  },
  createQrcode: function () {
    let that = this;
    wx.request({
      method: 'GET',
      url: app.globalData.url + '/wechat/user/createCodeWarehouse?wid=' + that.data.warehouseId,
      success: function (data) {
        let key = data.data;
        let fullUrl = "https://pic.warehouse.saiwoyun.com/" + key;
      }
    })

  },
  initPoster : function(){
    let that = this;
    wx.request({
      method: 'GET',
      url: app.globalData.url + '/wechat/user/createCodeWarehouse?wid=' + that.data.warehouseId,
      success: function (data) {
        let key = data.data;
        let fullUrl = "https://pic.warehouse.saiwoyun.com/" + key;

        let Config = that.data.jdConfig;
        //渲染图片
        let imageUrl = that.data.pictureArray[0].url;
        console.log(imageUrl)
        let image = {
          width: 828,
          height: 500,
          x: 0,
          y: 0,
          url: imageUrl,
          zIndex: 11
        }
        Config.images.push(image);
        //开始渲染标题
        let title = that.data.title;
        let titleText = {
          x: 30,
          y: 530,
          baseLine: 'middle',
          text: title,
          fontSize: 38,
          color: '#090909',
          zIndex: 2
        }
        Config.texts.push(titleText)
        //开始循环渲染楼层。
        let units = that.data.units;
        let max = units.length;
        if (max > 4) max = 4;
        for (let i = 0; i < max; i++) {
          let textFloor = units[i].floor + "                " + units[i].area + "平方米              " + units[i].price + "元/月";
          let textObj = {
            x: 60,
            y: 600 + 45 * i,
            baseLine: 'middle',
            text: textFloor,
            fontSize: 32,
            color: '#090909',
            zIndex: 2
          }
          Config.texts.push(textObj)
        }
        let remarkY = 45* (max-1);
        //开始渲染备注   每行20个字符
        let remarks = that.data.remark.replace("\n","");
        let remarkArray = [];
        //   切割备注的字符串
        for (let loop = 0; loop < 7; loop++) {
          if (remarks.length < 21) {
            remarkArray.push(remarks)
            break;
          }
          let end = 20;
          let returnFlag = false;
          if (remarks.length - loop * 20 < 20) {
            end = remarks.length - loop * 20;
            returnFlag = true;
          }
          let str = remarks.substr(loop * 20, end);
          remarkArray.push(str);
          if (returnFlag)
            break;
        }
        //循环渲染备注
        for (let loop = 0; loop < remarkArray.length; loop++) {
          let remarkObj = {
            x: 40,
            y: 700 + 52 * loop + remarkY,
            baseLine: 'middle',
            text: remarkArray[loop],
            fontSize: 34,
            color: 'black',
            zIndex: 2
          }
          Config.texts.push(remarkObj);
        }
        //渲染一下二维码
        let codePicObj = {
          width: 250,
          height: 250,
          x: 140,
          y: 1100,
          url: fullUrl,
          zIndex: 3
        }
        Config.images.push(codePicObj);
        //渲染一下手机号
        let telObj = {
          x: 140,
          y: 1050,
          baseLine: 'middle',
          text: '  '+that.data.phoneCall,
          fontSize: 42,
          color: '#f39f26',
          zIndex: 2
        }
        Config.texts.push(telObj);
        
        that.setData({
          jdConfig: Config
        })


      }

    })

  },
  onPosterSuccess(e) {
    
    console.log(this.data.jdConfig)
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
  toEdit:function(){
    wx.navigateTo({
      url: '/pages/warehouseEdit/warehouseEdit',
    })
  },
  setPass: function () {
    let that = this;
    wx.request({
      method: "GET",
      url: app.globalData.url + '/api/warehouse/pass',
      data: {
        pass: 1,
        wid: that.data.warehouseId,
      },
      success: (data) => {
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
      url: app.globalData.url + '/api/warehouse/pass',
      data: {
        pass: 2,
        wid: that.data.warehouseId,
      },
      success: (data) => {
        wx.showToast({
          title: '拒绝成功！',
          icon: 'fail',
        })
      },
      fail: () => {
        wx.showToast({
          title: '请求失败',
          icon: 'fail',
        })
      }
    })
  }
})