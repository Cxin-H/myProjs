<template>
  <div>
      <div class="header">
         <div class="search">
            <section>
              <el-form :inline="true" :model="formInline" class="demo-form-inline">

                    <el-form-item label="会议室名称">
                      <el-input v-model="formInline.room"></el-input>
                    </el-form-item>

                    <el-form-item label="配置">
                      <el-select v-model="formInline.config" placeholder="请选择会议室配置">
                        <el-option label="座谈会议" value="座谈会议"></el-option>
                        <el-option label="视频会议" value="视频会议"></el-option>
                        <el-option label="电话会议" value="电话会议"></el-option>
                        <el-option label="网络会议" value="网络会议"></el-option>
                      </el-select>
                    </el-form-item>


                    <el-form-item label="终端类型">
                      <el-select v-model="formInline.type" placeholder="请选择终端类型">
                        <el-option label="个人电脑" value="个人电脑"></el-option>
                        <el-option label="投影仪" value="投影仪"></el-option>
                        <el-option label="摄像机" value="摄像机"></el-option>
                        <el-option label="麦克风" value="麦克风"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="success" @click="onSearch" icon="el-icon-search">查询</el-button>
                      <el-button type="primary" @click="openAddModel" icon="el-icon-circle-plus-outline">添加</el-button>
                      <el-button  type="danger" @click="onDel" icon="el-icon-delete">删除</el-button>
                      <el-button type="primary" @click="openChangeModel" icon="el-icon-edit">修改</el-button>
                    </el-form-item>
              </el-form>
            </section>
            <!--添加的模态框-->
            <el-dialog :model="form" title="添加信息" :visible.sync="addDialogFormVisible">
              <el-form>
                <el-form-item label="会议室" :label-width="formLabelWidth">
                  <el-select v-model="form.id" placeholder="请选择会议室">
                    <el-option v-for="item in allData" :label="item.mingCheng" :value="item.id" :key="item"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="配置" :label-width="formLabelWidth">
                  <el-select v-model="form.peiZhi" placeholder="请选择配置">
                    <el-option label="座谈会议" value="座谈会议"></el-option>
                    <el-option label="视频会议" value="视频会议"></el-option>
                    <el-option label="电话会议" value="电话会议"></el-option>
                    <el-option label="网络会议" value="网络会议"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="终端类型" :label-width="formLabelWidth">
                  <el-select v-model="form.leiXing" placeholder="请选择配置">
                    <el-option label="音频设备" value="音频设备"></el-option>
                    <el-option label="摄像机" value="摄像机"></el-option>
                    <el-option label="投影仪" value="投影仪"></el-option>
                    <el-option label="麦克风" value="麦克风"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="终端型号" :label-width="formLabelWidth">
                  <el-input v-model="form.xingHao" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="价格" :label-width="formLabelWidth">
                  <el-input v-model="form.jiaGe" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="数量" :label-width="formLabelWidth">
                  <el-input v-model="form.shuLiang" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="addDialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="onAdd">确 定</el-button>
              </div>
            </el-dialog>
            <!--修改的模态框-->
            <el-dialog :model="selectOne" title="修改信息" :visible.sync="changeDialogFormVisible">
              <el-form>
                <el-form-item label="会议室" :label-width="formLabelWidth">
                  <el-select v-model="selectOne.mingCheng" placeholder="请选择会议室">
                    <el-option v-for="item in allData" :label="item.mingCheng" :value="item.mingCheng" :key="item"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="配置" :label-width="formLabelWidth">
                  <el-select v-model="selectOne.peiZhi" placeholder="请选择配置">
                    <el-option label="座谈会议" value="座谈会议"></el-option>
                    <el-option label="视频会议" value="视频会议"></el-option>
                    <el-option label="电话会议" value="电话会议"></el-option>
                    <el-option label="网络会议" value="网络会议"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="终端类型" :label-width="formLabelWidth">
                  <el-select v-model="selectOne.leiXing" placeholder="请选择配置">
                    <el-option label="音频设备" value="音频设备"></el-option>
                    <el-option label="摄像机" value="摄像机"></el-option>
                    <el-option label="投影仪" value="投影仪"></el-option>
                    <el-option label="麦克风" value="麦克风"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="终端型号" :label-width="formLabelWidth">
                  <el-input v-model="selectOne.xingHao" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="价格" :label-width="formLabelWidth">
                  <el-input v-model="selectOne.jiaGe" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="数量" :label-width="formLabelWidth">
                  <el-input v-model="selectOne.shuLiang" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="changeDialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="onChange">确 定</el-button>
              </div>
            </el-dialog>
        </div>
      </div>
      <div class="body">
          <el-table :data="showData" ref="multipleTable" border  @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                width="50">
            </el-table-column>
            <el-table-column
                prop="huiYiShi.mingCheng"
                label="会议室">
            </el-table-column>
            <el-table-column
                prop="peiZhi"
                label="配置">
            </el-table-column>
            <el-table-column
                prop="leiXing"
                label="终端类型">
            </el-table-column>
            <el-table-column
                prop="xingHao"
                label="终端型号"
                width="450">
            </el-table-column>
            <el-table-column
                prop="jiaGe"
                label="价格">
            </el-table-column>
            <el-table-column
                width="50"
                prop="shuLiang"
                label="数量">
            </el-table-column>
          </el-table>
      </div>
      <!-- 分页器 -->
      <div  id="fenYe">
        <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            layout="total, prev, pager, next"
            :total="total" background >
        </el-pagination>
      </div>
  </div>
