<template>
  <div>
    <el-pagination
        background
        layout="prev, pager, next"
        :total="totalPage"
        id="fenye"
        @current-change="currentChange">
    </el-pagination>
  </div>
</template>

<script>

export default {
  name: "Mypagination",
  data:function(){
    return {
      totalPage:1
    }
  },
  props:['totalPageNum'],
  methods:{
    currentChange(val){
      this.$axios({
        url:"/huiYi/chaXunAll",
        method:"post",
        params:{
          page:val
        }
      }).then((res)=>{
        this.$emit("getTableData",res.data.data)

      }).catch((err)=>{
        console.log(err)
      })
    }
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
      that.totalPage=res.data.count
    }).catch((err)=>{
      console.log(err)
    })
  },
  watch:{
    totalPageNum(news){
      this.totalPage=news;
    }
  },


}
</script>

<style scoped>
#fenye {
  margin-top: 5px;
  text-align: center;
}
</style>