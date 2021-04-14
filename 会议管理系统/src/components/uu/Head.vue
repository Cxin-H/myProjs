<template>
  <div class="meeting-reserve-head">
    <div class="block">
      <span class="demonstration">机构</span>
      <el-cascader
          v-model="msg"
          @change="demo"
          placeholder="试试搜索：指南"
          :options="options"
          filterable
          clearable></el-cascader>
    </div>
    <div class="block meeting-style">
      <span class="demonstration">会议室</span>
      <el-cascader
          @focus="alertShow"
          v-model="msg2"
          @change="demo2"
          placeholder="试试搜索：指南"
          :options="options2"
          filterable
          clearable></el-cascader>
    </div>
  </div>
</template>

<script>
import Bus from "@/bus/bus.js";

export default {
  name: "Head",
  data() {
    return {
      isShow:false,
      tableData:[],
      msg:'',
      msg2:'',
      jiGouArr:[],
      jiGouIdArr:[],
      arr:[],
      idarr:[],
      options2Arr:[],
      options: [{
        value: '第一级',
        label: '海银金控',
        children: [{
          id:'',
          value: '第二级',
          label: '',
          children: [{
            value: '',
            label: '',
            id:''
          }, {
            value: '',
            label: '',
            id:''
          }, {
            value: '',
            label: '',
            id:''
          }, {
            value: '',
            label: '',
            id:''
          }, {
            value: '',
            label: '',
            id:''
          },{
            value: '',
            label: '',
            id:''
          }, {
            value: '',
            label: '',
            id:''
          }, {
            value: '',
            label: '',
            id:''
          }, {
            value: '',
            label: '',
            id:''
          }, {
            value: '',
            label: '',
            id:''
          }, {
            value: '',
            label: '',
            id:''
          }, {
            value: '',
            label: '',
            id:''
          }, {
            value: '',
            label: '',
            id:''
          }
          ]
        },
          {
            id:'',
            value: '第二级',
            label: '',
            children: [{
              value: '',
              label: '',
              id:''
            }, {
              value: '',
              label: '',
              id:''
            }, {
              value: '',
              label: '',
              id:''
            }, {
              value: '',
              label: '',
              id:''
            }, {
              value: '',
              label: '',
              id:''
            },{
              value: '',
              label: '',
              id:''
            }, {
              value: '',
              label: '',
              id:''
            }, {
              value: '',
              label: '',
              id:''
            }, {
              value: '',
              label: '',
              id:''
            }, {
              value: '',
              label: '',
              id:''
            }, {
              value: '',
              label: '',
              id:''
            }, {
              value: '',
              label: '',
              id:''
            }, {
              value: '',
              label: '',
              id:''
            }
            ]
          },
          {
            id:'',
            value: '第二级',
            label: '',
            children: [{
              value: '',
              label: '',
              id:''
            }, {
              value: '',
              label: '',
              id:''
            }, {
              value: '',
              label: '',
              id:''
            }, {
              value: '',
              label: '',
              id:''
            }, {
              value: '',
              label: '',
              id:''
            },{
              value: '',
              label: '',
              id:''
            }, {
              value: '',
              label: '',
              id:''
            }, {
              value: '',
              label: '',
              id:''
            }, {
              value: '',
              label: '',
              id:''
            }, {
              value: '',
              label: '',
              id:''
            }, {
              value: '',
              label: '',
              id:''
            }, {
              value: '',
              label: '',
              id:''
            }, {
              value: '',
              label: '',
              id:''
            }
            ]
          }
        ]
      }],
      options2:[
        {
          id:'',
          value: '',
          label: ''
        },
        {
          id:'',
          value: '',
          label: ''
        }
      ],
      value: ''
    }
  },
  methods:{
    //选择机构时发生的改变，同时请求会议室数据
    demo(){
      console.log(this.msg);
      //把机构选框的内容传给Table组件------------------------------------
      Bus.$emit("jigouValue",this.msg);
      //把机构选框的内容传给Table组件结束------------------------------------
      //根据 比对value的值与获取到的数据公司名称是否相同，相同的话，提取它的id-----------------------------------------------
      let jiGouZiId;
      console.log('this.tableData',this.tableData);
      for (let p=0;p<this.tableData.length;p++){
        if (this.msg[2] == this.tableData[p].mingCheng){
          console.log('this.tableData[p].id',this.tableData[p].id);
          jiGouZiId=this.tableData[p].id
        }
      }
      //会议室的数据
      //根据 比对value的值与获取到的数据公司名称是否相同，相同的话，提取它的id结束-----------------------------------------------
      this.$axios({
        url:'/huiYiShi/chaXunFenYe',
        params: {
          jiGouZiId:jiGouZiId
        }
      }).then((res)=>{
        console.log("----------------------");
        console.log(res.data);
        this.options2Arr = res.data.list;
        //  给页面赋予数据
        let arr1 = [],arr2 = [];
        this.options2Arr.forEach((v)=>{
          console.log(v.id);
          arr1.push(v.mingCheng);
          arr2.push(v.id);
          // arr2.push(v.id);
          this.options2.forEach((item,index)=>{
            console.log(item);
            item.label = arr1[index];
            item.value = arr1[index];
            item.id = arr2[index];
          })
        })
      }).catch((err)=>{
        console.log(err);
      })
    },
    demo2(){
      //把会议室选框的内容传给Table组件------------------------------------
      Bus.$emit("meetingValue",this.msg2[0]);
      //把会议室选框的内容传给Table组件结束------------------------------------

      //找到选择的会议室的id----------------
      for (let f=0;f<this.options2.length;f++){
        if (this.options2[f].value == this.msg2[0]){ //如果值相等，提取它的id传给Thead组件
          Bus.$emit("meetingId",this.options2[f].id);
        }
      }
      console.log('this.options2',this.options2);
      /*console.log('this.options2Arr.length',this.options2Arr);*/
      /*//根据有多少数据增加页面单元格--------------
      for (let m=0;m<this.options2Arr.length;m++){
        this.options2.push({
          value: '',
          label: ''
        })
      }*/
    },
    alertShow(){
      if(this.msg==''){
        this.$message({
          showClose: true,
          message: '请先选择机构名称',
          type: 'warning',
          duration:5000
        });
      }
    },
    quchong(jiGouArr){
      for(var i=0;i<=jiGouArr.length-2;i++){
        for(var j=1+i;j<=jiGouArr.length-1;j++){
          if(jiGouArr[i]===jiGouArr[j]){
            jiGouArr.splice(j,1);
            j--;
          }
        }
      }
      return jiGouArr;
    }
  },
  mounted(){
    this.$axios({
      url:'/jiGouZi/chaXunAll',
      type:'get'
    }).then((res)=>{
      // console.log(res.data.list);
      this.tableData=res.data.list;
      this.tableData.forEach( (item) => {
        // console.log('后端数据',item);
        this.arr.push(item.mingCheng);
        this.idarr.push(item.id);
        this.jiGouIdArr.push(item.jiGou.id);
        this.jiGouArr.push(item.jiGou.jiGouMing);
        // console.log(this.idarr);
        //页面第一级数据----------------------------------
        this.options.forEach((v) =>{

          v.label = "海银金控";
          v.value = "海银金控";
          // console.log(v.label);
          //页面第二级数据--------------------------------
          v.children.forEach((x,y) =>{
            // console.log('xxxxxxxxx',x.label);
            // 数组去重
            this.jiGouArr = this.quchong(this.jiGouArr);
            this.jiGouIdArr = this.quchong(this.jiGouIdArr);
            // console.log('this.jiGouArr',this.jiGouArr);
            //去重后赋值
            x.label = this.jiGouArr[y];
            x.value = this.jiGouArr[y];
            x.id = this.jiGouIdArr[y];
            let that=this;
            //页面第三级数据--------------------------------
              x.children.forEach((m,n) =>{
                // console.log('333',m);
                //选择框获取的值是 value
                m.id = that.idarr[n];
              })
          })
        })
      });
      //  根据二级数据与三级数据的id是否相匹配，给第三级label赋值
      console.log(this.tableData);
      let opArr=[],seArr=[],thArr=[];
      for(let i=0;i<this.tableData.length;i++){
        if (this.tableData[i].jiGou.id===1) {
          // console.log(this.options[0])
          //将符合条件的数据存在一个数组里
          opArr.push(this.tableData[i].mingCheng);
          // console.log(opArr)
          for(let k=0;k<opArr.length;k++){
            this.options[0].children[0].children[k].label = opArr[k];
            this.options[0].children[0].children[k].value = opArr[k];
          }
        }
        if (this.tableData[i].jiGou.id===2) {
          // console.log(this.tableData[i].mingCheng);
          seArr.push(this.tableData[i].mingCheng);
          for(let k=0;k<seArr.length;k++){
            this.options[0].children[1].children[k].label = seArr[k];
            this.options[0].children[1].children[k].value = seArr[k];
          }
        }
        if (this.tableData[i].jiGou.id===3) {
          // console.log(this.tableData[i].mingCheng)
          thArr.push(this.tableData[i].mingCheng);
          for(let k=0;k<thArr.length;k++){
            this.options[0].children[2].children[k].label = thArr[k];
            this.options[0].children[2].children[k].value = thArr[k];
          }
        }
      }
      console.log('----------options',this.options);
    }).catch((err)=>{
      console.log(err);
    })
  }
}
</script>

<style scoped>
  .meeting-reserve-head{
    display: flex;
    justify-content: flex-start;
  }
  .demonstration{
    display: inline-block;
    padding-right: 10px;
  }
  .meeting-style{
    margin-left: 25px;
  }
</style>