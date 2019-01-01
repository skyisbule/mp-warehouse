// pages/city/city.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nowCity : '',
    historyCitys: [
      { cityName: '北京市' },
      { cityName: '上海市' }
      ] ,
    hotCitys: [
      { cityName: '北京市' },
      { cityName: '上海市' },
      { cityName: '苏州市' },
      { cityName: '嘉兴市' },
      { cityName: '无锡市' },
      { cityName: '东莞市' },
      { cityName: '深圳市' },
      { cityName: '杭州市' },
      { cityName: '成都市' },
      { cityName: '南京市' },
      { cityName: '武汉市' },
      { cityName: '重庆市' },
      { cityName: '佛山市' },
      { cityName: '广州市' },
      { cityName: '惠州市' },
      { cityName: '天津市' },
    ] 
  },
  onShow : function(){
    let that = this
    wx.getStorage({
      key: 'historyCity',
      success: function(res) {
        let array = res.data;
        console.log("1111")
        console.log(array)
        let historyCitys = [];
        for(let i=0;i<array.length;i++){
          let region1 = array[i].region[1];
          let region2 = array[i].region[2];
          let cityName = region2;
          console.log(region1)
          if (region2=='全部')
            cityName = region1;
          if (region1 == '')
            cityName = '全部';
          let obj = {
            cityName: cityName
          }
          historyCitys.push(obj)
        }
        that.setData({
          historyCitys: historyCitys
        })
      },
    })
    this.setData({
      nowCity : app.globalData.city
    })
  }
  ,
  switchCity : function(e){
    let city = e.target.dataset.cityname;

    let region = ['',city,'全部'];
    region[2] = city;

    app.globalData.region = region;
    app.globalData.city = city;
    wx.navigateBack({
      delta: 1
    })
  }
})