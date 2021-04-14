<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card class="box-card">
      <!-- 搜索与添加 -->
      <el-row :gutter="10">
        <el-col :span="3">
          <el-button class="tianJia" type="success" ref="addFromRef" @click="addYongHu = true" plain>添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表 -->
      <el-table :data="userPage" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="用户账号" prop="yongHuZhangHao"></el-table-column>
        <el-table-column label="用户姓名" prop="xingMing"></el-table-column>
        <el-table-column label="联系方式" prop="lianXiFangShi"></el-table-column>
        <el-table-column label="用户密码" prop="miMa"></el-table-column>
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <el-button type="success" icon="el-icon-edit" plain size="mini" @click="modifiCation(scope.row)">修改</el-button>
            <el-button type="warning" icon="el-icon-delete" plain size="mini" @click="shanChuId(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[3, 5, 7, 10]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next"
          :total="userList.length">
      </el-pagination>
    </el-card>


    <!-- 添加用户 -->
    <el-dialog
        title="添加用户"
        :visible.sync="addYongHu"
        width="50%"
        @close="closeYongHu"
    >
      <!-- 内容主题 -->
      <el-form ref="addFromRef" :model="addForm"
               :rules="addFormRules"
               label-width="100px">

        <el-form-item label="用户账号" prop="yongHuZhangHao">
          <el-input v-model="addForm.yongHuZhangHao"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名" prop="xingMing">
          <el-input v-model="addForm.xingMing"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="lianXiFangShi">
          <el-input v-model="addForm.lianXiFangShi"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="miMa">
          <el-input v-model="addForm.miMa"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addYongHu = false">取 消</el-button>
    <el-button type="primary" @click="addUser">确 定</el-button>
  </span>
    </el-dialog>

    <!-- 修改用户 -->
    <el-dialog
        title="修改用户信息"
        :visible.sync="xiuGaiYongHu"
        width="50%" @close="xiuGaiYongHuClose">
      <el-form :rules="addFormRules" ref="editFormRef" :model="editForm" label-width="80px">
        <el-form-item label="用户账号" prop="yongHuZhangHao">
          <el-input v-model="editForm.yongHuZhangHao"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名">
          <el-input v-model="editForm.xingMing" disabled></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="lianXiFangShi">
          <el-input v-model="editForm.lianXiFangShi"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="miMa">
          <el-input v-model="editForm.miMa"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="xiuGaiYongHu = false">取 消</el-button>
          <el-button type="primary" @click="xiuGaiYongHuInfo">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>


