// pages/billing/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picUrls:[],
    checkboxValue:[],
    btnbg:'',
    addtext:'拍照/相册',
    inputValue:{
      num:0,
      desc:""
    },
    itemValues:[{
      checked:false,
      value:'私锁私用',
      color:'#b9dd08'
    },{
      checked: false,
      value: '车牌损坏',
      color: '#b9dd08'
    },{
      checked: false,
      value: '轮胎坏了',
      color: '#b9dd08'
    }, {
      checked: false,
      value: '车辆坏了',
      color: '#b9dd08'
    }, {
      checked: false,
      value: '违规乱停',
      color: '#b9dd08'
    },{
      checked: false,
      value: '密码不对',
      color: '#b9dd08'
    },{
      checked: false,
      value: '刹车坏了',
      color: '#b9dd08'
    },{
      checked: false,
      value: '其他故障',
      color: '#b9dd08'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;

    wx.setNavigationBarTitle({
      title: '报障维修'
    })
  },

  //监听故障类型
  bindchange:function(e){
    var _ckvalues = e.detail.value;
    console.log(e.detail.value)
    if(_ckvalues.length == 0){
      this.setData({
        btnbg:''
      })
    }else{
      this.setData({
        checkboxValue:_ckvalues,
        btnbg:"green"
      })
    }
  },

  //监听车牌号
  carnumber:function(e){
    if(e.detail.value == "" || e.detail.value == undefined){
      return;
    }else{
      this.setData({
        inputValue:{
          num:e.detail.value,
          desc:this.data.inputValue.desc
        }
    })
    }
  },

  //监听备注信息
  beizhu:function(e){
    if (e.detail.value == "" || e.detail.value == undefined) {
      return;
    } else {
      this.setData({
        inputValue: {
          num: this.data.inputValue.num,
          desc: e.detail.value
        }
      })
    }
  },

  //选择照片
  addimg:function(){
    var self = this;
    wx.chooseImage({
      count: 5,
      sizeType: ['original','compressed'],
      sourceType: ['album','camera'],
      success: function(res) {
        var localPath = res.tempFilePaths;
        var _picUrls = self.data.picUrls;
        for(var item of localPath){
          _picUrls.unshift(item);
          self.setData({
            picUrls: _picUrls,
            addtext:'+'
          })
        }
      }
    })
  },

  //删除照片
  delpic:function(e){
    var _currindex = e.target.dataset.index;
    var temp = this.data.picUrls;
    temp.splice(_currindex,1);
    this.setData({
      picUrls:temp
    })
    if(temp.length <= 0){
      this.setData({
        addtext:'拍照/相册'
      })
    }
  },

  //提交到服务器
  formSubmit:function(){
    var self = this;

    if(this.data.checkboxValue.length > 0 && this.data.picUrls.length > 0){
      wx.showLoading({
        title: '正在上传...'
      })
      this.setData({
        loadingbtn:true
      })
      wx.request({
        //用get模拟post
        url: 'https://www.easy-mock.com/mock/5966e6e388b970677e52470d/local/push',
        data: {
          //post
          //picUrls:this.data.picUrls
        },
        //header: {},
        method: 'GET',
        success: function(res) {
          wx.hideLoading();
          wx.showToast({
            title: res.data.data.msg,
            duration: 2000
          });
          self.setData({
            loadingbtn: false
          });
        }
      })
    }else{
      console.log('没填');
      wx.showModal({
        title: '请填写必要信息',
        content: '方便运营小哥找车',
        showCancel: true,
        cancelText: '不填！',
        cancelColor: '',
        confirmText: '就去填',
        confirmColor: '',
        success: function(res) {
          if(res.confirm){
            wx.showToast({
              title: '确定按钮',
              duration: 2000
            })
          }else if(res.cancel){
            wx.showToast({
              title: '取消按钮',
              duration: 2000
            });
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