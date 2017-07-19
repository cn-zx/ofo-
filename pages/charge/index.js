Page({

  /**
   * 页面的初始数据
   */
  data: {
    inuptValue:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  //获取
  bindinput:function(e){
    if (parseInt(e.detail.value)){
      this.setData({
        inputValue: e.detail.value
      })
    }
  },

  //充值按钮
  charequest:function(){

    var self = this;

    if (parseInt(this.data.inputValue)<=0 || isNaN(this.data.inputValue)){
      wx.showModal({
        title: '不要逗我玩',
        content: '不给钱不给骑',
        showCancel: false,
        cancelText: '',
        cancelColor: '',
        confirmText: '不不不',
        confirmColor: ''
      })
    }else{
      wx.getStorage({
        key: 'money',
        success: function (res) {
          console.log('卸载函数获取成功')
          wx.setStorage({
            key: 'money',
            data: {
              money: parseInt(self.data.inputValue) + parseInt(res.data.money)
            }
          })
        },
        fail: function (res) {
          console.log('卸载函数获取失败')
          wx.setStorage({
            key: 'money',
            data: {
              money: parseInt(self.data.inputValue)
            }
          })
        }
      })
      wx.showModal({
        title: '充值成功',
        content: '骑走',
        showCancel: true,
        cancelText: '确定',
        cancelColor: '',
        confirmText: '去钱包',
        confirmColor: '',
        success: function(res) {
          if(res.confirm){
            wx.navigateBack({
              delta: 1,
            })
          }
        }
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