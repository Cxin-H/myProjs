var mysql = require('mysql');
var db = mysql.createConnection({
    host:'localhost',//链接的数据库的主机名
    user:'root', //链接的数据库的用户名
    password:'123456',//链接的数据库的密码
    database:'mirror'  //链接的数据库的名字
})
var demoModel = {
    demo:function (fn) {
        var sql = 'select * from m_index';
        db.query(sql,function (err,data) {
            console.log('===========asd============')
            console.log(data)
            fn(err,data);
        })
    },
    demo_goods:function (fn) {
        var sql_goods = 'select * from m_goods where goods_style_id=11';
        db.query(sql_goods,function (err,data) {
            console.log('===========asd2============')
            console.log(data)
            fn(err,data);
        })
    },
    demo_par:function (fn) {
        var sql_par = 'select * from m_color where color_goods_id = 9';
        db.query(sql_par,function (err,data) {
            console.log('===========asd3============')
            console.log(data)
            fn(err,data);
        })
    }
}
module.exports = demoModel;
