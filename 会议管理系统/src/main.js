import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import http from './axios/http.js'
import Breadcrumb from './components/Breadcrumb'
import Mypagination from './components/Mypagination'


ElementUI.Dialog.props.closeOnClickModal.default = false
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.component("Breadcrumb",Breadcrumb);
Vue.component("Mypagination",Mypagination)
Vue.prototype.$axios=http;

//请求在到达服务器之前，先会调用use中的这个回调函数来添加请求头信息
/*axios.interceptors.request.use(config => {
  //为请求头对象，添加token验证的Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem("token")
  return config
})*/



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
