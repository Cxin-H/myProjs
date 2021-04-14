// index.js
const app=getApp();
Page({
  data: {
    partList:[],
    goodList:[]
  },
  getList(){
    let that=this;
     wx.request({
       url:app.globalData.api+ '/getPartList',
       success(res){
        console.log(res)
         that.setData({
           partList:res.data.data
         })
       }
     })
     wx.request({
      url:app.globalData.api+ '/getGoodList',
      success(res){
        console.log(res)
        that.setData({
          goodList:res.data.data
        })
      }
    })
   },
  // 跳转到搜索页面
  search: function () {
    wx.navigateTo({
      url: '../search/search'
    })
  },
  godetail(e){
    var sendData;
    var tempArr=this.data.goodList;
    tempArr.forEach(function(v,i){
       if(v.good_id==e.currentTarget.dataset.id){
          sendData=v.good_id;
       }
    })
    wx.navigateTo({
      url: '../detail/detail',
      success(res){
        res.eventChannel.emit('getId',{data:sendData})
      }
    })
  },
  onLoad() {
    this.getList()
  }
})
