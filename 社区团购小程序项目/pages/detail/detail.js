// pages/detail/detail.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabId:1,
    jssj:'',  //结束时间
    timer:'', //倒计时定时器名称
    djs:{hour:'00',min:'00',sec:'00'}, //倒计时
    goodId:'',
    detailList:[]
  },
  // tab按钮
  tabclk(e){
    var tabId = e.target.dataset.id;
    this.setData({
      tabId:tabId
    })
  },
  // 获取页面数据
  getList(){
    let that=this;
    wx.request({
      url:app.globalData.api+ '/getDetailList',
      data:{
        valId:that.data.goodId
      },
      success(res){
        console.log(res)
        that.setData({
          detailList:res.data.data
        })
        // console.log(that.data.detailList[0].good_id)
        // console.log(that.data.detailList[0].jssj)
        that.setData({
          jssj:that.data.detailList[0].jssj
        })

      }
    })
  },
  //购物车按钮
  goCart(){
    wx.switchTab({
      url: '../shopCart/shopCart'
    })
  },
  //加入购物车按钮
  addGood(){
    wx.request({
      url: app.globalData.api+ '/addGoodInCart',
      data:{
        goodId:this.data.detailList[0].good_id
      },
      success(res){
        console.log(res)
        wx.showToast({  
          title: '成功添加到购物车',  
          icon: 'success',
          duration: 2000
        })
      }
    })  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    const eventChannel = this.getOpenerEventChannel() //获取index页面的index值
    eventChannel.on('getId',function(data){
        that.setData({goodId:data.data})
    })
    this.getList();
    this.timeDown();
  },
// 倒计时
  timeDown(){
    let that = this;
    that.setData({
      timer:setInterval(function(){
        var leftTime = parseInt((new Date(that.data.jssj.replace(/-/g,'/')).getTime()-new Date().getTime()));
        // console.log(leftTime);
        if(leftTime<=0){
          that.setData({
            djs:{hour:'00',min:'00',sec:'00'}
          });
          // wx.showToast({
          //   title: '活动已结束',
          // });
          clearInterval(that.data.timer);
          return;
        }

        var h = parseInt(leftTime/1000/3600);  //小时
        var m = parseInt(leftTime/1000/60%60);    //分钟
        var s = parseInt(leftTime/1000%60);       //秒

        h < 10 ? h = '0' + h : h;
        m < 10 ? m = '0' + m : m;
        s < 10 ? s = '0' + s : s;
        that.setData({
          djs:{hour:h,min:m,sec:s}
        })
      },1000)
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