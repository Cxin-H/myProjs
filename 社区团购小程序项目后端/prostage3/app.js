var express = require('express');//引入express
var favicon = require('serve-favicon')//引入小图标
var morgan = require('morgan');////引入日志模块
var ejs = require('ejs')//引入ejs

//引入post
var bodyParser = require('body-parser');
var server = express();
/*//引入cookie
var cookie = require('cookie-parser');
//引入session
var session = require('express-session');*/

var loginRouter = require('./router/loginRouter');//引入路由
var demoRouter = require('./router/demoRouter')
var cartRouter = require('./router/cartRouter')
var rendRouter = require('./router/rendRouter')


server.use(demoRouter);//使用路由demo
server.use(cartRouter);//使用cart路由

//配置ejs
server.set('views',__dirname+'/view');//设置视图目录
server.engine('html',ejs.__express);//申明HTML引擎
server.set('view engine','html');//启动视图引擎，使用ejs文件模板

server.use(express.static(__dirname+'/public'));//配置静态页面访问路径
server.use(favicon(__dirname+'/public/favicon.ico'));//使用小图标
server.use(morgan('dev'));//使用日志模块

//配置psot
server.use(bodyParser.urlencoded({extend:true}));//配置请求头
server.use(bodyParser.json());//数据以json传输

//配置跨域
server.all('*',function(req,res,next){
    res.header('Access-Control-Allow-Origin',"*");
    res.header('Access-Control-Allow-Headers',"Content-Type,Authenticate");
    res.header('Access-Control-Allow-Methods',"GET,POST,OPTIONS");
    next();
})
server.use(rendRouter);

/*server.use(cookie());
server.use(session({
    secret:'web243',//秘钥，签名
    name:'demo243',//cookie的key
    resave:true,//是否重新保存
    rolling:true,//是否更新失效的时间
    cookie:{maxAge:180*1000}//失效的时间 毫秒数
}))*/

//使用路由  post的配置在路由前面
server.use(loginRouter);
server.listen(1501);
