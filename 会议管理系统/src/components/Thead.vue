<template>
  <div>
    <div class="thead">
      <div class="meeting-reserve-head">
        <div class="block">
          <span class="demonstration">日期</span>
          <el-date-picker
              @focus="alertShow"
              @change="getDate"
              id="beginTime"
              v-model="value1"
              type="date"
              placeholder="选择日期">
          </el-date-picker>
        </div>
        <div class="meeting-style">
          <el-button class="today" @click="todayTime" plain type="primary">今天</el-button>
          <el-button-group>
            <el-button @click="reduce" icon="el-icon-arrow-left"></el-button>
            <el-button @click="add()" icon="el-icon-arrow-right"></el-button>
          </el-button-group>
        </div>
      </div>
<!--      新建会议-->
      <div>
        <!--      <el-button-group>
                <el-button>日</el-button>
                <el-button>周</el-button>
                <el-button>月</el-button>
              </el-button-group>-->
        <el-button type="primary"  @click="demo3">新建会议</el-button>

        <el-dialog title="新建会议" :visible.sync="dialogFormVisible" destroy-on-close>
          <el-form :model="form" :rules="rules" ref="form" >
            <el-form-item label="会议名称" :label-width="formLabelWidth" prop="name">
              <el-input v-model="form.name" autocomplete="off" placeholder="请填写会议名称"></el-input>
            </el-form-item>
            <el-form-item label="滚动字幕" :label-width="formLabelWidth" prop="text">
              <el-input v-model="form.text" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="参与人员" :label-width="formLabelWidth" prop="people">
              <el-input v-model="form.people" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="会议室" :label-width="formLabelWidth" prop="region">
              <el-input v-model="form.region" autocomplete="off" disabled placeholder="请选择机构会议室后再新建会议"></el-input>
            </el-form-item>
            <el-form-item label="时间范围" :label-width="formLabelWidth">
              <el-date-picker
                  v-model="value2"
                  type="datetimerange"
                  :picker-options="pickerOptions"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  align="right">
              </el-date-picker>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <!--          <el-button @click="dialogFormVisible = false">取 消</el-button>
                      <el-button type="primary" @click="onsubmit;outerVisible = false">确 定</el-button>-->
            <el-button @click="cancel('form')">取 消</el-button>
            <el-button type="primary"  @click="onSubmit('form')">确 认</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
    <!--      以下是表格-->
<!--    这是demo表格-->
    <el-table
        v-if="!isShow"
        :data="tableData"
        border
        style="width: 100%" height="250px">
      <el-table-column
          prop="name"
          label=""
          width="180">
      </el-table-column>
      <el-table-column
          prop=""
          label="08:00">
        <div v-if="tbListData[0]!=''" class="tbColor">{{tbListData[0]}}</div>
      </el-table-column>
      <el-table-column
          prop=""
          label="09:00">
        <div v-if="tbListData[1]!=''" class="tbColor">{{tbListData[1]}}</div>
      </el-table-column>
      <el-table-column
          prop=""
          label="10:00">
        <div v-if="tbListData[2]!=''" class="tbColor">{{tbListData[2]}}</div>
      </el-table-column>
      <el-table-column
          prop=""
          label="11:00">
        <div v-if="tbListData[3]!=''" class="tbColor">{{tbListData[3]}}</div>
      </el-table-column>
      <el-table-column
          prop=""
          label="12:00">
        <div v-if="tbListData[4]!=''" class="tbColor">{{tbListData[4]}}</div>
      </el-table-column>
      <el-table-column
          prop=""
          label="13:00">
        <div v-if="tbListData[5]!=''" class="tbColor">{{tbListData[5]}}</div>
      </el-table-column>
      <el-table-column
          prop=""
          label="14:00">
        <div v-if="tbListData[6]!=''" class="tbColor">{{tbListData[6]}}</div>
      </el-table-column>
      <el-table-column
          prop=""
          label="15:00">
        <div v-if="tbListData[7]!=''" class="tbColor">{{tbListData[7]}}</div>
      </el-table-column>
      <el-table-column
          prop=""
          label="16:00">
        <div v-if="tbListData[8]!=''" class="tbColor">{{tbListData[8]}}</div>
      </el-table-column>
      <el-table-column
          prop=""
          label="17:00">
        <div v-if="tbListData[9]!=''" class="tbColor">{{tbListData[9]}}</div>
      </el-table-column>
      <el-table-column
          prop=""
          label="18:00">
        <div v-if="tbListData[10]!=''" class="tbColor">{{tbListData[10]}}</div>
      </el-table-column>
    </el-table>
