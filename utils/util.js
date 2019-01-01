let app = getApp();

const formatTime = city => {
  console.log("here")
  let count = 0;
  wx.request({
    url: app.globalData.url + '/api/require/count-by-status?status=1&city=' + city,
    success: (data) => {
      return  data.data;
      console.log("hereq"+count)
      //return count;
    }
  })
  console.log("herew" + count)
  //return count;
}
const formatDate = date =>{
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  //获取时分秒
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds();

  //格式化日期
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')

} 
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  countRequire: countRequire
}

const countRequire = function(city){
  console.log("here")
  let count = 0 ;
  wx.request({
    url: app.globalData.url + '/api/require/count-by-status?status=1&city=' + city,
    success: (data) => {
      count = data.data;
    }
  })
  return count ;
}

const countWarehouse = function (city) {
  console.log("here")
  let count = 0;
  wx.request({
    url: app.globalData.url + '/api/require/count-by-status?status=1&city=' + city,
    success: (data) => {
      count = data.data;
    }
  })
  return count;
}
