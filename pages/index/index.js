// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scale: 15,
    latitude:0,
    longitude:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    this.timer = options.timer;
    console.log(options.data);

    //获取位置
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        self.setData({
          longitude:res.longitude,
          latitude:res.latitude
        })
      }
    });
    
    //物理设备属性
    wx.getSystemInfo({
      success: function(res) {
        self.setData({
          controls:[{
            id:1,
            iconPath:'/images/location.png',
            position:{
              left: 20,
              top: res.windowHeight-80,
              width: 50,
              height: 50
            },
            clickable:true
          },{
            id:2,
            iconPath:'/images/use.png',
            position:{
              left:res.windowWidth/2 - 45,
              top:res.windowHeight - 100,
              width:90,
              height:90
            },
            clickable:true
          },{
            id:3,
            iconPath:'/images/warn.png',
            position:{
              left:res.windowWidth - 70,
              top:res.windowHeight - 80,
              width:50,
              height:50
            },
            clickable:true
          },{
            id:4,
            iconPath:'/images/marker.png',
            position:{
              left:res.windowWidth/2 - 14.5,
              top:res.windowHeight / 2 -45,
              width:29,
              height:45
            },
            clickable:false
          },{
            id:5,
            iconPath:'/images/avatar.png',
            position:{
              left:res.windowWidth - 68,
              top:res.windowWidth - 155,
              width:45,
              height:45
            },
            clickable:true
          }]
        })
      }
    });

    wx.request({
      url: 'https://www.easy-mock.com/mock/5966e6e388b970677e52470d/local/dizhi',
      data: '',
      method: 'GET',
      success: function(res) {
        self.setData({
          markers:res.data.data
        });
      }
    })
  },

  bindcontroltap: function (e) {
    switch (e.controlId) {
      //定位按钮
      case 1: 
        this.movetoPosition();
        wx.showToast({
          title: 'case 1',
          duration: 1000,
          success: function(res) {},
        });
        break;
      //立即用车按钮
      case 2:
        //根据定时器的有无判断
        if(this.timer === "" || this.timer === undefined){
          wx.scanCode({
            onlyFromCamera: false,
            success: function(res) {
              wx.showLoading({
                title: '正在获取密码',
                mask: false
              });
              wx.request({
                url: 'https://www.easy-mock.com/mock/5966e6e388b970677e52470d/local/password',
                data: '',
                method: 'GET',
                success: function (res) {
                  wx.hideLoading();
                  wx.redirectTo({
                    url: '../scanresult/index?password=' + res.data.data.password + '&number' + res.data.data.number,
                    success: function (res) {
                      wx.showToast({
                        title: '获取密码成功',
                        duration: 1000,
                        success: function (res) { },
                        fail: function (res) { },
                        complete: function (res) { },
                      })
                     },
                    fail: function (res) { },
                    complete: function (res) { },
                  })
                },
                fail: function (res) {
                  wx.hideLoading();
                  // var titles = res;
                  wx.showToast({
                    title: 'titles',
                    duration: 1000,
                    success: function (res) { },
                  });
                },
              })
            },
          })
        }else{
          wx.navigateBack({
            delta: 1,
          })
          console.log(2222)
        }
        break;
      
      case 3:
        wx.navigateTo({
          url: '../warn/index',
        });
        break;

      case 5:
        wx.navigateTo({
          url: '../my/index',
        });
        break;
      default:break;
    }
  },

  bindmarkertap:function(e){
    let _markers = this.data.markers;
    let markerId = e.markerId;
    let currMaker = _markers[markerId];
    this.setData({
      polyline:[{
        points:[{
          longitude:this.data.longitude,
          loatitude:this.data.latitude
        },{
          longitude:currMaker.longitude,
          latitude:currMaker.latitude
        }],
        color:"#ff0000DD",
        width:1,
        dottedLine:true
      }],
      scale:18
    })
  },

  bindregionchange:function(e){
    var self = this;
    if(e.type == "begin"){
      wx.request({
        url: 'https://www.easy-mock.com/mock/5966e6e388b970677e52470d/local/dizhi',
        data: '',
        method: 'GET',
        success: function(res) {
          self.setData({
            _markers:res.data.data
          })
        }
      })
    }else if(e.type == 'end'){
      self.setData({
        markers:this.data._markers
      })
    }
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
    this.mapCtx = wx.createMapContext('ofoMap');
    this.movetoPosition();
  },

  movetoPosition:function(){
    this.mapCtx.moveToLocation();
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