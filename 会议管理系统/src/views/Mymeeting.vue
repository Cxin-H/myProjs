<template>
  <div>
    <el-container>
      <el-container>
        <el-main>
          <div class="topNav">
            <!--查询-->
            <div >
              <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="会议名称">
                  <el-input v-model="formInline.huiYiMingCheng" clearable placeholder="会议名称"></el-input>
                </el-form-item>
                <el-form-item label="会议室">
                  <el-select v-model="formInline.huiYiShiMingCheng" clearable placeholder="会议室">
                    <el-option v-for="(item,index) in rooms" :key="index" :value="item"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
            <div class="formDiv">
              <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="时间范围">
                  <el-date-picker
                      v-model="beginTime"
                      type="datetime"
                      placeholder="开始日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="至">
                  <el-date-picker
                      v-model="endTime"
                      type="datetime"
                      placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>
              </el-form>
            </div>
            <div class="btnDiv">
              <el-button type="success" icon="el-icon-search" @click="search">搜索</el-button>
              <el-button type="primary" icon="el-icon-edit" @click="updata">修改</el-button>
              <el-button type="danger" icon="el-icon-delete" @click="del">删除</el-button>
              <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                  <el-form-item label="会议名称" label-width="120px">
                    <el-input v-model="form.name" clearable autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="滚动字幕" label-width="120px">
                    <el-input v-model="form.content" clearable autocomplete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="updataOK">确 定</el-button>
                </div>
              </el-dialog>
            </div>
          </div>
          <!--表格-->
          <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                prop="huiYiMingCheng"
                label="会议名称"
                width="100">
            </el-table-column>
            <el-table-column
                prop="huiYiShi.mingCheng"
                label="会议室"
                width="120">
            </el-table-column>
            <el-table-column
                prop="gunDongZiMu"
                label="滚动字幕"
                width="100">
            </el-table-column>
            <el-table-column
                prop="kaiShiShiJian"
                label="开始时间"
                width="200">
            </el-table-column>
            <el-table-column
                prop="jieShuShiJian"
                label="结束时间"
                width="200">
            </el-table-column>
            <el-table-column
                prop="yonghu"
                label="创建人"
                width="120">
            </el-table-column>
            <el-table-column
                prop="chuangJianShiJian"
                label="创建时间"
                width="200">
            </el-table-column>
          </el-table>
          <!--分页-->
          <Mypagination @getTableData="getTableData" :totalPageNum="totalPage"></Mypagination>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<script>
Date.prototype.format = function(fmt) {
  // yyyy-MM-dd hh:mm:ss;
  let o = {
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
export default {
  name: "Mymeeting",
  data:function(){
    return {
      breadList:[],
      tableData:[],
      num:1,
      beginTime:'',
      endTime:'',
      dialogTableVisible: false,
      dialogFormVisible: false,
      selectData:[],
      form:{
        name:'',
        content:''
      },
      formInline: {
        huiYiMingCheng: '',
        huiYiShiMingCheng: ''
      },
      rooms:[],
      totalPage:1
    }
  },
  methods:{
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.cartData=this.multipleSelection;
      this.selectData=this.cartData;
    },
    //删除
    del() {
      let idItems=[];
      this.selectData.map((v)=>{
        idItems.push(v.id);
      })
      // console.log(idItems.toString());
      if(idItems.toString()===""){
        this.shiBai("至少选择一条")
      }else{
        this.$confirm('是否确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios({
            url:"/huiYi/shanChuById",
            method:"post",
            data:{
              id:idItems.toString()
            }
          }).then(()=>{
            const  that=this;
            this.$axios({
              url:"huiYi/chaXunAll",
              method:"post",
              params:{
                page:1
              }
            }).then((res)=>{
              that.tableData=res.data.data;
              that.totalPage=res.data.count
            }).catch((err)=>{
              console.log(err)
            })
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch((err)=>{
            console.log(err)
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
    //成功提示
    chengGong(msg){
      this.$message({
        message: msg,
        type: 'success'
      });
    },
    //失败提示
    shiBai(msg){
      this.$message.error(msg);
    },
    //修改
    updata(){
      if(this.selectData.length===0){
        this.shiBai("请选择一条信息")
      }else if(this.selectData.length===1){
        this.dialogFormVisible = true
      }else{
        this.shiBai("最多选择一条")
      }
    },
    //确认修改
    updataOK(){
      if(this.form.content===""||this.form.name===""){
        this.shiBai("信息不能为空")
      }else{
        this.$axios({
          url:"/huiYi/gengXinById",
          method:"post",
          data:{
            id:this.selectData[0].id,
            gunDongZiMu:this.form.content,
            huiYiMingCheng:this.form.name
          }
        }).then((res)=>{
          this.chengGong("修改成功");
          this.dialogFormVisible = false;
          console.log(res)
          const  that=this;
          this.$axios({
            url:"/huiYi/chaXunAll",
            method:"post",
            params:{
              page:1
            }
          }).then((res)=>{
            that.tableData=res.data.data;
          }).catch((err)=>{
            console.log(err)
          })

        }).catch((err)=>{
          console.log(err)
        })
      }
    },
    //查询
    search(){
      const  that=this;
      let tobeginTime=new Date(this.beginTime).format("yyyy-MM-dd hh:mm:ss");
      let toEndTime=new Date(this.endTime).format("yyyy-MM-dd hh:mm:ss");
      // console.log(tobeginTime.toString())
      if(tobeginTime==='NaN-aN-aN aN:aN:aN'){
        tobeginTime=''
      }
      if(toEndTime==='NaN-aN-aN aN:aN:aN'){
        toEndTime=''
      }
      this.$axios({
        url:"/huiYi/chaXunAll",
        method:"post",
        params:{
          page:1,
          huiYiMingCheng:that.formInline.huiYiMingCheng,
          mingCheng:that.formInline.huiYiShiMingCheng,
          kaiShiShiJian:tobeginTime,
          jieShuShiJian:toEndTime,
        }
      }).then((res)=>{
        that.tableData=res.data.data;
        that.totalPage=res.data.count;
      }).catch((err)=>{
        console.log(err)
      })
    },
    //分页传值
    getTableData(msg){
      this.tableData=msg;
    },
    //数组去重
    quChong(array){
      let arrs = [];
      array.map((v)=>{
        if (arrs.indexOf(v) === -1) {
          arrs.push(v)
        }
      })
      return arrs;
    },
  },
  mounted() {
    const  that=this;
    this.$axios({
      url:"/huiYi/chaXunAll",
      method:"post",
      params:{
        page:1
      }
    }).then((res)=>{
          that.tableData=res.data.data;
    }).catch((err)=>{
      console.log(err)
    })
    this.$axios({
      url:"/huiYiShi/chaXunAll",
      method:"get",
    }).then((res)=>{
      res.data.list.map((v)=>{
        that.rooms.push(v.mingCheng)
      })
      that.rooms=that.quChong(that.rooms)

    }).catch((err)=>{
      console.log(err)
    })
  },
}
</script>

<style scoped>
.el-main {
  background-color: #E9EEF3;
  color: #E9EEF3;
  padding-top: 0;
  height: 100%;

}
body > .el-container {
  margin-bottom: 40px;
}
.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-main[data-v-17ed21c5] {
  line-height: 65px
}
.el-table{
  height: 500px;
}
#fenye {
  margin-top: 5px;
  text-align: center;
}
.topNav{
  height: 120px;
}
body,html{
  height: 100%;
}
.btnDiv{
  float: left;
  height: 50px;
  margin-left: 20px;
}
.formDiv{
  float: left;
  height: 50px;
  /*margin-left: 20px;*/
}



</style>