<!--    这是真正传值表格-->
    <el-scrollbar>
      <el-table
          v-if="isShow"
          :data="tableData"
          border
          style="width: 100%" height="250px">
        <el-table-column
            v-if="isShow"
            prop="name"
            label=""
            width="180">
        </el-table-column>
        <el-table-column
            prop=""
            label="08:00">
          <div v-if="tbListData[0]!=''" class="tbColor">{{tbListData[0]}}</div>
        </el-table-column>
        <el-table-column
            prop=""
            label="09:00">
          <div v-if="tbListData[1]!=''" class="tbColor">{{tbListData[1]}}</div>
        </el-table-column>
        <el-table-column
            prop=""
            label="10:00">
          <div v-if="tbListData[2]!=''" class="tbColor">{{tbListData[2]}}</div>
        </el-table-column>
        <el-table-column
            prop=""
            label="11:00">
          <div v-if="tbListData[3]!=''" class="tbColor">{{tbListData[3]}}</div>
        </el-table-column>
        <el-table-column
            prop=""
            label="12:00">
          <div v-if="tbListData[4]!=''" class="tbColor">{{tbListData[4]}}</div>
        </el-table-column>
        <el-table-column
            prop=""
            label="13:00">
          <div v-if="tbListData[5]!=''" class="tbColor">{{tbListData[5]}}</div>
        </el-table-column>
        <el-table-column
            prop=""
            label="14:00">
          <div v-if="tbListData[6]!=''" class="tbColor">{{tbListData[6]}}</div>
        </el-table-column>
        <el-table-column
            prop=""
            label="15:00">
          <div v-if="tbListData[7]!=''" class="tbColor">{{tbListData[7]}}</div>
        </el-table-column>
        <el-table-column
            prop=""
            label="16:00">
          <div v-if="tbListData[8]!=''" class="tbColor">{{tbListData[8]}}</div>
        </el-table-column>
        <el-table-column
            prop=""
            label="17:00">
          <div v-if="tbListData[9]!=''" class="tbColor">{{tbListData[9]}}</div>
        </el-table-column>
        <el-table-column
            prop=""
            label="18:00">
          <div v-if="tbListData[10]!=''" class="tbColor">{{tbListData[10]}}</div>
        </el-table-column>
      </el-table>
    </el-scrollbar>

  </div>
</template>

<script>
import Bus from "@/bus/bus.js";

/*转换时间---------------------------------------------------------------------------------------------------------------*/
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
/*转换时间---------------------------------------------------------------------------------------------------------------*/

