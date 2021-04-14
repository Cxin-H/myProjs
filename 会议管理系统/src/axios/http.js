import Axios from "axios";
import {Loading} from "element-ui"
// import router from "@/router"

let http=Axios.create({
    baseURL:process.env.VUE_APP_BASE_URL,
    timeout:10000 //响应超时配置
})

var loadingInstance;

//添加请求拦截器
http.interceptors.request.use(function(config){
    //在发送请求之前
    console.log('请求',config);

    loadingInstance=Loading.service({fullscreen:true,text:'努力加载中.....',background:'rgba(0,0,0,0.2)'})
    let token=sessionStorage.getItem('token');
    if(token){
        config.headers.Authorization=token;
    }
    return config;
},function(err){
    //请求错误做的事情
    return Promise.reject(err)
});
//添加响应拦截器
http.interceptors.response.use(function(res){
    console.log('响应',res);
    if(res.data.token){
        sessionStorage.setItem('token',res.data.token);
    }
    loadingInstance.close();
    return res;
},function(err){
    console.log(err.response);
    loadingInstance.close();
    // router.push('/'); //有错误则去登录页面重新登录
    sessionStorage.clear();//清除token
    return Promise.reject(err);
})

//导出http
export default http;