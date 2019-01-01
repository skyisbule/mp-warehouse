// pages/needUpload/needUpload.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId:'',
    cityArray: [{ cid: 1, region: ['广东省', '广州市', '海珠区'] }],
    dates: '2018-10-2',
    facilityArray: ['不限喷淋', '需要喷淋'],
    facilityIndex: -1,
    platformArray:['不限月台','需要月台','不要月台'],
    platformIndex:-1,
    floorArray:['楼库也可以','只要单层或底楼'],
    floorIndex:-1,
    leaseArray:['1-3个月','3-6个月','6-12个月','1-3年','3-5年','5-10年'],
    leaseIndex:-1,
    objectMultiArray: [
      [
        {
          id: 0,
          name: '物流仓储-'
        },
        {
          id: 1,
          name: '生产制造-'
        }
      ], [
        { id: 0, name: '日用快消品' },
        { id: 1, name: '食品' },
        { id: 2, name: '医疗器械' },
        { id: 3, name: '汽车配件' },
        { id: 4, name: '轮胎' },
        { id: 5, name: '服装' },
        { id: 6, name: '白色家电' },
        { id: 7, name: '机械设备' },
        { id: 8, name: '化工类' },
        { id: 9, name: '生鲜蔬果' },
        { id: 10, name: '电子产品' },
        { id: 11, name: '化妆品' },
        { id: 12, name: '钢材' },
        { id: 13, name: '木材' },
        { id: 14, name: '石材' },
        { id: 15, name: '家具' },
        { id: 16, name: '其他' },
      ]
    ],
    multiIndex2 : [0,0],
    showAddButton : true,

  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // openId = options.openId
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // bindRegionChange: function (e) {
  //   console.log('picker发送选择改变，携带值为', e.detail.value)
  //   this.setData({
  //     region: e.detail.value
  //   })
  // },
  //多列选择器
  purposePickerSelected: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      purposeIndex: e.detail.value
    })
  },
  //多列选择器，某一列的值改变时触发事件
  bindMultiPickerChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex2: e.detail.value
    })
  },
  bindMultiPickerColumnChange2: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      objectMultiArray: this.data.objectMultiArray,
      multiIndex2: this.data.multiIndex2
    };
    data.multiIndex2[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex2[0]) {
          case 0:
            data.objectMultiArray[1] = [
              { id: 0, name: '日用快消品' },
              { id: 1, name: '食品' },
              { id: 2, name: '医疗器械' },
              { id: 3, name: '汽车配件' },
              { id: 4, name: '轮胎' },
              { id: 5, name: '服装' },
              { id: 6, name: '白色家电' },
              { id: 7, name: '机械设备' },
              { id: 8, name: '化工类' },
              { id: 9, name: '生鲜蔬果' },
              { id: 10, name: '电子产品' },
              { id: 11, name: '化妆品' },
              { id: 12, name: '钢材' },
              { id: 13, name: '木材' },
              { id: 14, name: '石材' },
              { id: 15, name: '家具' },
              { id: 16, name: '其他' },

            ];
            break;
          case 1:
            data.objectMultiArray[1] = [
              { id: 0, name: '食品制造业' },
              { id: 1, name: '服装纺织厂' },
              { id: 2, name: '汽车制造业' },
              { id: 3, name: '纺织服装业（含印染）' },
              { id: 4, name: '化工制品业' },
              { id: 5, name: '冶炼' },
              { id: 6, name: '酒、饮料、茶制造业' },
              { id: 7, name: '木材加工、家具制造业（不含喷漆）' },
              { id: 8, name: '机械器材制造业' },
              { id: 9, name: '木材加工、家具制造业（含喷漆）' },
              { id: 10, name: '医药制造业' },
              { id: 11, name: '电镀' },
              { id: 12, name: '烟草制造业' },
              { id: 13, name: '造纸印刷业' },
              { id: 14, name: '电子设备制造业' },
              { id: 15, name: '橡胶和塑料制品业' },
              { id: 16, name: '其他' },
              
            ];
            break;
        }
        data.multiIndex2[1] = 0;
        break;
    }
    this.setData(data);
  },

  //  点击日期组件确定事件  
  bindDateChange: function (e) {
    this.setData({
      dates: e.detail.value
    })
  },
  //消防组建
  facilityPickerSelected: function (e) {
    //改变index值，通过setData()方法重绘界面
    this.setData({
      facilityIndex: e.detail.value
    });
  }, 
  //月台选择
  platformPickerSelected: function (e) {
    //改变index值，通过setData()方法重绘界面
    this.setData({
      platformIndex: e.detail.value
    });
  }, 
  //楼层选择
  floorPickerSelected: function (e) {
    //改变index值，通过setData()方法重绘界面
    this.setData({
      floorIndex: e.detail.value
    });
  }, 
  //租期选择
  leasePickerSelected: function (e) {
    //改变index值，通过setData()方法重绘界面
    this.setData({
      leaseIndex: e.detail.value
    });
  }, 

  addCity : function (e){
    let nowCitys = this.data.cityArray;
    let obj = { cid : nowCitys.length + 1 , region : '' }
    nowCitys.push(obj);
    this.setData({
      showAddButton : false,
      cityArray : nowCitys
    })   
  },
  bindRegionChange:function(e){
    let cid = e.target.dataset.cid;
    let locates = e.detail.value;
    let cityArray = this.data.cityArray;
    console.log(cid+"::"+locates)
    for(let i = 0; i < cityArray.length; i++){
      if(cid == cityArray[i].cid){
        cityArray[i].region = locates;
      }
    }
    this.setData({
      cityArray:cityArray,
      showAddButton: true,
    })

  },

  backToMine: function (e) {
    console.log("1")
    wx.navigateTo({
      url: '../mine/mine'
    })
  }
,
  //form submit
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    let openId = app.globalData.openId;
    let area = e.detail.value.area;
    let fireControlRequire = e.detail.value.fireControlRequire;
    let floorRequire = e.detail.value.floorRequire;
    let leaseTerm = e.detail.value.leaseTerm;
    let platformRequire = e.detail.value.platformRequire;
    let purpose = e.detail.value.purpose;
    let remark = e.detail.value.remark;
    let requireTime = e.detail.value.requireTime +' 00:00:00';
    let maxPrice = e.detail.value.maxPrice;
    let obj = '';
    let cityArray = this.data.cityArray;
    for(let i=0; i<cityArray.length; i++){
      obj = obj + cityArray[i].region[0] + "-" +cityArray[i].region[1]+"-"+cityArray[i].region[2]+' ';
    }
    console.log("locates:::" +  obj)
    wx.request({
      method: 'POST',
      url: app.globalData.url + '/api/require/add' , //接口地址
      data: {
        'openId':openId,
        'locates': obj,
        'fireControlRequire': fireControlRequire,
        'floorRequire': floorRequire,
        'leaseTerm': leaseTerm,
        'platformRequire': platformRequire,
        'purpose': purpose,
        'remark':remark,
        'requireTime':requireTime,
        'maxPrice': parseInt(maxPrice*100),
        'status':0,
        'area':area,
        'shopId':app.globalData.shopId
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        wx.showToast({
          title: '进入下一步',
          icon:'success',
          duration: 2000
        })
        wx.navigateTo({
          url: '../uploadConfirm/uploadConfirm?openId='+openId,
        })

      },
      fail: function (res) {
        console.log('cuowu' + ':' + res)
      }
    })
  },
  backToMine: function(){
      wx.navigateBack({
        delta: 1
      })
  }

})