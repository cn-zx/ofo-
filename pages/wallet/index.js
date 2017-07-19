Page({

  /**
   * 页面的初始数据
   */
  data: {
    moneynumber:0,
    cardnumber:0,
    depositnumber:99
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var self = this;

    wx.setNavigationBarTitle({
      title: '我的钱包'
    })

    //get模拟post 加载服务器余额
    // wx.request({
    //   url: 'https://www.easy-mock.com/mock/5966e6e388b970677e52470d/local/money',
    //   data: '',
    //   method: 'GET',
    //   success: function(res) {

    //     //存储余额
    //     wx.setStorage({
    //       key: 'money',
    //       data: {
    //         money:res.data.data.money
    //       },
    //       success: function(res) {
    //         console.log(res);
    //         console.log('余额存储成功!');
    //       },
    //       fail:function(res){
    //         console.log(res);
    //         console.log('余额存储失败!');
    //       }
    //     });

    //     //赋值
    //     self.setData({
    //       moneynumber:res.data.data.money
    //     })
    //   }
    // })

    
    
  },

  //余额明细
  moveTobalance:function(){
    wx.showModal({
      title: '么么哒',
      content: '充值余额0.00元＋活动赠送余额0.00元',
      showCancel: false,
      cancelText: '',
      cancelColor: '',
      confirmText: '我知道了',
      confirmColor: ''
    })
  },

  //充值按钮
  moveTocharge:function(){
    // wx.redirectTo({
    //   url: '../charge/index'
    // })
    wx.navigateTo({
      url: '../charge/index'
    })
  },

  //查看用车券
  cardclick:function(){
    wx.showModal({
      title: '阿噢',
      content: '你没有用车券了',
      showCancel: false,
      cancelText: '',
      cancelColor: '',
      confirmText: '知道了'
    })
  },

  //退押金
  depclick:function(){
    wx.showModal({
      title: '押金立即退回',
      content: '您将不能使用ofo共享单车',
      showCancel: true,
      cancelText: '继续使用',
      cancelColor: '#b9dd08',
      confirmText: '押金退款',
      confirmColor: '#ccc',
      success: function(res) {
        if (res.confirm){
          wx.showToast({
            title: '退款成功',
            icon: 'success',
            duration: 2000
          })
        }
      }
    })
  },

  //关于ofo
  about:function(){
    wx.showModal({
      title: 'ofo共享单车',
      content: '微信服务好：ofobike,网址：m.ofo.so',
      showCancel: false,
      cancelText: '',
      cancelColor: '',
      confirmText: '666'
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

    var self = this;
    
    //加载本地余额 
    wx.getStorage({
      key: 'money',
      success: function (res) {
        console.log(res);
        console.log('获取余额成功!');

        self.setData({
          moneynumber: res.data.money
        })
      },
      fail: function (res) {
        console.log(res);
        console.log('获取余额失败!');
      }
    })
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