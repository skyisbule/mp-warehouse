// pages/warehouseUpload/warehouseUpload.js
// import "../../utils/qiniuUploader"
const qiniuUploader = require("../../utils/qiniuUploader.js")
const util = require("../../utils/util.js")
const app = getApp()
Page({

  data: {
    unitArray: [
       {uid:1,
        floor:'一楼',
        area:'',
        couldSublet:'可分租',
        minSubletArea:'',
        price:'',
        facilitys: [
          { uid : 1 , name: "月台", value: '0', checked: false },
          { uid : 1 , name: "喷淋", value: '1', checked: false },
          { uid : 1 , name: "行车", value: '2', checked: false },
        ],
        isminSublet : true
        }
      ]
    ,
    showAddButton: true,
    isRemove:false,
    facilitys: [
      { name: "月台", value: '0', checked: false },
      { name: "喷淋", value: '1', checked: false },
      { name: "行车", value: '2', checked: false },
    ],
    couldSubletArray:['可分租','不可分租'],
    couldSubletIndex:0,
    isminSublet:true,
    parkServices:[
      { name: "办公楼", value: '0', checked: false },
      { name: "有宿舍楼", value: '1', checked: false },
      { name: "有食堂", value: '2', checked: false },
      { name: "可托管", value: '3', checked: false },
      { name: "可环评", value: '4', checked: false },
      { name: "可注册", value: '5', checked: false },
    ],
    parkService:'',
    parkServicesShowModal: false,
    suitableForArray:[
      { name: "电商", value: '0', checked: false },
      { name: "物流仓储", value: '1', checked: false },
      { name: "食品烟酒", value: '2', checked: false },
      { name: "服装", value: '3', checked: false },
      { name: "汽车", value: '4', checked: false },
      { name: "木材造纸", value: '5', checked: false },
      { name: "机械电子", value: '6', checked: false },
      { name: "资料", value: '7', checked: false },
      { name: "化工医药", value: '8', checked: false },
      { name: "冶炼电镀", value: '9', checked: false },
      { name: "办公展厅", value: '10', checked: false },
      { name: "其他", value: '11', checked: false },
    ],
    suitableFor:'',
    suitableForArrayShowModal: false,
    advantageArray:[
      { name: "104板块", value: '0', checked: false },
      { name: "不需落税", value: '1', checked: false },
      { name: "证件齐全", value: '2', checked: false },
      { name: "层高高", value: '3', checked: false },
      { name: "独门独院", value: '4', checked: false },
      { name: "多面卸货", value: '5', checked: false },
      { name: "电量充足", value: '6', checked: false },
      { name: "场地大", value: '7', checked: false },
      { name: "环氧地坪", value: '8', checked: false },
    ],
    advantage:'',
    advantageArrayShowModal: false,
    imgs:[''],
    chooseFiles: [],
    deleteIndex: -1,
    floorArray: ['一楼', '二楼','三楼','四楼','五楼','六楼'],
    floorIndex: 0,
    parkServicesShowModal: false,
    region:['广东省','广州市','海珠区'],
    customItem:'全部'
  },
  //城市选择
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  facilitysclicks: function (e) {
    //console.log("点击事件sss")
    let uid = e.target.dataset.uid;
    let index = e.currentTarget.dataset.index;
    let unitArray = this.data.unitArray;
   // console.log(uid)
   // console.log(index)
  //  console.log(unitArray)
    //通过uid查找对应的obj
    for (let i = 0; i < unitArray.length; i++) {
      if (unitArray[i].uid == uid) {
        if (unitArray[i].facilitys[index].checked == false) {
          unitArray[i].facilitys[index].checked = true;
        } else {
          unitArray[i].facilitys[index].checked = false;
        }
      }
    }
    this.setData({
      unitArray: unitArray,
    })
  },
  //parkService
  parkServicesclicks: function (e) {
    let index = e.currentTarget.dataset.index;
    let arrs = this.data.parkServices;
    if (arrs[index].checked == false) {
      arrs[index].checked = true;
    } else {
      arrs[index].checked = false;
    }
    this.setData({
      parkServices: arrs,
      
    })
    console.log(arrs)
  },
  parkServicesChange: function (e) {
    let parkService = e.detail.value;
    console.log(parkService);
    this.setData({
      parkService: parkService
    })
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  //suitableForArray
  suitableForArrayclicks: function (e) {
    let index = e.currentTarget.dataset.index;
    let arrs = this.data.suitableForArray;
    if (arrs[index].checked == false) {
      arrs[index].checked = true;
    } else {
      arrs[index].checked = false;
    }
    this.setData({
      suitableForArray: arrs,

    })
    console.log(arrs)
  },
  suitableForArrayChange: function (e) {
    let suitableFor = e.detail.value;
    console.log(suitableFor);
    this.setData({
      suitableFor: suitableFor
    })
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  //advantage
  advantageArrayclicks: function (e) {
    let index = e.currentTarget.dataset.index;
    let arrs = this.data.advantageArray;
    if (arrs[index].checked == false) {
      arrs[index].checked = true;
    } else {
      arrs[index].checked = false;
    }
    this.setData({
      advantageArray: arrs,

    })
    console.log(arrs)
  },
  advantageArrayChange: function (e) {
    let advantage = e.detail.value;
    console.log(advantage);
    this.setData({
      advantage: advantage
    })
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  //分组选择
  couldSubletPickerSelected: function (e) {

    let uid = e.target.dataset.uid;
    let couldSublet = this.data.couldSubletArray[e.detail.value];
    let unitArray = this.data.unitArray;
    for (let i = 0; i < unitArray.length; i++) {
      if (unitArray[i].uid == uid) {
        unitArray[i].couldSublet = couldSublet;
        if (e.detail.value == 1)
          unitArray[i].isminSublet = false;
      }
    }
    this.setData({
      unitArray: unitArray
    })
  }, 
  //楼层选择
  floorPickerSelected: function (e) {
    //改变index值，通过setData()方法重绘界面
    let uid = e.target.dataset.uid;
    let floor = this.data.floorArray[e.detail.value];
    let unitArray = this.data.unitArray;
    console.log(floor)
    for (let i = 0; i < unitArray.length; i++) {
      if (unitArray[i].uid == uid) {
        unitArray[i].floor = floor;
      }
    }
    this.setData({
      unitArray: unitArray
    })
  }, 
  //选择本地照片与拍照
  chooseImage: function (event) {
    let thisPage = this;

    // 已选择图片数组
    var imgArr = this.data.chooseFiles;

    let imgUrls = "";

    //只能上传9张照片，包括拍照
    var leftCount = 9 - imgArr.length;
    if (leftCount <= 0) {
      return;
    }
    var sourceType = ['album', 'camera'],
      that = this;
    console.log(leftCount)
    wx.chooseImage({

      count: leftCount,
      sourceType: sourceType,
      success: function (res) {
        
        thisPage.setData({
          chooseFiles : imgArr.concat(res.tempFilePaths)
        })

        console.log(res)
        for (let i = 0; i < res.tempFilePaths.length;i++){
          let filePath = res.tempFilePaths[i];

          wx.request({
            method : 'GET',
            url: app.globalData.url + '/qiniu/simple',
            success : function(data){
              let token = data.data;
              //开始上传图片
              
              qiniuUploader.upload(filePath, (res) => {
                let nowImgs = thisPage.data.imgs;
                nowImgs.push(res.imageURL)
                console.log(nowImgs)
                this.setData({
                  imgs : nowImgs
                })
              }, (error) => {
                console.log(error);
              }, {
                  region: 'SCN',
                  domain: 'pic.warehouse.saiwoyun.com', 
                  key: '', 
                  uptoken: token, 
                }, (res) => {
                    console.log(res)
                });

            }
          })
        }
      }
    })
  },


  //删除已经选择的图片
  deleteImage: function (event) {
    var index = event.currentTarget.dataset.idx,
      that = this;
    that.setData({
      deleteIndex: index
    });
    that.data.chooseFiles.splice(index, 1);
    setTimeout(function () {
      that.setData({
        deleteIndex: -1,
        chooseFiles: that.data.chooseFiles
      });
    }, 500)
  },
  //预览图片
  previewImg: function (e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    //所有图片
    var chooseFiles = this.data.chooseFiles;
    wx.previewImage({
      //当前显示图片
      current: chooseFiles[index],
      //所有图片
      urls: chooseFiles
    })
  },
  /**
    * 弹窗--------园区服务
    */
  parkServicesShowDialogBtn: function () {
    this.setData({
      parkServicesShowModal: true
    })
  },
  /**
   * 隐藏模态对话框
   */
  parkServicesHideModal: function () {
    this.setData({
      parkServicesShowModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  parkServicesOnCancel: function () {
    this.setData({
      parkService:'',
    })
    this.parkServicesHideModal();  

  },
  /**
   * 对话框确认按钮点击事件
   */
  parkServicesOnConfirm: function () {
    this.parkServicesHideModal();
  },
  /**
    * 弹窗------------------------------适合行业
    */
  suitableForArrayShowDialogBtn: function () {
    this.setData({
      suitableForArrayShowModal: true
    })
  },
  /**
   * 隐藏模态对话框
   */
  suitableForArrayHideModal: function () {
    this.setData({
      suitableForArrayShowModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  suitableForArrayOnCancel: function () {
    this.setData({
      suitableFor: '',
    })
    this.suitableForArrayHideModal();

  },
  /**
   * 对话框确认按钮点击事件
   */
  suitableForArrayOnConfirm: function () {
    this.suitableForArrayHideModal();
  },
  /**
    * 弹窗------------------------------优势
    */
  advantageArrayShowDialogBtn: function () {
    this.setData({
      advantageArrayShowModal: true
    })
  },
  /**
   * 隐藏模态对话框
   */
  advantageArrayHideModal: function () {
    this.setData({
      advantageArrayShowModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  advantageArrayOnCancel: function () {
    this.setData({
      advantage: '',
    })
    this.advantageArrayHideModal();

  },
  /**
   * 对话框确认按钮点击事件
   */
  advantageArrayOnConfirm: function () {
    this.advantageArrayHideModal();
  },

  addUnits: function (e) {
    let nowUnits = this.data.unitArray;
    let newId = nowUnits.length + 1;
    let obj = {
      uid: newId,
      floor: '一楼',
      area: '',
      couldSublet: '可分租',
      minSubletArea: '',
      price: '',
      facilitys: [
        { uid: newId, name: "月台", value: '0', checked: false },
        { uid: newId, name: "喷淋", value: '1', checked: false },
        { uid: newId, name: "行车", value: '2', checked: false },
      ],
      isminSublet: true
    }

    nowUnits.push(obj);
    this.setData({
      unitArray: nowUnits,
      isRemove:true
    })

  },
  deleteUnits: function (e) {
    let uid = e.target.dataset.uid;
    let nowUnits = this.data.unitArray;
    nowUnits = nowUnits.filter((unit)=>{return unit.uid != uid});
    this.setData({
      unitArray: nowUnits,
    })
  
  },
  backToMine: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  //form submit
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    let openId = app.globalData.openId;
    let city = e.detail.value.locates;
    let chooseFiles = this.data.chooseFiles;
    let parkService = e.detail.value.parkService.replace(/,/g,' ');
    let suitableFor = e.detail.value.suitableFor.replace(/,/g, ' ');
    let advantage = e.detail.value.advantage.replace(/,/g, ' ');
    let remark = e.detail.value.remark;
    let picStr = '';
    let imgUrls = this.data.imgs;
    for(let loop = 1;loop<imgUrls.length;loop++){
        picStr += "https://" + imgUrls[loop] + " ";
    }
    picStr = picStr.substring(0, picStr.length - 1)
    let warehouse = {
      openId : openId,
      advantage : advantage,
      createTime : util.formatDate(new Date()),
      isPass : 0,
      locate : city,
      parkService : parkService,
      picture: picStr,
      remark : remark,
      status : 0,
      suitableFor : suitableFor,
      shopId : app.globalData.shopId
    };

    let units = [];

    let userUnits = this.data.unitArray;
    let obj = '';
    for (let j = 0; j < userUnits.length ;j++){
      if (userUnits[j].couldSublet=="可分租")
        userUnits[j].couldSublet = 1
      else
        userUnits[j].couldSublet = 0

      for (let k = 0; k < userUnits[j].facilitys.length; k++)
        if (userUnits[j].facilitys[k].checked == true){
          obj = obj + userUnits[j].facilitys[k].name+' ';
        }
      let unitTemp = {
        uid: userUnits[j].uid,
        floor: userUnits[j].floor,
        area: userUnits[j].area,
        couldSublet: userUnits[j].couldSublet,
        minSubletArea: userUnits[j].minSubletArea,
        price: parseInt(userUnits[j].price*100),
        supportingFacilities: obj,
      };
      obj = ''
      console.log(unitTemp);
      units.push(unitTemp);
    }

    console.log(warehouse)


    wx.request({
      method: 'POST',
      url: app.globalData.url + '/api/warehouse/add', //接口地址
      data: {
        warehouse : warehouse,
        units : units
      },
      header: { 'content-type': 'application/json' },
      success: function (res) {
        wx.showToast({
          title: '进入下一步',
          icon:'success',
          duration: 2000
        })
        wx.navigateTo({
          url: '../uploadConfirm/uploadConfirm',

        })

      },
      fail: function (res) {
        console.log('cuowu' + ':' + res)
      }
    })

  },

  addUnitArea : function (e){
      let uid       = e.target.dataset.uid;
      let areaData  = e.detail.value; 
      let unitArray = this.data.unitArray;
      for(let i = 0;i<unitArray.length;i++){
        if(unitArray[i].uid == uid){
          unitArray[i].area = areaData;
        }
      }
      this.setData({
        unitArray : unitArray
      })
  },
  addUnitMinSubletArea:function(e){
    let uid = e.target.dataset.uid;
    let minSubletAreaData = e.detail.value;
    let unitArray = this.data.unitArray;
    console.log(e.detail.value)
    for(let i = 0; i<unitArray.length; i++){
      if (unitArray[i].uid == uid) {
        unitArray[i].minSubletArea = minSubletAreaData;
      }
    }
    this.setData({
      unitArray: unitArray
    })
  },
  addUnitPrice: function (e) {
    let uid = e.target.dataset.uid;
    let priceData = e.detail.value;
    let unitArray = this.data.unitArray;
    console.log(e.detail.value)
    for (let i = 0; i < unitArray.length; i++) {
      if (unitArray[i].uid == uid) {
        unitArray[i].price = priceData;
      }
    }
    this.setData({
      unitArray: unitArray
    })
  },
})