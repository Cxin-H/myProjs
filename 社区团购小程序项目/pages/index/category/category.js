// pages/index/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateItems:[
      {
        cate_id: 1,
        cate_name: "公共程序",
        ishaveChild: true,
        children: "公共程序"
      },
      {
        cate_id: 2,
        cate_name: "公共策划",
        ishaveChild: true,
         children: "公共策划"
      },
      {
        cate_id: 3,
        cate_name: "郑州项目",
        ishaveChild: true,
         children: "郑州项目"
      },
      {
        cate_id: 4,
        cate_name: "成都项目",
        ishaveChild: true,
         children: "成都项目"
      },
      {
        cate_id: 5,
        cate_name: "三方客服",
        ishaveChild: true,
         children: "三方客服"
      }
    ],
    curNav: 1,
    curIndex: 0,
  },


  switchRightTab: function(e) {
    // 获取item项的id，和数组的下标值  
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index  
    this.setData({
      curNav: id,
      curIndex: index
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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