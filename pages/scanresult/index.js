// pages/scanresult/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    password:0,
    time:9
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;

    this.setData({
      password:options.password
    });

    //开始计时
    var time = 9;

    this.timer = setInterval(function(){
      self.setData({
        time:--time
      })
      if(time <= 0){
        clearInterval(self.timer);
        wx.redirectTo({
          url: '../billing/index?number='+options.number
        })
      }
    },1000)
  },

  //跳转车辆保障页面
  moveToWarn:function(){
    clearInterval(this.timer)
    wx.redirectTo({
      url: '../index/index'
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