<template>
  <div class="con">
    <div class="head">
      <section class="demo">
        <el-form ref="form" :model="searchForm" label-width="100px" size="medium" :inline="inlineBoolean"  label-position="right">
          <el-form-item label="会议室名称">
            <el-input v-model="searchForm.meetingName"></el-input>
          </el-form-item>
          <el-form-item label="机构">
            <el-select v-model="searchForm.jiGouId" placeholder="请选择" clearable>
              <el-option
                  v-for="item in jiGouArr"
                  :key="item.value"
                  :label="item.jiGouMing"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="配置">
            <el-input v-model="searchForm.peiZhi"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="success" icon="el-icon-search" @click="search">搜索</el-button>
      </section>
      <section class="caoZuo">
        <el-button type="danger" icon="el-icon-delete" @click="del">删除</el-button>
        <el-button type="primary" icon="el-icon-edit" @click="update()">修改</el-button>
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="add">添加</el-button>
      </section>
    </div>
    <div class="middle">
      <!--      <el-button type="danger" icon="el-icon-delete" @click="del">删除</el-button>
            <el-button type="primary" icon="el-icon-edit"
                       @click="update()">修改</el-button>
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="add">添加</el-button>-->
      <el-table
          ref="multipleTable"
          border
          :data="searchAll"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            label="会议室名称"
            prop="mingCheng">
        </el-table-column>
        <el-table-column
            label="会议室照片">
          <template slot-scope="scope">
            <img :src="'http://140.143.14.44:8864'+scope.row.zhaoPian" style="height: 50px"/>
          </template>
        </el-table-column>
        <el-table-column
            prop="peiZhi"
            label="配置"
            show-overflow-tooltip>
        </el-table-column>
        <el-table-column
            prop="miaoShu"
            label="描述"
            show-overflow-tooltip>
        </el-table-column>
        <el-table-column
            prop="jiGouzi.jiGou.jiGouMing"
            label="所属机构"
            show-overflow-tooltip>
        </el-table-column>
        <el-table-column
            prop="jiGouzi.mingCheng"
            label="所属公司"
            show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </div>
    <div class="fenYe">
      <el-pagination
          layout="total,prev, pager, next"
          :total="total"
          @current-change="currentChange">
      </el-pagination>
    </div>
    <el-dialog :title="addB?'添加':'修改'" :visible.sync="dialogFormVisible" width="40%"  :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
      <el-form>
        <el-form-item label="会议名称" label-width="120px">
          <el-input  v-model ="updateForm.mingCheng" @change="logValue" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="120px">
          <el-upload
              :action="addB?'http://140.143.46.122:20001/huiYiShi/xinZeng':'/huiYiShi/gengXin'"
              class="avatar-uploader"
              :show-file-list="false"
              :auto-upload="false"
              :on-change="addB?addBeforeUpload:beforeAvatarUpload"
              ref="upload"

              :data="addB?{
                jiGouZiId:updateForm.JiGouZiid,
                miaoShu:updateForm.miaoShu,
                mingCheng:updateForm.mingCheng,
                peiZhi:updateForm.peiZhi
              }:{
                id: updateForm.updateId,
                peiZhi:updateForm.peiZhi,
                miaoShu:updateForm.miaoShu,
                mingCheng:updateForm.mingCheng,
                jiGouZiId:updateForm.JiGouZiid}">
            <img v-if="picture" :src="picture" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="配置" label-width="120px">
          <el-input  v-model="updateForm.peiZhi" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" label-width="120px">
          <el-input v-model=" updateForm.miaoShu" autocomplete="off"></el-input>
        </el-form-item >
        <el-form-item label="所属公司" label-width="120px" >
          <el-select v-model="updateForm.JiGouZiid" placeholder="请选择" clearable>
            <el-option
                v-for="item in jiGouZiArr"
                :key="item.value"
                :label="item.mingCheng"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="sure" >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped>
