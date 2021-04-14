<template>
  <div class="yongHu">
       <section class="caoZuo">
         <el-button type="primary" ref="addFromRef" @click="addYongHu = true">添加</el-button>
         <el-button class="tianJia" type="danger" @click="allDelete">批量删除</el-button>
         <el-button type="primary" @click="allXiuGai">修改</el-button>
       </section>
       <!-- 用户列表 -->
       <div class="userTable">
          <el-table :data="userPage" @selection-change="handleSelectionChange" border stripe>
            <el-table-column type="selection"></el-table-column>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column label="用户账号" prop="yongHuZhangHao"></el-table-column>
            <el-table-column label="用户姓名" prop="xingMing"></el-table-column>
            <el-table-column label="联系方式" prop="lianXiFangShi"></el-table-column>
            <el-table-column label="用户密码" prop="miMa"></el-table-column>
          </el-table>
       </div>
        <!--分页-->
        <section class="fenYe">
          <el-pagination
              @current-change="shuaXin"
              layout="total,prev, pager, next"
              :pager-count="5"
              :total="totalPage">
          </el-pagination>
        </section>
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
              <el-input v-model="editForm.xingMing"></el-input>
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
      totalPage:null,//总条数
      userPage: [],//总共
      //控制用户添加框的显示
      addYongHu: false,
      //多选删除
      selectId: '',
      //添加用户表单数据
      addForm: {
        yongHuZhangHao: '',
        xingMing: '',
        lianXiFangShi: '',
        miMa: '',
      },
      multipleSelection:[],//复选框获取的对象
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
      //批量删除的功能
      delsalls: [],
      delsall: [],
      //修改
      objall: [],//所有
      objone: [],//单个
    }
  },
  mounted() {
      this.$axios.get('/yongHu/chaXunFenYe',{//我在这里放上全地址，/yongHu 前面的不需要直接删除
        params: {
          page: 1
        }
      }).then((res) => {
        console.log(res.data)
        // this.userList = res.data.data
        this.userPage = res.data.data
        this.totalPage=res.data.count;
      }).catch(err => err)
  },
  methods: {
    //刷新页面
    shuaXin(val) {
      this.$axios.get('/yongHu/chaXunFenYe',{//我在这里放上全地址，/yongHu 前面的不需要直接删除
        params: {
          page: val
        }
      }).then((res) => {
            console.log(res.data)
            // this.userList = res.data.data
            this.userPage = res.data.data
            this.totalPage=res.data.count;
      }).catch(err => err)
    },
    //修改用户对话框的展示
    async modifiCation(all) {
      this.xiuGaiYongHu = true
      this.editForm = all
      console.log(all)
    },
    modifiCations(all) {
      this.xiuGaiYongHu = true
      this.editForm = all
      console.log(all)
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
        this.shuaXin(1);
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
        this.shuaXin(1);
      }
    },
    //批量删除
    async allDelete() {
       this.delsalls = this.selectId.split(',')

      console.log(typeof this.selectId)
      console.log(this.selectId)
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
      if (this.delsalls.length !== 1){
          this.delsall = this.delsalls.splice(0,1)
          const {data: res} = await this.$axios.post('/yongHu/shanChuById?id=' + this.delsall)
          if (res.code !== 200){
            return this.$message.error('删除用户失败')
          }else {
            this.$message.success('删除用户成功')
            // this.userList = res.data.data;
            this.shuaXin(1);
          }
        }
      },
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
            this.shuaXin(1)
            //提示修改成功
            this.$message.success('更新用户信息成功')
          }
      )
    },
    //多选假的修改
    async allXiuGai() {
      this.delsalls = this.selectId.split(',')

      console.log(this.selectId)

      if (this.delsalls.length !== 1){
        this.$message.error('只能选择一个用户修改')
      }else {
        const {data: res} = await this.$axios.get('/yongHu/chaXunAll')
        if (res.code !== 200){
          this.$message.error('获取用户数据失败')
        }else {
          this.$message.success('获取用户数据成功')
          this.objall = res.data
          console.log(this.objall)
          var that = this
          this.objone = this.objall.filter((v) => {
            if (v.id == that.delsalls){
              return v
            }
          })
          console.log(this.objone)
          this.modifiCations(this.objone[0])
          //验证方法
          this.$refs.editFormRef.validate(
              async valid => {
                if (!valid) return
                //发起用户修改请求
                const {data:res} = await this.$axios.post('/yongHu/gengXinById',this.objone[0])
                if (res.code !== 200){
                  return this.$message.error('更新用户信息失败')
                }
                //关闭对话
                this.xiuGaiYongHu = false;
                //刷新数据
                this.shuaXin(1)
                //提示修改成功
                this.$message.success('更新用户信息成功')
              }
          )
        }
      }


    }
  },

}
</script>

<style scoped>
.yongHu{
  display: flex;
  flex-direction: column;
}
.caoZuo{
  display: flex;
  margin: 10px 0;
  padding: 0 0 0 20px;
}
.userTable{
  display: flex;
}
.fenYe{
  text-align: center;
}
</style>