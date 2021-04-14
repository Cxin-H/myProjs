<template>
    <div class="bg">
        <div id="left">
            <span>会议预约管理系统</span>
        </div>
        <div id="right">
            <div class="right1" v-show="log=='log'">
                 <h1 class="title">欢迎登录</h1>
                 <el-form :rules="rules" ref="loginForm" :model="loginForm">
                   <el-form-item prop="userName">
                     <el-input
                         v-model="loginForm.userName"
                         placeholder="用户名"
                         autofocus
                         clearable
                         label="aa"
                         class="input .el-input__inner">
                       <i slot="prefix" class="el-input__icon el-icon-user"></i>
                     </el-input>
                   </el-form-item>
                   <el-form-item prop="password">
                     <el-input
                         show-password
                         v-model="loginForm.password"
                         placeholder="密码"
                         clearable
                         autofocus
                         class="input">
                       <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                     </el-input>
                   </el-form-item>
                 </el-form>
                 <section>
                   <el-button type="primary" @click="dengLu('loginForm')" class="elBtn">登录</el-button>
                 </section>
                 <section class="newZhuCe">
                <span>没有账号?</span>
                <span @click="changeReg">去注册</span>
              </section>
            </div>
            <div class="right2" v-show="regs=='reg'">
               <h1 class="title">欢迎注册</h1>
               <el-form :rules="rules" ref="regForm" :model="regForm">
                   <el-form-item prop="userName">
                     <el-input
                         v-model="regForm.userName"
                         placeholder="用户名"
                         autofocus
                         clearable
                         label="aa"
                         class="input .el-input__inner">
                       <i slot="prefix" class="el-input__icon el-icon-user"></i>
                     </el-input>
                   </el-form-item>
                   <el-form-item prop="password">
                     <el-input
                         show-password
                         v-model="regForm.password"
                         placeholder="密码"
                         clearable
                         autofocus
                         class="input">
                       <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                     </el-input>
                   </el-form-item>
                   <el-form-item prop="name">
                     <el-input
                         v-model="regForm.name"
                         placeholder="姓名"
                         clearable
                         autofocus
                         class="input">
                       <i slot="prefix" class="el-input__icon el-icon-tickets"></i>
                     </el-input>
                   </el-form-item>
                   <el-form-item prop="tel">
                     <el-input
                         v-model="regForm.tel"
                         placeholder="电话"
                         clearable
                         autofocus
                         class="input">
                       <i slot="prefix" class="el-input__icon el-icon-phone-outline"></i>
                     </el-input>
                   </el-form-item>
               </el-form>
               <el-button type="primary" @click="zhuCe('regForm')" class="elBtn">注册</el-button>
             </div>
        </div>
    </div>
</template>
<script>
  export default {
    name: "Login",
    data:function(){
      return {
          //登录
          loginForm:{
            userName:'',
            password:''
          },
          //注册
          regForm:{
            userName:'',
            password:'',
            name:'',
            tel:''
          },
          //验证
          rules:{
            userName: [
              { required: true, message: '用户名不能为空', trigger:'blur' },
              { min: 2, max: 25, message: '长度在 2 到 25 个字符', trigger: 'blur'}
            ],
            password:[
              { required: true, message: '密码不能为空', trigger: 'blur' },
              { min: 2, max: 25, message: '长度在 2 到 25 个字符', trigger: 'blur' }
            ],
            name:[
              { min: 2, max: 25, message: '长度在 2 到 25 个字符', trigger: 'blur' }
            ],
            tel:[
              { min: 11, max: 11, message: '长度为11个字符', trigger: 'blur' }
            ],
          },
          //登录与注册切换
          log:'log',
          regs:''
      }
    },
    methods:{
      dengLu(formLogin){
        let that = this;
        this.$refs[formLogin].validate((valid) => {
          if (valid) {
            that.$axios({
              url:"http://140.143.46.122:30001/user/login",
              method:"post",
              headers:{'content-type':'application/json'},//x-www-form-urlencoded
              data:{
                yongHuZhangHao:that.loginForm.userName,
                miMa:that.loginForm.password,
              }
            }).then(res=>{
              console.log(res.data.token);
              if(res.data.code==200){
                that.$message({
                  message: '登录成功',
                  type: 'success',
                  duration:1000
                });
                that.$store.dispatch('setLoginState',true);
                that.$store.dispatch('setLoginInfo',this.userName);
                let userInfo = {
                  logined:true,
                  userName:that.loginForm.userName
                }
                sessionStorage.setItem('loginInfo',JSON.stringify(userInfo));
                that.$router.push('/home');
              }else {
                that.$message({
                  message: res.data.msg,
                  type: 'error',
                  duration:1000
                });
              }
            }).catch(err=>{
              console.log(err);
              that.$message({
                message: '登录失败',
                type: 'error',
                duration:1000
              });
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      zhuCe(formReg){
          let that=this;
          this.$refs[formReg].validate((valid) => {
            if (valid) {
               if(that.regForm.name!=''||that.regForm.tel!=''){
                  var name=that.regForm.name;
                  var tel=that.regForm.tel;
               }
               that.$axios({
                   url:"http://140.143.46.122:30001/user/reg",
                   method:'post',
                   headers:{"Content-Type":"application/json"},
                   data:{
                      yongHuZhangHao:that.regForm.userName,
                      miMa:that.regForm.password,
                      xingMing:name,
                      lianXiFangShi:tel
                   }
               }).then(res=>{
                  console.log(res,'注册成功');
                 that.$message({
                   message:res.data.msg,
                   type: 'success',
                   duration:2000
                 });
                 this.log='log';
                 this.regs='';
               }).catch(err=>{
                  console.log(err,'注册失败');
                 that.$message({
                   message: '注册失败',
                   type: 'error',
                   duration:2000
                 });
               })
            } else {
              console.log('error reg!!');
              return false;
            }
          });
      },
      //登录与注册切换
      changeReg(){
           this.log='';
           this.regs='reg';
      }
    }
  }
</script>

<style scoped>
.bg{
  height: 100%;
  background-image: url('../assets/bg.png');
  padding: 20px;
}
.bg,#left{
  display: flex;
  align-items: center;
  justify-content: center
}
#left{
  width: 431px;
  height: 557px;
  background-image: url('../assets/bgLeft.png');
}
#left span{
  font-size: 30px;
  color: white;
}
#right{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 535px;
  height: 557px;
  background-image: url('../assets/bgRight.png');
}
#right .title{
  font-size: 24px;
  font-weight: 700;
  margin: -30px 0 50px 0;
}
.right1,.right2{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

}
.right1{
  height: 500px;
  position: relative;
}
.right1>section{
   display: flex;
}
/*注册*/
.newZhuCe{
  position: absolute;
  /*border:1px solid red;*/
  align-self: flex-end;
  bottom: 0;
}
.newZhuCe span:nth-child(1){
  color:darkgrey;
  /*color:darkgrey;
  align-self: flex-end;
  padding-right:10px ;
  cursor: pointer;*/
}
.newZhuCe span:nth-child(2){
  cursor: pointer;
  color:rgb(64,158,255);
  /*font-weight: 500;
  font-size: 18px;*/
}
.right1>section>span{

}
.el-input__icon{
  width: 50px;
  height: 50px;
  line-height: 58px;
  font-size: 24px;
  color:rgb(64,158,255);
}
button{
  width: 220px;
  height: 50px;
  font-size: 20px;
}
</style>