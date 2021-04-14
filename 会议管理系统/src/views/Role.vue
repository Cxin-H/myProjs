<template>
  <div id="jueSe">
    <!--  添加  删除 修改   -->
    <div class="tableFather">
      <section class="caoZuoTable">
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="centerDialogVisible = true">添加</el-button>
        <el-button type="primary" icon="el-icon-edit" @click="edit">修改</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="openDel">删除</el-button>
      </section>
    </div>
    <!--   表格  -->
    <div>
      <div class="content">
        <el-table
            ref="multipleTable"
            border
            tooltip-effect="dark"
            @selection-change="handleSelectionChange"
            :data="showData"
            style="width: 100%;" class="tableContent">
          <el-table-column
              type="selection"
              width="100"
              v-model="checkAll">
          </el-table-column>
          <el-table-column
              prop="id"
              label="编号"
              width="500">
          </el-table-column>
          <el-table-column
              prop="jueSeMing"
              label="角色名"
              width="500">
          </el-table-column>
          <el-table-column
              prop="auth"
              label="权限"
              width="230">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 分页-->
    <div id="fenYe">
      <el-pagination
          background
          layout="total,prev, pager, next"
          @current-change="changePage"
          :total="totalPage"
          :pager-count="5">
      </el-pagination>
    </div>
    <!-- 添加  模态框  -->
    <el-dialog
        title="添加"
        :visible.sync="centerDialogVisible"
        :width="dialogWidth"
        center>
      <el-form :model="form" :rules="addRules">
        <el-form-item label="编号" :label-width="formLabelWidth" required prop="id">
          <el-input v-model="form.id" autocomplete="off" clearable class="souSuo"></el-input>
        </el-form-item>
        <el-form-item label="角色名" :label-width="formLabelWidth" required prop="jueSeMing">
          <el-input v-model="form.jueSeMing" autocomplete="off" clearable class="souSuo"></el-input>
        </el-form-item>
        <el-form-item label="权限" :label-width="formLabelWidth" required prop="auth">
          <el-input v-model="form.auth" autocomplete="off" clearable class="souSuo"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addSure">确 定</el-button>
  </span>
    </el-dialog>
    <!-- 修改  模态框  -->
    <el-dialog
        title="修改"
        :visible.sync="editDialogVisible"
        :width="dialogWidth"
        center>
      <el-form :model="editForm">
        <el-form-item label="编号" :label-width="formLabelWidth">
          <el-input v-model="editForm.id" autocomplete="off" disabled class="souSuo"></el-input>
        </el-form-item>
        <el-form-item label="角色名" :label-width="formLabelWidth">
          <el-input v-model="editForm.jueSeMing" autocomplete="off" clearable class="souSuo"></el-input>
        </el-form-item>
        <el-form-item label="权限" :label-width="formLabelWidth">
          <el-input v-model="editForm.auth" autocomplete="off" clearable class="souSuo"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="editDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="editData">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "Role",
  data:function(){
    return {
      //搜索条件
      options: [
        {
          value: 'id',
          label: '编号'
        },
        {
          value: 'jueSeMing',
          label: '角色名'
        }
      ],
      value: '',
      //搜索
      input:'',//搜索输入框的值
      showData:[],
      //复选框
      multipleSelection:[],
      tempCheck:'',
      checkAll:false,
      //模态框
      formLabelWidth: '120px',
      //添加模态框
      centerDialogVisible: false, //添加
      form: {
        id:'',
        jueSeMing:'',
        auth:''
      },
      //修改模态框
      editDialogVisible:false, //修改
      editForm:{
        id:'',
        jueSeMing:'',
        auth:''
      },
      //分页
      totalPage:1,
      //dialog自适应
      dialogWidth:'100',
      //查询 下拉单
      id:'',
      jueSeMing:'',
      auth:'',
      //表单验证
      addRules:{
        jueSeMing:[
          { required: true, message: '请输入角色名', trigger: 'blur' },
          { min: 1, max: 12, message: '长度在 1 到 12 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    //添加
    addSure(){
      let that=this;
      this.$axios({
        method:'post',
        url:"/jueSe/xinZeng",
        headers:{"Content-Type":"application/json"},
        data:{
          id:this.form.id,
          jueSeMing:this.form.jueSeMing,
          auth:this.form.auth
        }
      }).then((res)=>{
        if(res.data.code==200){
          that.centerDialogVisible=false;
          that.changePage(1);//重新渲染
          that.chengGong('添加成功');
          that.closeDialog();
        }else{
          this.centerDialogVisible=true;
          that.shiBai('添加失败');
          that.closeDialog();//清空
        }
      }).catch((err)=>{
        console.log(err);

      })

    },
    //修改
    edit(){
      let that=this;
      if(this.multipleSelection.length==0){
        this.shiBai('请选择一条编辑数据！');
      }else if(this.multipleSelection.length==1){
        this.editDialogVisible=true;
        let showTemp = this.showData;
        showTemp.forEach(function (v) {
          if (v.id == that.tempCheck) {
            that.editForm.id=v.id;
            that.editForm.jueSeMing=v.jueSeMing;
            that.editForm.auth=v.auth;
          }
        })
      }else {
        this.shiBai('只能选择一条编辑数据！');
      }
    },
    editData(){
        this.$axios({
          url:'/jueSe/gengXinById',
          method:'post',
          headers:{"Content-Type":"application/json"},
          data:{
            id:this.editForm.id,
            jueSeMing:this.editForm.jueSeMing,
            auth:this.editForm.auth
          }
        }).then((res)=>{
          if(res.data.code==200){
            this.changePage(1);//重新渲染
            this.chengGong('修改成功');
            this.editDialogVisible=false;
          }
        }).catch(err=>{
          this.shiBai('修改失败');
          console.log(err);
        })
    },
    //删除
    openDel() {
      if(this.tempCheck.length == 0){
        this.shiBai('请至少选择一条删除')
      }
      if(this.tempCheck.length >=1 || this.multipleSelection.length == this.showData.length){
        this.$confirm('确定删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.del();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
    del(){
      this.$axios({
        method:'post',
        url:"/jueSe/shanChuById",
        params:{
          id:this.tempCheck
        }
      }).then((res)=>{
        if(res.data.code==200){
          this.changePage(1);//重新渲染
          this.chengGong('删除成功');
        }
      }).catch((err)=>{
        console.log(err);
        this.shiBai('删除失败');
      })
    },
    //成功提示
    chengGong(msg){
      this.$message({
        message: msg,
        type: 'success',
        duration:1000
      });
    },
    //失败提示
    shiBai(msg){
      this.$message({
        showClose: true,
        message: msg,
        type: 'error',
        duration:1000
      });
    },
    //全选
    handleSelectionChange(val) {
      this.multipleSelection = [];
      for(let i=0;i<val.length;i++){
        this.multipleSelection=this.multipleSelection.concat(val[i].id);
      }
      this.tempCheck=this.multipleSelection.toString();
    },

    //分页
    changePage(val){
      this.$axios({
        method:'get',
        url:"/jueSe/chaXunAll",
        params:{
          page:val
        }
      }).then((res)=>{
        this.showData=res.data.list;
        this.totalPage=res.data.count;
      }).catch((err)=>{
        console.log(err);
      })
    },
    //dialog自适应
    setDialogWidth() {
      let val = document.body.clientWidth
      const def = 450 // 默认宽度
      if (val < def) {
        this.dialogWidth = '100%'
      } else {
        this.dialogWidth = def + 'px'
      }
    },
  },
  mounted(){
    this.$axios({
      method:'get',
      url:"/jueSe/chaXunAll",
      params:{
        page:1
      }
    }).then((res)=>{
      this.showData=res.data.list;
      this.totalPage=res.data.count;//获取总条数
    }).catch((err)=>{
      console.log(err);
    })
  }
}
</script>

<style scoped>

/*#jiGou>div:nth-child(1){
  height: 100px;
}*/
.caoZuo>span{
  margin:0 10px;
}
.souSuo{
  width: 200px;
}
.tableFather{
  overflow: hidden;

}
.caoZuoTable{
  float: left;
  margin: 10px 0;
  padding: 0 0 0 20px;
}
.content{
  display: flex;
}
#fenYe{
  margin: 10px 0;
  text-align: center;
}
</style>