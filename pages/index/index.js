// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scale:15,
    longitude:0,
    latitude:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;

    //初始定位
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        self.setData({
          longitude:res.longitude,
          latitude:res.latitude,
          circles: [{
            longitude: res.longitude,
            latitude: res.latitude,
            color: '#000000AA',
            fillColor: '#eaadeaAA',
            radius: 1000,
            strokeWidth: 1
          }]
        })
      }
    });

    //定义map自带的控件
    wx.getSystemInfo({
      success: function(res) {
        self.setData({
          controls:[{
            id:1,
            iconPath:'/images/location.png',
            clickable:true,
            position:{
              left:20,
              top:res.windowHeight - 80,
              width:50,
              height:50
            }
          },{
            id:2,
            iconPath:'/images/warn.png',
            clickable:true,
            position:{
              left:res.windowWidth-70,
              top:res.windowHeight-80,
              width:50,
              height:50
            }
          },{
            id:3,
            iconPath:'/images/use.png',
            clickable:true,
            position:{
              left:res.windowWidth/2-45,
              top:res.windowHeight - 100,
              width:90,
              height:90
            }
          },{
            id:4,
            iconPath:'/images/avatar.png',
            clickable:true,
            position:{
              left:res.windowWidth-100,
              top:res.windowHeight/2-135,
              width:45,
              height:45
            }
          },{
            id:5,
            iconPath:'/images/marker.png',
            clickable:false,
            position:{
              left:res.windowWidth/2-15.5,
              top:res.windowHeight/2-48,
              width:31,
              height:48
            }
          }]
        })
      }
    });

    this.getrequestCat();
  },

  //点击地图组建触发
  bindcontroltap: function(e) {
    switch(e.controlId) {
      case 1: 
        this.moveTomapcenter();
        break;
      case 2:
        wx.navigateTo({
          url: '../warn/index'
        })
        break;
      case 3:
    }
  },

  //移动地图触发
  bindregionchange:function(e){
    // if(e.type=='begin'){
    //   wx.showToast({
    //     title: '开始拖动',
    //     duration: 1000
    //   })
    // }else if(e.type == 'end'){
    //   wx.showToast({
    //     title: '停止拖动',
    //     duration: 1000
    //   })
    // }
  },

  //请求周边车辆
  getrequestCat:function(){
    var self = this;
    wx.request({
      url: 'https://www.easy-mock.com/mock/5966e6e388b970677e52470d/local/dizhi',
      data: '',
      method: 'GET',
      success: function(res) {
        self.setData({
          markers:res.data.data
        })
      },
      fail: function(res) {
        wx.showToast({
          title: '请求车辆失败',
          duration: 2000
        })
      }
    })
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
    this.mapCmc = wx.createMapContext('ofoMap');
    this.moveTomapcenter();
  },

  moveTomapcenter:function(){
    this.mapCmc.moveToLocation();
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
  
  }
})
// Page({
//   data: {
//     Height: 0,
//     scale: 13,
//     latitude: "",
//     longitude: "",
//     markers: [],
//     controls: [{
//       id: 1,
//       iconPath: '/images/marker.png',
//       position: {
//         left: 320,
//         top: 100 - 50,
//         width: 20,
//         height: 20
//       },
//       clickable: true
//     },
//     {
//       id: 2,
//       iconPath: '/images/markers.png',
//       position: {
//         left: 340,
//         top: 100 - 50,
//         width: 20,
//         height: 20
//       },
//       clickable: true
//     }
//     ],
//     circles: []
//   },
//   onLoad: function () {
//     var _this = this;
//     wx.getSystemInfo({
//       success: function (res) {
//         //设置map高度，根据当前设备宽高满屏显示
//         _this.setData({
//           view: {
//             Height: res.windowHeight
//           }
//         })
//       }
//     })
//     wx.getLocation({
//       type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
//       success: function (res) {
//         _this.setData({
//           latitude: res.latitude,
//           longitude: res.longitude,
//           markers: [{
//             id: "1",
//             latitude: res.latitude,
//             longitude: res.longitude,
//             width: 50,
//             height: 50,
//             iconPath: "/images/location.png",
//             title: "哪里"
//           }],
//           circles: [{
//             latitude: res.latitude,
//             longitude: res.longitude,
//             color: '#FF0000DD',
//             fillColor: '#7cb5ec88',
//             radius: 3000,
//             strokeWidth: 1
//           }]
//         })
//       }
//     })
//   },
//   regionchange(e) {
//     console.log("regionchange===" + e.type);
//     wx.showToast({
//       title: e.type,
//       duration: 2000
//     })
//   },
//   //点击merkers
//   markertap(e) {
//     console.log(e.markerId)
//     wx.showActionSheet({
//       itemList: ["A"],
//       success: function (res) {
//         console.log(res.tapIndex)
//       },
//       fail: function (res) {
//         console.log(res.errMsg)
//       }
//     })
//   },
//   //点击缩放按钮动态请求数据
//   controltap(e) {
//     var that = this;
//     console.log("scale===" + this.data.scale)
//     if (e.controlId === 1) {
//       // if (this.data.scale === 13) {
//       that.setData({
//         scale: --this.data.scale
//       })
//       // }
//     } else {
//       //  if (this.data.scale !== 13) {
//       that.setData({
//         scale: ++this.data.scale
//       })
//       // }
//     }
//   },
// })