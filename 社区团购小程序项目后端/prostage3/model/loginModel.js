var mysql = require('mysql');//引入数据库
//链接数据库
var db = mysql.createConnection({
    host:'localhost',//链接的数据库的主机名
    user:'root', //链接的数据库的用户名
    password:'123456',//链接的数据库的密码
    database:'mirror'  //链接的数据库的名字
});

var loginModel = {
    login:function (userInfo) {
        console.log('=========3=======')
        console.log(userInfo);
        var sql = 'select * from m_user where u_tel = "'+userInfo.u_tel+'" and u_pwd ="'+userInfo.u_pwd+'"';
        var promise =new Promise((resolve,reject) =>{
            db.query(sql,function (err,data) {
                if (err){
                    reject(err);
                }else{
                    resolve(data);
                }
            })
        })
        return promise;
    },
    register:function(userInfo,fn){
        var sql = 'select * from m_user where u_tel = "'+userInfo.u_tel+'" and u_pwd ="'+userInfo.u_pwd+'"';
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    add:function (userInfo,fn) {
        var sql = 'insert into m_user(u_tel,u_pwd) values("'+userInfo.u_tel+'","'+userInfo.u_pwd+'")'
        db.query(sql,function(err,data){
            console.log("=========8=========")
            console.log(err);
            console.log(data);
            fn(err,data);
        });
    }
}
module.exports=loginModel;