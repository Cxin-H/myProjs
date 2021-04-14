<template>
  <el-container>
    <el-container>
      <el-main>
        <div class="home">
          <Head class="head"></Head>
          <Thead></Thead>
          <!--    分页-->
          <!--    <Mypagination @getTableData="getTableData" class="margin"></Mypagination>-->
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src
import Head from '@/components/Head.vue';
import Thead from "@/components/Thead";


export default {
  name: 'Home',
  data:function (){
    return{

    }
    // tableData:[]
  },
  components: {
    Head,Thead
  },
  prop:[],
  methods:{
    /*getTableData(msg){
      this.tableData=msg;
    }*/
  }
}
</script>

<style scoped>
.head{
  padding-bottom: 15px;
}
.margin{
  margin-top: 20px;
}
.el-main {
  background-color: #E9EEF3;
  color: dimgray;
  padding-top: 0;
  height: 100%;

}
.home{
  height: 800px;
  margin-top: 20px;
}
</style>