.con{
  width: 1320px;
  margin: 0 auto;
  padding: 0 10px;
}
.head{
  /*background: #C6D5DD;*/
  display: flex;
  padding: 10px;
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
  width: 1447px;
  text-align: left;
}
.demo{
  display: flex;
  /*width:  900px;*/
  /*padding-left: 50px;*/
  /*text-align: left;*/
  /*padding-top: 20px;*/
  /*padding-right: 50px;*/
}
.caoZuo{
  display: flex;
  /*align-items: center;*/
}
.avatar-uploader{
  width: 200px;
}
.avatar-uploader .avatar-uploader-icon {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 100px;
  display: block;
}
.el-select {
  display: inline-block;
  position: relative;
  width: 100%;
}
.fenYe{
  text-align: center;
}
</style>
<script>
// @ is an alias to /src
export default {
  name: 'Home',
  data: function () {

    return {
      inlineBoolean:true,
      testValue:'',
      addB:false,
      searchAll:[],
      searchForm:{

        meetingName:'',
        peiZhi:'',
        jiGouId:''},
      delArr:[],
      total:0,
      current:1,
      updateId:'',
      picture:'',
      addForm:{
        peiZhi:'',
        miaoShu:'',
        mingCheng:'',
        JiGouZiid:'',
        picture:''
      },
      updateForm:{
        updateId:'',
        peiZhi:'',
        miaoShu:'',
        mingCheng:'',
        jiGouId:'',
        JiGouZiid:'',
      },

      fileB:false,
      dialogFormVisible:false,
      jiGouArr:[],
      jiGouZiArr:[],
      jiGouId: ''
    }
  },
  methods:{
    logValue(){
      console.log(this.testValue)
    },
    currentChange(val){
      const th=this;
      this.current=val;
      console.log(this.current);
      this.$axios.get('huiYiShi/chaXunTiaoJian?page='+th.current).then((res)=>{
        th.searchAll=res.data.data;
        // console.log(res);
        th.total=res.data.count;
      })

    },

    handleSelectionChange(val){

      this.updateForm.updateId=val[0].id;
      // console.log( this. updateForm.peiZhi);
      this.updateForm.peiZhi=val[0].peiZhi;
      this.updateForm.jiGouId=val[0].jiGouZiId;
      this.updateForm.mingCheng=val[0].mingCheng;
      this.updateForm.miaoShu=val[0].miaoShu;
      this.updateForm.JiGouZiid=val[0].jiGouzi.id
      this.picture='http://140.143.14.44:8864'+val[0].zhaoPian;
      this.delArr=[];

      for (let i = 0; i < val.length; i++) {
        //concat方法在数组后追加内容。
        this.delArr = this.delArr.concat(val[i].id)

      }

      console.log(this.delArr);
      console.log(this.updateForm)
    },
    del(){
      if (this.delArr.length<=0){
        this.shiBai('请选择要删除的消息');
      }
      else {
        console.log(this.delArr.toString());
        const th = this;
        this.$axios({
          url: '/huiYiShi/chanChuById',
          method: 'post',
          headers: {'content-type': 'application/json'},
          params: { //post请求后端取不到参数试一下将data改成params
            id: th.delArr.toString()
          }
        }).then(() => {
          this.$axios.get('huiYiShi/chaXunTiaoJian?page=' + th.current).then((res) => {

            th.searchAll = res.data.data;
            th.total = res.count;
            th.chengGong('成功')          })
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    update(){
      if (this.delArr.length==0){
        this.shiBai('请选择要修改的消息');
      }
      else  if (this.delArr.length>1){
        this.shiBai('只能修改一条消息');
      }
      else{
        this.dialogFormVisible=true;

      }
    },
    upload(){
      console.log("uploadFile")

    },
    // httpRequest(param){
    // },
    sure(){
      const th = this;
      if (this.fileB) {
        console.log('aaa');
        this.$refs.upload.submit();
        this.dialogFormVisible=false;

        this.$axios.get('huiYiShi/chaXunTiaoJian?page=' + th.current).then((res) => {
          th.searchAll = res.data.data;
          th.total = res.data.count;
          th.fileB=false;
          if (th.addB) {
            this.chengGong('增加成功');
          }
          else {
            this.chengGong('修改成功');
          }
        })
      }
      else if (!this.addB){
        this.$axios({
          url:'/huiYiShi/gengXin',
          method:'post',
          headers:{'content-type':'application/json'},
          params:{
            id: th.updateForm.updateId,
            peiZhi:th.updateForm.peiZhi,
            miaoShu:th.updateForm.miaoShu,
            mingCheng:th.updateForm.mingCheng,
            jiGouZiId:th.updateForm.JiGouZiid,
          }
        }).then(() =>{
          this.dialogFormVisible=false;

          this.$axios.get('huiYiShi/chaXunTiaoJian?page=' + th.current).then((res) => {
            th.searchAll = res.data.data;
            th.total = res.data.list.count;

            this.chengGong('修改成功');
          })
        })
      }
      else {
        console.log('aaa');
        console.log(this.addForm);
        const th=this;
        this.dialogFormVisible=false;
        this.$axios({
          url:'/huiYiShi/xinZeng',
          method:'post',
          headers:{'content-type':'application/json'},
          params:{
            jiGouZiId:th.updateForm.jiGouZiId,
            miaoShu:th.updateForm.miaoShu,
            mingCheng:th.updateForm.mingCheng,
            peiZhi:th.updateForm.peiZhi,
          }
        }).then(()=>{
          this.addB=false;
          this.chengGong('添加成功');
        })
      }

    },
    handleAvatarSuccess() {
      console.log('我执行了');
    },
    beforeAvatarUpload(file) {
      if (file.name){
        this.fileB=true;
        console.log(file);
        this.picture= URL.createObjectURL(file.raw)

      }
    },
    cancel(){

      this.dialogFormVisible=false;
      this.addB=false;
      this.updateForm.mingCheng='';
      this.updateForm.JiGouZiid='';
      this.updateForm.updateId='';
      this.updateForm.miaoShu='';
      this.updateForm.jiGouId='';
      this.updateForm.peiZhi='';
    },
    add(){
      this.dialogFormVisible=true;
      this.addB=true;
      this.picture='';
      console.log(this.addForm);
      this.updateForm.mingCheng='';
      this.updateForm.JiGouZiid='';
      this.updateForm.updateId='';
      this.updateForm.miaoShu='';
      this.updateForm.jiGouId='';
      this.updateForm.peiZhi='';

    },
    addBeforeUpload(file){
      if (file.name){
        this.fileB=true;
        console.log(file);
        this.picture= URL.createObjectURL(file.raw);
        console.log(this.addForm.picture)
      }
    },
    search(){
      const th=this;
      this.$axios.get('huiYiShi/chaXunTiaoJian?jiGouId='+th.searchForm.jiGouId+'&mingCheng='+th.searchForm.meetingName+'&peizhi='+th.searchForm.peiZhi+'&page=1' ).then((res)=>{
        th.searchAll=res.data.data;
        console.log(res.data.data);
        th.total=res.data.count;
      })
    }
    ,
    chengGong(msg){
      this.$message({
        message: msg,
        type: 'success',
        duration:1000
      });
    },
    shiBai(msg){
      this.$message({
        showClose: true,
        message: msg,
        type: 'error',
        duration:1000
      });
    }
  },

  mounted(){
    const  th=this;
    this.$axios.get('huiYiShi/chaXunTiaoJian?page=1').then((res)=>{
      th.searchAll=res.data.data;
      console.log(res.data.data);
      th.total=res.data.count;

    });
    this.$axios.get('/jiGou/chaXunAll').then((res)=>{
      th.jiGouArr=res.data.list;
      console.log(res.data);
    })
    this.$axios.get('/jiGouZi/chaXunAll').then((res)=>{
      th.jiGouZiArr=res.data.list;
      console.log(res.data);
    })
  }
}
</script>
