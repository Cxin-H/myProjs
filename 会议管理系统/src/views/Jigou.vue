<template>
  <div id="jiGou">
    <!--  添加  删除 修改 查询  -->
    <div class="tableFather">
      <section class="caoZuoTable">
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="centerDialogVisible = true">添加</el-button>
        <el-button type="primary" icon="el-icon-edit" @click="edit">修改</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="openDel">删除</el-button>
      </section>
      <section class="sear">
        <el-select
          v-model="value"
          placeholder="请选择搜索条件"
          clearable
          class="elSelect"
          @change="elSelect">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
        <el-input placeholder="请输入内容" v-model="input" clearable class="souSuo"></el-input>
        <span class="search">
            <el-button type="success" icon="el-icon-search" @click="search" autofocus>搜索</el-button>
        </span>
      </section>
    </div>
    <!--   表格  -->
    <div>
      <div class="content">
        <el-table
            ref="multipleTable"
            tooltip-effect="dark"
            border
            @selection-change="handleSelectionChange"
            :data="showData"
            style="width: 100%;" class="tableContent">
          <el-table-column
              type="selection"
              width="55">
          </el-table-column>
          <el-table-column
              prop="id"
              label="编号">
          </el-table-column>
          <el-table-column
              prop="mingCheng"
              label="机构名称">
          </el-table-column>
          <el-table-column
              prop="diZhi"
              label="机构地址"
              width="350">
          </el-table-column>
          <el-table-column
              prop="fuZeRen"
              label="负责人">
          </el-table-column>
          <el-table-column
              prop="lianXiDianHua"
              label="联系电话">
          </el-table-column>
          <el-table-column
              prop="jiGou.jiGouMing"
              label="所属公司">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 分页-->
    <div  id="fenYe">
      <el-pagination
          background
          layout="total,prev, pager, next"
          :total="totalPage"
          @current-change="changePage"
          :pager-count="5">
      </el-pagination>
    </div>
    <!-- 添加  模态框  -->
    <el-dialog
        title="添加"
        :visible.sync="centerDialogVisible"
        :width="dialogWidth"
        @close="closeDialog"
        center>
      <el-form :model="form" :rules="formRules" ref="ruleForm">
        <el-form-item label="机构名称" :label-width="formLabelWidth" prop="jiGouName">
          <el-input v-model="form.jiGouName" autocomplete="off" clearable class="souSuo"></el-input>
        </el-form-item>
        <el-form-item label="机构地址" :label-width="formLabelWidth" prop="address">
          <el-input v-model="form.address" autocomplete="off" clearable class="souSuo"></el-input>
        </el-form-item>
        <el-form-item label="负责人" :label-width="formLabelWidth"  prop="administrator">
          <el-input v-model="form.administrator" autocomplete="off" clearable class="souSuo"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth" prop="tel">
          <el-input v-model="form.tel" autocomplete="off" clearable class="souSuo"></el-input>
        </el-form-item>
        <el-form-item label="所属公司" :label-width="formLabelWidth" prop="region">
          <el-select v-model="form.region" placeholder="请选择所属公司">
            <el-option label="海应财富管理有限公司" value="1"></el-option>
            <el-option label="海金财富管理有限公司" value="2"></el-option>
            <el-option label="海铜财富管理有限公司" value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addSure('ruleForm')">确 定</el-button>
  </span>
    </el-dialog>
    <!-- 修改  模态框  -->
    <el-dialog
        title="修改"
        :visible.sync="editDialogVisible"
        :width="dialogWidth"
        center>
      <el-form :model="editForm" :rules="formRules" ref="ruleForm">
        <el-form-item label="编号" :label-width="formLabelWidth">
          <el-input v-model="editForm.id" autocomplete="off" disabled class="souSuo"></el-input>
        </el-form-item>
        <el-form-item label="机构名称" :label-width="formLabelWidth" prop="jiGouName">
          <el-input v-model="editForm.jiGouName" autocomplete="off" clearable class="souSuo"></el-input>
        </el-form-item>
        <el-form-item label="机构地址" :label-width="formLabelWidth" prop="address">
          <el-input v-model="editForm.address" autocomplete="off" clearable class="souSuo"></el-input>
        </el-form-item>
        <el-form-item label="负责人" :label-width="formLabelWidth" prop="administrator">
          <el-input v-model="editForm.administrator" autocomplete="off" clearable class="souSuo"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth" prop="tel">
          <el-input v-model="editForm.tel" autocomplete="off" clearable class="souSuo"></el-input>
        </el-form-item>
        <el-form-item label="所属公司" :label-width="formLabelWidth" prop="region">
          <el-select v-model="editForm.region" placeholder="请选择所属公司">
            <el-option label="海应财富管理有限公司" value="1"></el-option>
            <el-option label="海金财富管理有限公司" value="2"></el-option>
            <el-option label="海铜财富管理有限公司" value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="editDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="editData('ruleForm')">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "Jigou",
  data:function(){
    // 此处自定义校验手机号码js逻辑
    var phoneReg =/^1[3|4|5|6|7|8][0-9]{9}$/;
    var validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('号码不能为空!'));
      }
      setTimeout(() => {
        if (!phoneReg.test(value)) {
          callback(new Error('格式有误'));
        } else {
          callback();
        }
      }, 1000)
    }
    return {
      //搜索条件
      options: [
        {
          value: 'diZhi',
          label: '地址'
        },
        {
          value: 'fuZeRen',
          label: '负责人'
        },
        {
          value: 'mingCheng',
          label: '机构名称'
        },
        {
          value: 'lianXiDianHua',
          label: '联系电话'
        }
      ],
      value: '',
      //搜索
      input:'',//搜索输入框的值
      showData:[],
      //复选框
      multipleSelection:[],
      tempCheck:'',
      //模态框
      formLabelWidth: '120px',
      //添加模态框
      centerDialogVisible: false, //添加
      form: {
        id:'',
        jiGouName:'',
        address:'',
        administrator:'',
        tel:'',
        region:''
      },
      //修改模态框
      editDialogVisible:false, //修改
      editForm:{
        id:'',
        jiGouName:'',
        address:'',
        administrator:'',
        tel:'',
        region:''
      },
      //分页
      totalPage:1,
      //dialog自适应
      dialogWidth:'100',
      //查询 下拉单
      diZhi:'',
      fuZeRen:'',
      lianXiDianHua:'',
      mingCheng:'',
      //表单验证
      formRules:{
        jiGouName:[
          { required: true, message: '机构名称不能为空', trigger: 'blur' },
          { min: 2, max: 25, message: '长度在 2 到 25 个字符', trigger: 'blur' }
        ],
        address:[
          { required: true, message: '机构地址不能为空', trigger: 'blur' },
          { min: 3, max: 35, message: '长度在 3 到 35 个字符', trigger: 'blur' }
        ],
        // 校验手机号码，主要通过validator来指定验证器名称
        administrator:[
          { required: true, message: '负责人不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
          { required: true, pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/, message: '负责人姓名不支持特殊字符', trigger: 'blur'}
        ],
        tel:[{ required: true, validator: validatePhone, trigger: 'blur' }],
        region:[  { required: true, message: '请选择所属公司', trigger: 'change' }]
      }
    }
  },
  methods:{
    //搜索条件下拉框
    elSelect(){
      console.log(this.value);
      switch (this.value){
        case "diZhi":
          this.diZhi='diZhi';
          break;
        case "fuZeRen":
          this.fuZeRen='fuZeRen';
          break;
          /*  case "jiGouMing":
              this.jiGouMing='jiGouMing';
              break;*/
        case "lianXiDianHua":
          this.lianXiDianHua='lianXiDianHua';
          break;
        case "mingCheng":
          this.mingCheng='mingCheng';
          break;
        default:
          // this.value='';
          break;
      }
    },
    //搜索
    search(){
      if(this.input=='' || this.value==''){
        this.shiBai('请选择查询条件，且查询内容不能为空');
        this.changePage(1);
      } else{ //(this.input!='' && this.value!='')
        this.$axios({
          method:'get',
          url:"/jiGouZi/chaXunFenYe",
          params:{
            page:1,
            diZhi:this.diZhi=='diZhi' ? this.input:'',
            fuZeRen:this.fuZeRen=='fuZeRen' ? this.input:'',
            // jiGouMing:this.jiGouMing=='jiGouMing' ? regions:'',
            lianXiDianHua:this.lianXiDianHua=='lianXiDianHua' ? this.input:'',
            mingCheng:this.mingCheng=='mingCheng' ? this.input:''
          },
          headers:{"Content-Type":"application/x-www-form-urlencoded"}
        }).then((res)=>{
          console.log(res);
          if(res.data.count){
            this.input='';
            this.diZhi='';
            this.fuZeRen='';
            // this.jiGouMing='';
            this.lianXiDianHua='';
            this.mingCheng='';
            this.chengGong(res.data.msg);
            this.showData=res.data.data;
            this.totalPage=res.data.count;//重新渲染分页
          }else{
            this.shiBai('查询失败');
          }
        }).catch((err)=>{
          console.log(err);
        })
      }
    },
    //添加
    addSure(formName){
      let that=this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            method:'post',
            url:"/jiGouZi/xinZeng",
            headers:{"Content-Type":"application/json"},
            data:{
              diZhi:that.form.address,
              fuZeRen:that.form.administrator,
              jiGouId:that.form.region,
              lianXiDianHua:that.form.tel,
              mingCheng:that.form.jiGouName
            }
          }).then((res)=>{
            if(res.data.code==200){
              that.changePage(1);//重新渲染
              that.chengGong('添加成功');
              that.closeDialog();
              that.centerDialogVisible=false;
            }

          }).catch((err)=>{
            console.log(err);
            that.centerDialogVisible=true;
            that.shiBai('添加失败');
            that.closeDialog();//清空
          })

        } else {
          console.log('error submit!!');
          return false;
        }
      });
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
            that.editForm.jiGouName=v.mingCheng;
            that.editForm.address=v.diZhi;
            that.editForm.administrator=v.fuZeRen;
            that.editForm.tel=v.lianXiDianHua;
            that.editForm.region=v['jiGou']['jiGouMing'];
          }
        })
      }else {
        this.shiBai('只能选择一条编辑数据！');
      }
    },
    editData(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let regions = this.editForm.region;
          if(regions=='海应财富管理有限公司'){
            regions=1;
          }else if(regions=='海金财富管理有限公司'){
            regions=2;
          }else {
            regions=3;
          }
          this.$axios({
            url:'/jiGouZi/gengXinById',
            method:'post',
            headers:{"Content-Type":"application/json"},
            data:{
              id:this.editForm.id,
              diZhi:this.editForm.address,
              fuZeRen:this.editForm.administrator,
              jiGouId:regions,
              lianXiDianHua:this.editForm.tel,
              mingCheng:this.editForm.jiGouName
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
        } else {
          return false;
        }
      });

    },
    //删除
    openDel() {
      if(this.tempCheck.length==0){
        this.shiBai('请至少选择一条删除')
      }
      if(this.tempCheck.length >=1 || this.multipleSelection.length == this.showData.length){
        this.$confirm('确定删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // console.log('确定啊啊啊啊啊啊啊啊啊');
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
        url:"/jiGouZi/shanChuById",
        params:{
          id:this.tempCheck
        }
      }).then((res)=>{
        if(res.data.code==200){
          this.chengGong('删除成功');
          this.totalPage=res.data.count;//重新渲染分页
          this.changePage(1);//重新渲染
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
        url:"/jiGouZi/chaXunFenYe",
        params:{
          page:val
        }
        // headers:{"content-type":"application/x-www-form-urlencoded"}
      }).then((res)=>{
        // console.log(res,'分页');
        this.showData=res.data.data;
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
    //关闭dialog时清空
    closeDialog(){
      this.form.address=''
      this.form.administrator=''
      this.form.region=''
      this.form.tel=''
      this.form.jiGouName=''
    }
  },
  mounted(){
    this.$axios({
      method:'get',
      url:"/jiGouZi/chaXunFenYe",
      params:{
        page:1
      }
      // headers:{"content-type":"application/x-www-form-urlencoded"}
    }).then((res)=>{
      this.showData=res.data.data;
      this.totalPage=res.data.count;//获取总条数
    }).catch((err)=>{
      console.log(err);
    })

    //dialog自适应------监听window.onresize事件
    window.onresize = () => {
      return (() => {
        this.setDialogWidth()
      })()
    }

  }
}
</script>

<style scoped>

#jiGou>div:nth-child(1){
  /*height: 80px;*/
  /*border:1px solid #0c5460;*/
}
.caoZuo{
  width: 600px;
  display: flex;
  align-items: center;
  height: 100%;
  margin: auto;
  /*border:1px solid red;*/
}
.sear{
  display: flex;
  height: 100%;
  padding: 10px 0 10px 30px;
}
.search{
  margin-left: 10px;
}
.elSelect{
  padding: 0 20px;
}
.caoZuo>span{
  padding:0 10px;
}
.souSuo{
  width: auto;
}
.tableFather{
  display: flex;
  padding: 0 0 0 20px;
}
.caoZuoTable{
  display: flex;
  /*float: left;*/
  padding: 10px 0;
}
.content{
  display: flex;
  overflow: hidden;
}
#fenYe{
  padding: 10px 0;
  text-align: center;
}

</style>