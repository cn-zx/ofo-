// pages/billing/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hours:0,
    minuters:0,
    seconds:0,
    billing:'正在计费'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;

    this.setData({
      number:options.number,
      timer:this.timer
    })

    var h = 0;
    var m = 0;
    var s = 0;

    this.timer = setInterval(function(){
      self.setData({
        seconds:s++
      })
      if(s == 60){
        s=0;
        m++;
        setTimeout(function(){
          self.setData({
            minuters:m
          });                                                                                                                                                                                                                                     
        },1000)
        if(m == 60){
          m = 0;
          h++;
          setTimeout(function(){
            self.setData({
              hours:h
            })
          },1000)
        }
      }
    },1000)
  },

  //结束骑行
  endRide:function(){
    clearInterval(this.timer);
    this.timer = '';
    this.setData({
      billing:"本次骑行耗时",
      disable:true
    })
  },

  //携带定时器状态回到地图
  moveToIndex:function(){
    wx.showToast({
      title: 'itll',
      duration: 2000
    })
    if(this.timer == ""){
      wx.redirectTo({
        url: '../index/index'
      })
    }else{
      wx.navigateTo({
        url: '../index/index?timer='+this.timer
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