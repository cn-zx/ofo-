//logs.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    login:false,
    userInfo:{
      avatarUrl:'/images/center.png',
      nickName:'未登录'
    },
    bType:'primary',
    activeText:'登陆'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var self = this;

    wx.setNavigationBarTitle({
      title: '个人中心'
    })

    //现获取本地登录信息
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        self.setData({
          userInfo:{
            avatarUrl:res.data.userInfo.avatarUrl,
            nickName:res.data.userInfo.nickName
          },
          login:true,
          bType:res.data.bType,
          activeText:res.data.activeText
        })
      }
    })
  },

  //用户点击登陆按钮 实现登录或者退出
  bindaction:function(){
    var self = this;

    //登录状态取反
    this.data.login = !this.data.login;

    //判断登录状态
    if(this.data.login){

      wx.showLoading({
        title: '正在登录'
      })

      wx.login({
        success: function(res) {
          wx.getUserInfo({
            withCredentials: false,
            lang: 'zh_CN',
            success: function(res) {
              self.setData({
                userInfo:{
                  avatarUrl:res.userInfo.avatarUrl,
                  nickName:res.userInfo.nickName
                },
                bType:"warn",
                activeText:"退出登录",
                login:true
              }),
              //隐藏登录提示
              wx.hideLoading();

              wx.setStorage({
                key: 'userInfo',
                data: {
                  userInfo:{
                    avatarUrl:res.userInfo.avatarUrl,
                    nickName:res.userInfo.nickName
                  },
                  bType:"warn",
                  activeText:"退出登录"
                },
                success:function(res){
                  console.log('存储用户信息成功');
                  console.log(res);
                }
              })
            },
            fail: function(res) {
              wx.showToast({
                title: '获取用户信息失败',
                duration: 2000
              })
            }
          })
        }
      })
    }else{
      wx.showModal({
        title: '确定退出？',
        content: '是😊黄车做的不好吗？',
        showCancel: true,
        cancelText: '',
        cancelColor: '',
        confirmText: '',
        confirmColor: '',
        success: function(res) {
          if(res.confirm){
            self.setData({
              userInfo:{
                avatarUrl:"/images/center.png",
                nickName:"未登录"
              },
              bType:"primary",
              activeText:"登录",
              login:false
            });
            wx.removeStorage({
              key: 'userInfo',
              success: function(res) {
                console.log('清楚登录信息成功');
                console.log(res);
              },
              fail: function(res) {
                console.log('清楚登录信息失败');
              }
            })
          }else if(res.cancel){
            wx.showToast({
              title: '我不退出了，逗你玩的',
              duration: 2000
            })
            self.setData({
              login:true
            })
          }
        }
      })
    }
  },

  //点击钱包
  moveTowallet:function(){
    wx.navigateTo({
      url: '../wallet/index'
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