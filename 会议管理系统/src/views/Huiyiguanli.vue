<template>
  <div class="con">
    <div class="head">
      <!--     <div class="input-con">-->
      <!--       <div class="input-group">-->
      <!--         <label for="meetingName">会议名称</label>-->
      <!--         <input type="text" v-model="meetingName" id="meetingName">-->
      <!--       </div>-->
      <!--       <div class="input-group">-->
      <!--         <label for="meetingRoom">会议室</label>-->
      <!--         <input type="text" v-model="meetingRoom" id="meetingRoom">-->
      <!--       </div>-->
      <!--       <el-button type="success" icon="el-icon-search" @click="search">搜索</el-button>-->
      <!--     </div>-->
      <!--     <div class="input-con">-->
      <!--       <div class="input-group">-->
      <!--         <label>时间范围</label>-->

      <!--         <el-date-picker-->
      <!--             v-model="meetingStart"-->
      <!--             type="datetime"-->
      <!--             placeholder="选择日期"-->
      <!--             format="yyyy-MM-dd hh:mm:ss">-->

      <!--         </el-date-picker>-->

      <!--       </div>-->
      <!--       <div class="input-group last">-->
      <!--         <label >至</label>-->
      <!--         <el-date-picker-->

      <!--             v-model="meetingEnding"-->
      <!--             type="datetime"-->
      <!--             placeholder="选择日期"-->
      <!--             format="yyyy-MM-dd hh:mm:ss">-->
      <!--         </el-date-picker>-->
      <!--       </div>-->
      <!--     </div>-->
      <el-form ref="form" :model="searchForm" label-width="100px" size="medium" :inline="tableLine" class="demo" label-position="right">
        <el-form-item label="会议名称">
          <el-input v-model="searchForm.meetingName"></el-input>
        </el-form-item>
        <el-form-item label="会议室">
          <el-input v-model="searchForm.meetingRoom"></el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="success" icon="el-icon-search" @click="search">搜索</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="del">删除</el-button>
        </el-form-item>
        <el-form-item label="时间范围 从">
          <el-date-picker
              v-model="searchForm.meetingStart"
              type="datetime"
              placeholder="选择日期"
              format="yyyy-MM-dd hh:mm:ss">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="至">
          <el-date-picker
              size="medium"
              v-model="searchForm.meetingEnding"
              type="datetime"
              placeholder="选择日期"
              format="yyyy-MM-dd hh:mm:ss">
          </el-date-picker>
        </el-form-item>
      </el-form>
    </div>

    <div class="middle">
      <el-table
          ref="multipleTable"
          :data="recordArr"
          tooltip-effect="dark"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange">
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            label="会议名称"
            prop="huiYiMingCheng">
        </el-table-column>
        <el-table-column
            prop="huiYiShi.mingCheng"
            label="会议室">
        </el-table-column>
        <el-table-column
            prop="kaiShiShiJian"
            label="开始时间"
            show-overflow-tooltip>
        </el-table-column>
        <el-table-column
            prop="jieShuShiJian"
            label="结束时间"
            show-overflow-tooltip>
        </el-table-column>
        <el-table-column
            prop="yongHu.xingMing"
            label="创建人"
            show-overflow-tooltip>
        </el-table-column>
        <el-table-column
            prop="chuangJianShiJian"
            label="创建时间"
            show-overflow-tooltip>
        </el-table-column>
      </el-table>
<!--      <span class="demonstration"></span>-->
    </div>
    <div class="fenYe">
      <el-pagination
          layout="total,prev, pager, next"
          :page-size="10"
          :total="total"
          @current-change="currentChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>
Date.prototype.format = function(fmt) {
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt)) {
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  }
  for(var k in o) {
    if(new RegExp("("+ k +")").test(fmt)){
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    }
  }
  return fmt;
};

