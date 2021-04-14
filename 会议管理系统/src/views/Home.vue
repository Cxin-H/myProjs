<template>
<div id="root">
  <div id="nav">
    <a href="#">会议室预定管理系统</a>
    <div id="right">
      <section>
        <el-dropdown>
          <span class="el-dropdown-link" >
             {{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-edit" @click.native="update">修改密码</el-dropdown-item>
            <el-dropdown-item @click.native="tuiChu" icon="el-icon-switch-button">退出</el-dropdown-item>

          </el-dropdown-menu>
        </el-dropdown>
        </section>
      <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="新密码" label-width="120px">
            <el-input show-password v-model="form.newPw1" placeholder="请输入新密码" clearable autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" label-width="120px">
            <el-input show-password v-model="form.newPw2" placeholder="请再次输入密码" clearable autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateOK">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
  <div id="layout">
    <el-col :span="3.5" class="leftNav">
      <el-menu
          class="el-menu-vertical-demo leftNav"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :default-active="this.$router.path" router>
        <el-menu-item index="/mymeeting">
          <i class="el-icon-tickets"></i>
          <span slot="title">我的会议</span>
        </el-menu-item>
        <el-menu-item index="/yuding">
          <i class="el-icon-menu"></i>
          <span slot="title">会议预定</span>
        </el-menu-item>
        <el-menu-item index="/meetingroom">
          <i class="el-icon-document"></i>
          <span slot="title">会议室</span>
        </el-menu-item>
        <el-submenu index="/system" v-if="isShow">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span slot="title" >系统管理</span>
          </template>
          <el-menu-item index="/system/users">用户管理</el-menu-item>
          <el-menu-item index="/system/jigou">机构管理</el-menu-item>
          <el-menu-item index="/system/role">角色管理</el-menu-item>
          <el-menu-item index="/system/auth">授权管理</el-menu-item>
          <el-menu-item index="/system/zhongduan">终端管理</el-menu-item>
          <el-menu-item index="/system/huiyiguanli">会议管理</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>
  </div>
  <!--    面包屑导航-->
  <Breadcrumb class="bread"></Breadcrumb>
  <router-view/>
</div>

</template>

<script>
export default {
  name: "Home",
  data(){
    return {
      isShow:false,
      userName:'未登录',
      form:{
        oldPw:'',
        newPw1:'',
        newPw2:'',
      },
      dialogFormVisible: false,
    }
  },
  methods: {
    tuiChu() {
      this.$confirm('此操作将注销登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        sessionStorage.clear();
        this.$store.commit('setLoginInfo', []);
        this.$router.replace("/");
        //触发后禁止浏览器的后退键
        history.pushState(null, null, document.URL);
        window.addEventListener("popstate", function () {
          history.pushState(null, null, document.URL);
        }, false);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
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
    update(){
      this.dialogFormVisible = true
    },
    updateOK(){
      let that = this;
      // console.log(this.userName)
      // console.log(this.form.newPw1)
      // console.log(this.form.newPw2)
      if(this.form.oldPw===""||this.form.newPw1===""||this.form.newPw2===""){
        this.shiBai("信息不能为空")
      }else if(this.form.newPw1!=this.form.newPw2){
        this.shiBai("两次密码输入不一致")
      }else{
        console.log(this.userName)
        console.log(this.form.newPw2)
        that.$axios({
          url:"http://140.143.46.122:30001/user/gengXinMiMa",
          method:"post",
          headers:{'content-type':'application/json'},//x-www-form-urlencoded
          data:{
            yongHuZhangHao: this.userName,
            miMa: this.form.newPw2,
          }
        }).then((res)=>{
          this.chengGong("密码修改成功");
          this.dialogFormVisible = false;
          console.log(res)

        }).catch((err)=>{
          console.log(err)
        })
      }
    },
  },
    mounted() {
      let auth = 1;
      if (auth === 1) {
        this.isShow = true
      }
      let name = JSON.parse(sessionStorage.getItem('loginInfo'));
      this.userName = name.userName;
    }
  }
</script>

<style scoped>
/*解决图片适应屏幕大小*/
html,body{
  height: 100%;
  margin: 0;
}
#nav {
  background: #66acce;
  height: 50px;
  line-height: 50px;
}
#nav>a{
  color: #ffffff;
  text-decoration:none;
  font-size: 24px;
  margin-left: 30px;
}
#right{
  float: right;
}
#right>section{
  align-self: center;
  height: 50px;
}
.el-dropdown-link {
  cursor: pointer;
  font-size: 20px;
  margin-right: 50px;

  color: white;
}
.el-icon-arrow-down {
  font-size: 12px;
}
#root,#layout>.el-col,.leftNav{
  /*height: calc(100% - 50px);*/
  height: 100%;
}
#layout{
  float:left;
  height: calc(100% - 50px);
}
.bread{
  background: #E9EEF3;
  display: flex;
  align-items: center;
  height: 40px;
  margin-left: 10px;
}

</style>