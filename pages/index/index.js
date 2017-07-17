// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scale:14,
    longitude:0,
    latitude:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;

    this.setData({
      timer:options.timer
    })
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
            radius: 500,
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

    //请求周边车辆
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
        if (this.data.timer == "" || this.data.timer == undefined){
          wx.scanCode({
            onlyFromCamera: false,
            success: function(res1) {
              wx.showLoading({
                title: '正在获取密码',
                mask: true
              });
              wx.request({
                url: 'https://www.easy-mock.com/mock/5966e6e388b970677e52470d/local/password',
                data: '',
                method: 'GET',
                success: function(res) {
                  wx.hideLoading();
                  wx.redirectTo({
                    url: '../scanresult/index?number='+res.data.data.number+'&password='+res.data.data.password,
                    success: function(res) {
                      wx.showToast({
                        title: '获取密码成功',
                        duration: 1000
                      })
                    },
                    fail: function(res) {
                      wx.showToast({
                        title: '未知错误',
                        duration: 2000
                      })
                    }
                  })
                }
              })
            },
            fail: function(res) {},
            complete: function(res) {}
          })
        }else{
          wx.navigateBack({
            delta: 1,
          })
        }
        break;
      case 4:
        wx.navigateTo({
          url: '../my/index'
        })
        break;
      default:break;
    }
  },

  //点击标记
  bindmarkertap:function(e){
    var _markers = this.data.markers;
    var marId = e.markerId;
    var currMarker = _markers[marId];
    this.setData({
      polyline:[{
        points:[{
          latitude:this.data.latitude,
          longitude:this.data.longitude,
        },{
          latitude:currMarker.latitude,
          longitude:currMarker.longitude
        }],
        color:'#ff2400aa',
        dottedLine:true,
        width:5
      }],
      scale:18
    })
  },

  //移动地图触发
  bindregionchange:function(e){
    if(e.type=='begin'){
      wx.request({
        url: 'https://www.easy-mock.com/mock/5966e6e388b970677e52470d/local/dizhi',
        method: 'GET',
        success: function(res) {
          this.setData({
            _markers:res.data.data
          })
        }
      })
    }else if(e.type == 'end'){
      this.setData({
        markers:this.data._markers
      })
    }
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