</template>
<script>
export default {
  name: "ZhongDuan",
  data() {
    return {
      formInline: {
        room: '',
        config: '',
        type: '',
        terminal:''
      },
      showData: [],
      tableData: [],
      allData:[],
      multipleSelection:[],//复选框获取的对象
      selectId:'',
      selectItem:[],
      currentPage: 1, // 当前页码
      total: 10, // 总条数
      pageSize: 10, // 每页的数据条数
      totalPage:1,
      form: {
        id:'',
        peiZhi: '',
        leiXing: '',
        xingHao: '',
        jiaGe: '',
        shuLiang: '',
      },
      selectOne:{
        id:'',
        huiYiShiId:'',
        mingCheng:'',
        peiZhi: '',
        leiXing: '',
        xingHao: '',
        jiaGe: '',
        shuLiang: '',
      },
      addDialogFormVisible: false,
      changeDialogFormVisible: false,
      formLabelWidth: '120px',
      choiceId:''
    }
  },
  methods: {
    //复选框按钮点击获取其id
    handleSelectionChange(val) {
      this.multipleSelection = [];
      for(let i=0;i<val.length;i++){
        this.multipleSelection=this.multipleSelection.concat(val[i].id);
      }
      this.selectId=this.multipleSelection.toString();
      // console.log(this.selectId);
      // this.checkAll=true;
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
    //查询按钮
    onSearch(){
      this.$axios({
        method:'get',
        url:'/zhongDuan/chaXunFenYe',
        params:{
          page:1,
          hysMingCheng:this.formInline.room,
          leiXing:this.formInline.type,
          peiZhi:this.formInline.config
        }
      }).then((res) => {
        // console.log(res.data.data)
        this.showData = this.tableData
        this.showData = res.data.data
        // console.log(this.selectId);
      }).catch(function (err){
        console.log(err)
      })
    },
    // 删除按钮
    onDel(){
      this.$axios({
        method: 'post',
        url: '/zhongDuan/shanChuById',
        headers: {"content-type": "application/json;charset=UTF-8"},  //用于post
        params: {
          id:this.selectId
        }
      }).then((res) => {
        if (res.status == 200){
          this.chengGong('删除成功')
          this.$axios({
            method: 'get',
            url: '/zhongDuan/chaXunFenYe',
            // headers: {"content-type": "application/json;charset=UTF-8"},  //用于post
            params: {page: this.currentPage}  //params
          }).then((res) => {
            // console.log(res)
            this.total = res.data.count
            this.tableData = res.data.data
            this.showData = this.tableData
            // console.log(this.showData)
          }).catch(function (err) {
            console.log(err)
          })
        }
      }).catch(function (err) {
        console.log(err)
      })
    },
    // 添加操作
    onAdd(){
      this.addDialogFormVisible = false
      this.$axios({
        method: 'post',
        url: '/zhongDuan/xinZeng',
        headers: {"content-type": "application/json;charset=UTF-8"},  //用于post
        data: {
          huiYiShiId:this.form.id,
          jiaGe:this.form.jiaGe,
          leiXing:this.form.leiXing,
          peiZhi:this.form.peiZhi,
          shuLiang:this.form.shuLiang,
          xingHao:this.form.xingHao
        }  //params
      }).then((res) => {
        if (res.status == 200){
          this.chengGong('添加成功！');
          this.$axios({
            method: 'get',
            url: '/zhongDuan/chaXunFenYe',
            // headers: {"content-type": "application/json;charset=UTF-8"},  //用于post
            params: {page: this.currentPage}  //params
          }).then((res) => {
            // console.log(res)
            this.total = res.data.count
            this.tableData = res.data.data
            this.pageCount = res.data.pageCount
            this.showData = this.tableData
            // console.log(this.showData)
          }).catch(function (err) {
            console.log(err)
          })
        }

      }).catch(function (err) {
        console.log(err)
      })
    },
    // 修改操作
    onChange(){
      var that = this;
      this.choiceId = this.allData.filter((v)=>{
        if (v.mingCheng == that.selectOne.mingCheng){
          return v.id;
        }
      })
      this.selectOne.huiYiShiId = this.choiceId[0].id;


      this.$axios({
        method: 'post',
        url: '/zhongDuan/gengXinById',
        headers: {"content-type": "application/json;charset=UTF-8"},  //用于post
        data: {
          huiYiShiId:this.selectOne.huiYiShiId,
          id:this.selectOne.id,
          jiaGe:this.selectOne.jiaGe,
          leiXing:this.selectOne.leiXing,
          peiZhi:this.selectOne.peiZhi,
          shuLiang:this.selectOne.shuLiang,
          xingHao:this.selectOne.xingHao
        }  //params
      }).then((res) => {
        if (res.status == 200){
          this.chengGong('修改成功！');
          this.changeDialogFormVisible = false;
          this.$axios({
            method: 'get',
            url: '/zhongDuan/chaXunFenYe',
            // headers: {"content-type": "application/json;charset=UTF-8"},  //用于post
            params: {page: this.currentPage}  //params
          }).then((res) => {
            // console.log(res)
            this.total = res.data.count
            this.tableData = res.data.data
            this.pageCount = res.data.pageCount
            this.showData = this.tableData
            // console.log(this.showData)
          }).catch(function (err) {
            console.log(err)
          })
        }
      }).catch(function (err) {
        console.log(err)
      })
    },
    // 打开添加操作的模态框
    openAddModel(){
      this.addDialogFormVisible = true
    },
    // 打开修改操作的模态框
    openChangeModel(){
      console.log(this.selectId)
      console.log(this.multipleSelection)
      if(this.multipleSelection.length == 1){
        this.changeDialogFormVisible = true
        var that = this;
        this.selectItem = this.showData.filter((v)=>{
            if(v.id == that.selectId){
              return v;
            }
        })
        // console.log(this.selectItem)
        this.selectOne = {
          huiYiShiId: this.selectItem[0].huiYiShiId,
          id:this.selectItem[0].id,
          mingCheng: this.selectItem[0].huiYiShi.mingCheng,
          peiZhi: this.selectItem[0].peiZhi,
          leiXing: this.selectItem[0].leiXing,
          xingHao: this.selectItem[0].xingHao,
          jiaGe: this.selectItem[0].jiaGe,
          shuLiang: this.selectItem[0].shuLiang,
        }
        // console.log(this.selectOne)
      }else if (this.multipleSelection.length == 0){
        this.shiBai('请选取要修改的条目！')
      }else{
        this.shiBai('只能选择一则条目进行修改！')
      }
    },
    // 处理点击跳页
    handleCurrentChange(currentPage){
      this.currentPage = currentPage;
      console.log(this.currentPage)
      // 获取页面数据
      this.$axios({
        method: 'get',
        url: '/zhongDuan/chaXunFenYe',
        // headers: {"content-type": "application/json;charset=UTF-8"},  //用于post
        params: {page: this.currentPage}  //params
      }).then((res) => {
        this.tableData = res.data.data
        this.showData = this.tableData
        // console.log(this.contentId)
      }).catch(function () {
        // console.log(err)
      })
    },
  },
  mounted() {
    // 获取页面数据
    this.$axios({
      method: 'get',
      url: '/zhongDuan/chaXunFenYe',
      // headers: {"content-type": "application/json;charset=UTF-8"},  //用于post
      params: {page: 1}  //params
    }).then((res) => {
      this.tableData = res.data.data
      this.showData = this.tableData
      this.total = res.data.count
    }).catch(function () {
      // console.log(err)
    })
    // 获取会议室信息来获取会议室id
    this.$axios({
      method: 'get',
      url: '/huiYiShi/chaXunAll',
      // headers: {"content-type": "application/json;charset=UTF-8"},  //用于post
      params: {}  //params
    }).then((res) => {
      this.allData = res.data.list
      // console.log(this.allData)
    }).catch(function (err) {
      console.log(err)
    })
  },

}
</script>
<style scoped>
.search{
  padding-top: 15px;
  width: 98%;
/*  height: 120px;
  background: rgb(233,238,243);
  border-radius: 3px 3px 0 0;*/
}
.search>sectiion:nth-child(1){
   display: flex;
   flex-direction: row-reverse;
}
.body{
  display: flex;
  /*justify-content: center;*/
}
.header{
  display: flex;
  justify-content: center;
}
/*
.result{
  padding-top: 20px;
  width: 98%;
  !*border: 1px skyblue solid;*!
  height: 800px;
}
.operation{
  height: 30px;
  display: flex;
  justify-content: center;
}
*/
.operation>div{
  width: 98%;
}
/*el-main {
  color: #E9EEF3;
  padding-top: 0;
  height: 100%;
}*/
#fenYe{
  text-align: center;
}
</style>