export default {
  name: "Thead",
  data() {
    return {
      //table的数据----------------------------------------
      nameArr1:[],
      tableData: [{
        name: '会议名称',
      }],
      tbListData:["","","","","","","","","","",""],
      //table的数据---------------------------------------------
      exampleData:[
        '08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'
      ],
      meetingData:[],
      mingCheng:'',
      huiYiShiId:'',
      nameArr:[],
      value1: '',
      isShow:false,
      //模态框--------------------
      dialogFormVisible: false,
      form: {
        name: '',
        text:'',
        people:'',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
    //  模态框数据结束----------------------------
    //  日期时间选择器---------------------------
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      value2: '',
    //  日期时间选择器结束-----------------------------------------------------------------------------------------
/*表单验证-----------判断用户是否填写数据---------------------------------------------------------------------------*/
      rules: {
        name: [
          { required: true, message: '请输入会议名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        text: [
          { required: true, message: '请填写滚动字幕', trigger: 'change' }
        ],
        people: [
          { required: true, message: '请填写参与人员', trigger: 'change' }
        ],
        region: [
          { required: true, message: '请选择机构会议室后再新建会议', trigger: 'change' }
        ]
      }
/*表单验证-----------判断用户是否填写数据---------------------------------------------------------------------------*/
    };
  },
  methods:{
    todayTime(){
      let today = new Date();
      console.log(today);
      let year = today.getFullYear();
      let month = today.getMonth()+1;
      let day = today.getDate();
      console.log(year+'-'+month+'-'+day);
      console.log(this.value1);
      this.value1 = year+'-'+month+'-'+day;
    },
    add(){
      /*获取value1中的时间-----------------------------------------------*/
      var date1 = new Date(this.value1);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var year = date1.getFullYear();
      var mouth = date1.getMonth()+1;
      var date = date1.getDate();
      console.log(year+'-'+mouth+'-'+date);
      /*获取value1中的时间结束-----------------------------------------------*/

      if(date == 28){//当日期为28号时 只判断是否是2月
        switch(mouth)
        {
          case 2:
            if(year % 4 == 0 && year % 100 !=0 || year%400 ==0){
              date = date +1;
              break;
              //如果是闰年2月 日期就加一
            } else{
              date = 1;
              mouth = mouth +1;
              break;
              //不是闰年2月 日期就变为1 月份加一
            }
          default:
            date = date +1;
            break;
            //其他月份默认日期加一
        }

      }else if(date == 29){ //当日期为29号是 也是判断是否是2月
        switch(mouth)
        {
          case 2:
            date = 1;
            mouth = mouth +1;
            break;
          default:
            date = date +1;
            break;
        } //当29号出现必定是闰年 日期变为1 月份加一 其他月份默认日期加一

      }else if(date == 30){ //当日期为30 时
        switch(mouth)
        {
          case 1:
          case 3:
          case 5:
          case 7:
          case 8:
          case 10:
          case 12:
            date = date +1;
            break; //这些月份的时候一个月有31天 到30的时候再加一
          case 4:
          case 6:
          case 9:
          case 11:
            date = 1;
            mouth = mouth +1;
            break; //这些月份的时候一个月有30天 到30的时候 日期变为1 月份加一

        }
      }else if(date == 31){

        switch(mouth)
        {
          case 1:
          case 3:
          case 5:
          case 7:
          case 8:
          case 10:
            date = 1;
            mouth = mouth+1;
            break; //这些月份的时候一个月有31天 到31的时候  日期为1月份加一
          case 12:
            date = 1;
            mouth = 1;
            year = year+1;
            break;  //十二月 的 31 号 日期变为一 月份变为一 年份加一

        }
      }else{
        date +=1;
      }

      this.value1 = year+"-"+mouth+"-"+date;

    },
    reduce(){
      /*获取value1中的时间-----------------------------------------------*/
      var date1 = new Date(this.value1);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var year = date1.getFullYear();
      var mouth = date1.getMonth()+1;
      var date = date1.getDate();
      console.log(year+'-'+mouth+'-'+date);
      /*获取value1中的时间结束-----------------------------------------------*/

      if(date == 1){//当日期为1时，再剪就会改变月份，甚至年份
        switch(mouth){
          case 1:
            date = 31;
            mouth = 12;
            year = year-1;
            break;  //一月一日 再剪一天 年份减一 月份为12 日期为31
          case 2:
          case 4:
          case 6:
          case 8:
          case 9:
          case 11:
            date = 31;
            mouth = mouth-1;
            break; //这些月一日 再剪一天  月份减一 日期为31
          case 3:
            if(year % 4 == 0 && year % 100 !=0 || year%400 ==0){
              date = 29;
              mouth = mouth -1;
            }else {
              date = 28;
              mouth = mouth -1;
            }
            break; //三月一日 再剪一天  月份减一 日期为根据是否是闰年来判断 日期
          case 5:
          case 7:
          case 10:
            date = 30;
            mouth = mouth -1;
            break; //这些月一日 再剪一天  月份减一 日期为30
        }
      }else{
        date = date-1;
      }
      this.value1 = year+"-"+mouth+"-"+date;
    },
    demo3(){
      this.dialogFormVisible = true;
      Bus.$on("meetingName", data => {
        console.log("A组件传给B组件的", data);
        console.log("this.form.region", this.form.region);
        this.form.region=data;
      });
    },
  //  新增会议确认按钮
    onSubmit(formName){
      /*转换时间----------------*/
      let startTime = new Date(this.value2[0]).format("yyyy-MM-dd hh:mm:ss");
      // let endTime=this.meetingEnding;
      let endTime = new Date(this.value2[1]).format("yyyy-MM-dd hh:mm:ss");
      /*转换时间----------------*/

      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.value2 == ''){
            this.$message({
              showClose: true,
              message: '请选择时间日期!',
              type: 'warning',
              duration:5000
            });
          }else {
            this.$axios({
              method:'post',
              url:"/huiYi/xinZeng",
              headers:{"Content-Type":"application/json"},
              data:{
                huiYiMingCheng:this.form.name,
                gunDongZiMu:this.form.text,
                kaiShiShiJian: startTime,
                jieShuShiJian: endTime,
                canYuRenYuan:this.form.people,
                chuangJianShiJian:new Date().format("yyyy-MM-dd hh:mm:ss"),
                huiYiShiId:this.huiYiShiId,
                yongHuId:1,
                huiYiShi:{
                  mingCheng:this.nameArr[0]+this.nameArr[1]+this.nameArr[2]
                }
              }
            }).then((res)=>{
              console.log("+++++++++++");
              console.log(res.data);
              this.$message({
                showClose: true,
                message: res.data.msg,
                type: 'success',
                duration:1000
              });
            }).catch((err)=>{
              console.log(err);
            });
            //清空表单内数据-----------------------------
            this.$refs[formName].resetFields();
            this.value2='';
            this.form.region='';
            //清空表单内数据-------------------
            this.dialogFormVisible = false;
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  //  取消新增会议室按钮
    cancel(formName){//清空表单内数据-----------------------------
      this.$refs[formName].resetFields();
      this.value2='';
      this.form.region='';
      this.dialogFormVisible = false;
    },
  //  获取用户选择的日期，用于查看列表
    getDate(){
      if(this.form.region==''||this.mingCheng==''){
        this.$message({
          showClose: true,
          message: '请确认已选择机构名称与会议室名称',
          type: 'warning',
          duration:5000
        });
      }else {
        this.isShow=false;
        let that = this;
        /*转换时间----------------*/
        let timeStart = new Date(this.value1).format("yyyy-MM-dd hh:mm:ss");
        let timeEnd = new Date(this.value1).format("yyyy-MM-dd 23:59:59");
        /*转换时间----------------*/
        // console.log(msg);
        this.$axios({
          method:'post',
          url:"huiYi/chaXunAll",
          headers:{"Content-Type":"application/json"},
          params:{
            kaiShiShiJian: timeStart,
            jieShuShiJian: timeEnd,
            mingCheng:this.mingCheng,
            page:1
          }
        }).then((res)=>{
          // console.log("+++++++++++");
          // console.log(res.data.data);
          that.tbListData=["","","","","","","","","","",""];
          that.meetingData = res.data.data;
          //  获取table页面需要渲染数据的下标---------------------------------------------------------------------------------
          // console.log(this.meetingData)
          var endTimeArr = [],startTimeArr = [],compareArr =[],startIndex =[],endIndex =[];
          that.meetingData.forEach((v,i) =>{
            console.log(v)
            endTimeArr[i] = Date.parse(new Date(v.jieShuShiJian).format("yyyy-MM-dd hh:mm"));//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            startTimeArr[i] = Date.parse(new Date(v.kaiShiShiJian).format("yyyy-MM-dd hh:mm"));
            this.exampleData.forEach((item,index) =>{
              compareArr[index] = Date.parse(new Date(v.kaiShiShiJian).format("yyyy-MM-dd"+" "+item));
            })
          })
          for(var j=0;j<startTimeArr.length;j++){
            for (var i=0;i<compareArr.length;i++){
              if(startTimeArr[j]==compareArr[i]){
                startIndex.push(i);
                break;
              }else if(startTimeArr[j]<compareArr[i]){
                startIndex.push(i-1);
                break;
              }
            }
          }
          for(var u=0;u<endTimeArr.length;u++){
            for (var p=0;p<compareArr.length;p++){
              if((endTimeArr[u]==compareArr[p]) || (endTimeArr[u]<compareArr[p])){
                endIndex.push(p);
                break;
              }
            }
          }
          console.log(startIndex);
          //渲染页面 ---‘已满’---------------------------------------------------
          startIndex.map((v)=>{
            that.tbListData.splice(v,1,"已满");
          });
          endIndex.forEach((v)=>{
            that.tbListData.splice(v,1,"已满");
          })
          this.tbListData.forEach((v,i)=>{
            for(let j=0;j<startIndex.length;j++){
              if((i>startIndex[j]) && (i<endIndex[j])){
                that.tbListData.splice(i,1,"已满");
              }
            }
          })
          //渲染页面 ---‘已满’---------------------------------------------------
          console.log(that.tbListData)
          that.isShow=true;
          /*Bus.$emit('getStartIndex',startIndex);
          Bus.$emit('getEndIndex',endIndex);*/
//  获取table页面需要渲染数据的下标---------------------------------------------------------------------------------
        }).catch((err)=>{
          console.log(err);
        });
      }
    },
    alertShow(){
      if(this.form.region==''||this.mingCheng==''){
        this.$message({
          showClose: true,
          message: '请确认已选择机构名称与会议室名称',
          type: 'warning',
          duration:5000
        });
      }
    },
  },
  created() {
    Bus.$on("jigouValue", data => {
      /*console.log("A组件传给B组件的", data);
      console.log("this.tableData.name", this.tableData);*/
      this.form.region=data;
      this.nameArr1=data;
    });
    Bus.$on("meetingValue", data2 => {
      // console.log("A组件传给B组件的2", data2);
      this.form.region+=data2;
      this.nameArr = this.form.region.split(",");
      this.mingCheng = data2;
      //table-----------------------------------
      let str='';
      for (let i=0;i<this.nameArr1.length;i++){
        str+=this.nameArr1[i]+'/'
      }
      this.tableData[0].name=str+data2;
      //table-----------------------------------
    });
    Bus.$on("meetingId", data3 => {
      console.log("A组件传给B组件的2", data3);
      this.huiYiShiId = data3;
    });
  },
  mounted() {
    console.log(this.tbListData);
  }
}
</script>

<style scoped>
  .check-time{
    /*margin-left: 500px;*/
  }
  .today{
    margin-right: 15px;
  }
  .thead{
    padding-bottom: 30px;
    display: flex;
    justify-content: space-between;
  }
  .tbColor{
    background: #F0F8FF;
    width: 80px;
    height: 100px;
    text-align: center;
    margin: auto;
    line-height: 100px;
    color: lightskyblue;
  }
  .demonstration{
    display: inline-block;
    padding-right: 10px;
  }
  .meeting-reserve-head{
    display: flex;
    justify-content: flex-start;
  }
  .meeting-style{
    margin-left: 25px;
  }
</style>