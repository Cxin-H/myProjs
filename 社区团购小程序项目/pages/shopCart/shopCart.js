// pages/shopCart/shopCart.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navBarHeight: app.globalData.navBarHeight,//导航栏高度
    menuBotton: app.globalData.menuBotton,//导航栏距离顶部距离
    menuHeight: app.globalData.menuHeight, //导航栏高度
    changeDo:'编辑',
    cartList:[],
    num:1,
    totalMoney:0,
    forPayList:[],
    choosed:[],
    checkAll:false,
    thisCheck:false
  },
  // 编辑按钮
  bianji(){
    var changeDo = this.data.changeDo
    if(changeDo=='编辑'){
      this.setData({changeDo:'完成'})
    }else if(changeDo=='完成'){
      this.setData({changeDo:'编辑'})
    }
  },
  getList(){
    let that = this;
    wx.request({
      url:app.globalData.api+ '/getCartList',
      success(res){
       console.log(res.data.data)
        that.setData({
          cartList:res.data.data
        })
      }
    })
  },




  // 点击商品返回详情
  // goDetail(){

  // },
  //数量加减
  jian(e){
    var index = e.currentTarget.dataset.id;
    var selectedNum = this.data.cartList[index].good_num;
    var selectedId = this.data.cartList[index].all_incart_id;
    let that=this;
    if(selectedNum > 1){
      wx.request({
        url: app.globalData.api+ '/cartjian',
        data:{
          cartId:selectedId
        },
        success(res){
          console.log(res)
          that.setData({
            cartList:res.data.data
          })
        }
      })
      that.data.choosed.map((v,i)=>{
        if(v == index){
          var totalMoney = that.data.totalMoney-that.data.cartList[index].now_price
          that.setData({totalMoney:totalMoney})
        }  
      })
    }
  },
  jia(e){
    var index = e.currentTarget.dataset.id;
    var selectedNum = this.data.cartList[index].good_num;
    var selectedId = this.data.cartList[index].all_incart_id;
    let that=this;
    if(selectedNum < 99){
      wx.request({
        url: app.globalData.api+ '/cartjia',
        data:{
          cartId:selectedId
        },
        success(res){
          console.log(res)
          that.setData({
            cartList:res.data.data
          })
          that.data.choosed.map((v,i)=>{
            if(v == index){
              var totalMoney = that.data.totalMoney+that.data.cartList[index].now_price
              that.setData({totalMoney:totalMoney})
            }  
          })
        }
      })  
    }
  },
  // checkbox操作
  checkboxChange(event){
    let forPayList = [];
    this.setData({choosed:event.detail.value})
    if(this.data.choosed.length == this.data.cartList.length){
      this.setData({
        checkAll:true,
      })
    }else{
      this.setData({
        checkAll:false,
      })
    }
    for (let index = 0; index < event.detail.value.length; index++) {
      const cart_index = event.detail.value[index];
      forPayList.push(this.data.cartList[Number(cart_index)])
    }
    var totalMoney = 0;
    for(let index = 0;index < forPayList.length;index++){
      totalMoney += forPayList[index].now_price*forPayList[index].good_num
    }
    this.setData({forPayList:forPayList})
    this.setData({totalMoney:totalMoney})
  },
  handleAllChecked(){
      let forPayList = this.data.cartList
      let totalMoney = 0;
      forPayList.map((v,i)=>{
        totalMoney += v.now_price*v.good_num;
      })
      this.setData({
        checkAll:!this.data.checkAll,
        thisCheck:!this.data.checkAll,
        totalMoney:this.data.checkAll?0:totalMoney,
        forPayList:this.data.checkAll?forPayList:[]
      })
  },
  del(){
    let that = this;
    this.data.forPayList.map((v,i)=>{
      wx.request({
        url: app.globalData.api+ '/delGoodFromCart',
        data:{
          goodId:v.all_incart_id
        },
        success(res){
          console.log(res)
          wx.showToast({  
            title: '删除成功',
            icon: 'success',
            duration: 2000
          })
          that.onShow()
          that.setData({
            totalMoney:0,
            checkAll:false,
            thisCheck:false
          })
        }
      })  
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList();
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
    this.getList();
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