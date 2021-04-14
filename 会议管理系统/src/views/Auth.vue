<template>
  <el-container>
    <el-container>
      <el-main>
        <div>
          <div class="auth">

            <div class="caoZ">
              <el-input placeholder="请输入内容" v-model="input" clearable @clear="search"></el-input>
              <el-button type="success" icon="el-icon-search" @click="search">搜索</el-button>
              <el-button type="primary" icon="el-icon-circle-plus-outline" @click="edit">分配权限</el-button>
            </div>

            <el-dialog :visible.sync="editDialogVisible">
              <el-form ref="userForm" :model="userForm" :rules="rules" label-width="80px">
                <el-form-item label="编号" prop="id">
                  <el-input v-model="userForm.id" :disabled="true"></el-input>
                </el-form-item>

                <el-form-item label="角色名" prop="jueSeMing">
                  <el-input v-model="userForm.jueSeMing" disabled></el-input>
                </el-form-item>

                <el-form-item label="权限" prop="jueSeId">
                  <el-input v-model="userForm.jueSeId" oninput="if(value>4)value=2;if(value<1)value=1"></el-input>
                </el-form-item>
              </el-form>

              <div slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible=false">取 消</el-button>
                <el-button type="primary" @click="editData">确 定</el-button>
              </div>
            </el-dialog>
            <!--        表格-->
           <section class="quanXian">
             <el-table :data="dataList" border  style="width: 100%" @selection-change="handleSelectionChange"  >
               <el-table-column type="selection"></el-table-column>
               <el-table-column prop="xingMing" label="用户名"></el-table-column>
               <el-table-column prop="lianXiFangShi" label="联系方式"></el-table-column>
               <el-table-column prop="yongHuZhangHao" label="用户账号"></el-table-column>
               <!--          <el-table-column prop="jueSeId" label="类型">
                           <template slot-scope="jueSeId">{{dataList.jueSe.jueSeId}}</template>
                         </el-table-column>-->
               <el-table-column prop="jueSe.jueSeMing" label="用户角色"></el-table-column>

             </el-table>
           </section>

            <div>
              <el-pagination
                  background
                  layout="total,prev, pager, next"
                  :total="totalPage"
                  id="fenye"
                  @current-change="currentChange">
              </el-pagination>
            </div>
          </div>
        </div>

      </el-main>
    </el-container>
  </el-container>
</template>

<script>

export default {
  name: "auth",
  data() {
    return {
      editDialogVisible: false,
      value: '',
      //搜索
      input: '',//搜索输入框的值
      multipleSelection: {},
      tempCheck: '',
      totalPage: 1,
      userForm: {
        jueSeMing: "",
        id: "",
        jueSeId: "",
      },

      rules: {
        jueSeMing: [
          {required: true, message: "请输入姓名", trigger: "blur"},
          {min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur"}
        ],
        id: [
          {
            required: true,
            type: "number",
            message: "必须为数字值",
            trigger: "blur"
          }
        ],
        jueSeId: [
          {
            required: true,
            type: "number",
            message: "请输入1~4",
            trigger: "blur"
          }
        ]
      },
      dataList: [],
      isEdit: false,
      index: null
    };
  },
  props:['totalPageNum'],
  methods: {
    getDataList(msg) {
      this.dataList = msg;
    },
    //分页
    currentChange(val) {
      console.log(val)
      const that=this;
      this.$axios({
        url: "/yongHuShouQuan/chaXun",
        method: "get",
        params: {
          page: val
        }
      }).then((res) => {
        that.dataList = res.data.data;
        that.$emit("getDataList", res.data.data)
      }).catch((err) => {
        console.log(err)
      })
    },

    //选择
    handleSelectionChange(val) {
      this.multipleSelection = {};
      this.multipleSelection = val;
      console.log(this.multipleSelection)
    },

    //搜索
    search() {
      console.log(this.input)
      if (this.input == " || this.value==") {
        this.shiBai('请输入')
        this.currentChange(1);
      }
      if (this.input != " &&this.value!=") {
        const that = this;
        this.$axios({
          url: "/yongHuShouQuan/chaXun",
          params: {
            page: 1,
            jueSeMing: this.input,
          }
        }).then((res) => {
          if (res.data.count) {
            that.dataList = res.data.data;
            that.totalPage = res.data.count;
          } else {
            this.shiBai('查询失败');
          }

        }).catch((err) => {
          console.log(err)
        });
      }
    },
    //修改
    edit() {
      console.log(this.tempCheck);
      if (this.multipleSelection.length === 0) {
        this.shiBai('请选择一条数据');
      }
      if (this.multipleSelection.length === 1) {
        this.editDialogVisible = true;
        this.userForm.id = this.multipleSelection[0].id;
        this.userForm.jueSeId = this.multipleSelection[0].jueSeId;
        this.userForm.jueSeMing = this.multipleSelection[0].jueSe.jueSeMing;
        console.log(this.userForm)

      }
      if (this.multipleSelection.length > 1) {
        this.shiBai('只能选择一条数据');
      }
    },
    editData() {
      const that = this;
      console.log("******");
      console.log(typeof (that.userForm.jueSeId));
      this.$axios({
        url: "/yongHuShouQuan/gengXinById",
        method: "post",
        headers: {"Content-Type": "application/json"},
        data: {
          page: 1,
          id: that.userForm.id,
          // jueSeMing:this.userForm.jueSeMing,
          jueSeId: Number(that.userForm.jueSeId),
        }
      }).then(() => {
        //that.dataList=res.data.data;
        this.$axios({
          url: "/yongHuShouQuan/chaXun",
          method: "get",
          params: {
            page: 1
          }
        }).then((res) => {
          that.dataList = res.data.data;
          that.totalPage = res.data.count;
          console.log("***")
          console.log(that.dataList)
        }).catch((err) => {
          console.log(err)
        });
        that.chengGong('修改成功');
      }).catch((err) => {
        console.log(err)
      })
      this.editDialogVisible = false;
    },

    chengGong(msg) {
      this.$message({
        message: msg,
        type: 'success',
        duration: 1000
      });
    },
    shiBai(msg) {
      this.$message({
        showClose: true,
        message: msg,
        type: 'error',
        duration: 1000
      });
    }
  },


  mounted() {
    const that = this;
    this.$axios({
      url: "/yongHuShouQuan/chaXun",
      method: "get",
      params: {
        page: 1
      }
    }).then((res) => {
      that.dataList = res.data.data;
      that.totalPage = res.data.count;
      console.log("***")
      console.log(that.dataList)
    }).catch((err) => {
      console.log(err)
    });
  },
  watch: {
    totalPageNum(news) {
      this.totalPage = news;
    }
  }
}
</script>
<style scoped>
.caoZ{
  /*width: 600px;*/
  display: flex;
  padding: 15px 0;
/*  align-items: center;
  height: 50px;
  margin-bottom: 10px;*/
  /*margin: auto;*/
}
.quanXian{
  display: flex;
  height: 100%;
}
div>.el-row>.el-button:first-child{
  float: left;
  margin: 10px;
}
.el-dialog{
  width: 520px;
}
.el-input{
  width:auto;
  margin: 0 10px;

}
#fenye {
  margin-top: 5px;
  text-align: center;
}
.el-main {
  color: #E9EEF3;
  padding-top: 0;
  height: 100%;
}
</style>