export  default {
  name:"About",
  data:function (){
    return{
      tableLine:true,
      current:1,
      recordArr:[],
      searchForm:{
        meetingName:'',
        meetingRoom:'',
        meetingStart:null,
        meetingEnding:null,
      },
      total:0,
      delArr:[],

    }
  },
  methods:{
    handleSelectionChange(val){
      this.delArr=[];
      for (let i = 0; i < val.length; i++) {
        //concat方法在数组后追加内容。
        this.delArr = this.delArr.concat(val[i].id)
      }
      console.log(this.delArr.toString())
    },
    del(){
      console.log(this.delArr.toString());
      const th=this;

      this.$axios({
        url:'/huiYi/shanChuById',
        method:'post',
        headers:{'content-type':'application/json'},
        params:{ //post请求后端取不到参数试一下将data改成params
          id:th.delArr.toString()
        }
      }).then(()=>{
        this.$axios.post('/huiYi/chaXunAll?page='+th.current).then((res)=>{
          th.recordArr=res.data.data;
          th.total=res.data.count;
          this.chengGong('删除成功');
        })
      }).catch((err)=>{
        console.log(err)
      })
    },
    currentChange(val){
      const th=this;
      this.current=val;
      console.log(this.current);
      this.$axios.post('/huiYi/chaXunAll?page='+th.current).then((res)=>{
        th.recordArr=res.data.data;
        // console.log(res);
        th.total=res.data.count;


      })

    }
    ,
    search(){

      if (this.searchForm.meetingStart==null||this.searchForm.meetingEnding==null){
        console.log(this.searchForm.meetingEnding);
        console.log(this.searchForm.meetingStart);
        const  th=this;
        this.$axios.post('/huiYi/chaXunAll?huiYiMingCheng='+th.searchForm.meetingName+'&huiyiShi='+th.searchForm.meetingRoom+'&page=1').then((res)=>{
          th.recordArr=res.data.data;
          console.log(res.data.data);
          th.total=res.data.count;
          console.log('全局查询')
        })
      }
      else {
        const  th=this;
        console.log(this.searchForm.meetingEnding);
        console.log(this.searchForm.meetingStart);

        // let startTime=  this.meetingStart;
        let startTime = new Date(this.searchForm.meetingStart).format("yyyy-MM-dd hh:mm:ss");
        // let endTime=this.meetingEnding;
        let endTime = new Date(this.searchForm.meetingEnding).format("yyyy-MM-dd hh:mm:ss");

        console.log(startTime, endTime);

        this.$axios.post('/huiYi/chaXunAll?huiYiMingCheng=' + th.searchForm.meetingName + '&huiYiShi=' + th.searchForm.meetingRoom + '&kaiShiShiJian=' +startTime + '&jieShuShiJian=' +endTime+ '&page=1').then((res) => {
          th.recordArr = res.data.data;
          // console.log(res.data.data);
          th.total = res.data.count;

        })
      }

    },
    chengGong(msg){
      this.$message({
        message: msg,
        type: 'success',
        duration:1000
      });
    }
  },
  shiBai(msg){
    this.$message({
      showClose: true,
      message: msg,
      type: 'error',
      duration:1000
    });
  },

  created:function (){
    const  th=this;
    this.$axios.post('/huiYi/chaXunAll?page=1').then((res)=>{
      console.log('aaa')
      th.recordArr=res.data.data;
      console.log(res.data.data);
      th.total=res.data.count;

    })
  }
}
</script>
<style scoped>
.con{
  /*width: 1200px;*/
  /*  margin: 0 auto;
    padding: 0 10px;*/

}
.head{
  width: 1180px;
  padding-top:10px;
  /*border: 1px solid red;*/
  margin:auto;
  height: 100px;
  display: flex;
}
.btn{
  align-self: flex-end;
}
button{
  height: 40px;
  border: none;
  color: aliceblue;
  margin-left: 20px;
  border-radius: 5px;
}
.middle{
  /*margin-top: 40px;*/
  text-align: left;
  display: flex;
  /*border: 1px solid green;*/
}
.demo{
  /* width:  900px;
   padding-left: 50px;
   text-align: left;
   padding-top: 20px;
   padding-right: 50px;*/
}
.el-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width:  220px !important;
}
.fenYe{
  text-align: center;
}
</style>