<script>
import {Dialog} from "element-ui";
export default {
  name: "Users",
  data() {
    //验证手机号
    var checkPhone = (rule, value, callback) => {
      const regPhone = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9|14[57])[0-9]{8}$/
      if (regPhone.test(value)){
        return callback()
      }
      callback(new Error('请输入合法手机号'))
    }
    return {
      YongHu: {
        id: '',
        jiGouZi: {
          diZhi: '',
          fuZeRen: '',
          id: '',
          jiGou:'',
          jiGouId: '',
          lianXiDianHua: '',
          mingCheng: ''
        },
        jiGouZiId: '',
        jueSe: {
          auth: '',
          id: '',
          jueSeMing: '',
        },
        jueSeId: '',
        lianXiFangShi: '',
        miMa: '',
        xingMing: '',
        yongHuZhangHao: ''
      },
      userList:[],
      //获取用户参数列表的参数对象
      queryInfo: {
        query: '',
        page: 1, //当前页码值
      },
      pageSize: 3,//每页
      userPage: [],//总共
      //控制用户添加框的显示
      addYongHu: false,
      //多选删除
      //添加用户表单数据
      addForm: {
        yongHuZhangHao: '',
        xingMing: '',
        lianXiFangShi: '',
        miMa: '',
      },
      //添加表单的验证规则
      addFormRules: { //用户账号
        yongHuZhangHao: [
          {required: true, message: '请输入用户账号', trigger: 'blur'},
        ],
        miMa: [ //用户密码
          {required: true, message: '请输入用户密码', trigger: 'blur'},
          {min: 5, max: 12, message: '用户名的长度在5-12之间',trigger: 'blur'}
        ],
        xingMing: [ //用户姓名
          {required: true, message: '请输入用户姓名', trigger: 'blur'},
          {min: 2, max: 10, message: '用户名的长度在2-10之间',trigger: 'blur'}
        ],
        lianXiFangShi: [ //联系方式
          {required: true, message: '请输入电话', trigger: 'blur'},
          {validator: checkPhone, trigger: 'blur'}
        ],
      },
      //修改用户对话框的显示与隐藏
      xiuGaiYongHu: false,
      //查询到的用户信息对象
      editForm: {},
      //选中值的显示
      sels: [],
    }
  },
  mounted() {
    this.shuaXin()
    this.userPage = this.userList.slice(0, this.pageSize)
  },
  methods: {
    //刷新页面
    shuaXin() {
      // this.$axios({
      // //   url:"/yongHu/chaXunFenYe",
      // //   type:"get",
      // //   params:this.queryInfo,
      // // }).then((res)=>{
      // //   console.log(res.data)
      // //   this.userList = res.data.data;
      // //   //刚进入页面加载数据,获取第一页的
      // //   this.userPage = this.userList.slice(0,this.pageSize)
      // //
      // // }).catch((err)=>{
      // //   console.log(err)
      // // });
      this.$axios.get('/yongHu/chaXunFenYe',{
        params: {
          page: this.queryInfo.page
        }
      })
      .then((res) => {
        console.log(res.data)
        this.userList = res.data.data
        this.userPage = this.userList.slice(0,this.pageSize)
      }).catch(err => err)
    },
    //修改用户对话框的展示
    async modifiCation(all) {
      this.xiuGaiYongHu = true
      this.editForm = all
      console.log(all)
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      //页数改变时，显示第一页的数据
      this.pageSize = val;
      this.handleCurrentChange(1)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      var currPage = val;
      this.userPage = this.userList.slice((val - 1) * this.pageSize,val*this.pageSize);
    },
    // 添加用户对话框的关闭
    closeYongHu() {
      this.$refs.addFromRef.resetFields()
    },
    // 添加用户的确定按钮
    addUser() {
      this.$refs.addFromRef.validate(async valid => {
        // console.log(valid)
        if (!valid) return
        // 发起添加用户的网络请求
        const {data: res} = await this.$axios.post('/yongHu/xinZeng',this.addForm)
        if (res.code !== 200){
          this.$message.error('添加用户失败')
        }
        this.$message.success('添加用户成功')
        this.addYongHu = false;
        //刷新列表
        this.shuaXin();
      })
    },

    //删除
    async shanChuId(id) {
      // console.log(id)
      const confirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // console.log(confirmResult);
      if (confirmResult !== 'confirm'){
        return this.$message.info('取消删除')
      }
      // console.log('确认删除')
      const {data: res} = await this.$axios.post('/yongHu/shanChuById?id=' + id)
      if (res.code !== 200){
        return this.$message.error('删除用户失败')
      }else {
        this.$message.success('删除用户成功')
        // this.userList = res.data.data;
        this.shuaXin();
      }
    },
    //用户信息修改对话框的关闭
    xiuGaiYongHuClose() {
      //重置方法
      this.$refs.editFormRef.resetFields()
    },
    //修改用户表单提交前的预验证
    xiuGaiYongHuInfo() {
      //验证方法
      this.$refs.editFormRef.validate(
          async valid => {
            if (!valid) return
            //发起用户修改请求
            const {data:res} = await this.$axios.post('/yongHu/gengXinById',this.editForm)
            if (res.code !== 200){
              return this.$message.error('更新用户信息失败')
            }
            //关闭对话
            this.xiuGaiYongHu = false;
            //刷新数据
            this.shuaXin()
            //提示修改成功
            this.$message.success('更新用户信息成功')
          }
      )
    }
  },

}
</script>

<style scoped>
.el-button {
  padding: 5px 8px
}
.el-row {
  margin-bottom: 20px;
}
.tianJia {
  padding: 12px 20px;
}
</style>