var mysql = require('mysql');
var db = mysql.createConnection({
    host:'localhost',//链接的数据库的主机名
    user:'root', //链接的数据库的用户名
    password:'123456',//链接的数据库的密码
    database:'community'  //链接的数据库的名字
})
var rendModel = {
    rend_index:function (fn) {
        var sql = 'select * from diff_part';
        db.query(sql,function (err,data) {
            console.log('===========asd1============')
            console.log(data);
            fn(err,data);
        })
    },
    good_index:function (fn){
        var sql = 'select * from goods';
        db.query(sql,function (err,data) {
            console.log('===========asd2============')
            console.log(data);
            fn(err,data);
        })
    },
    rend_detail:function (info,fn){
        var sql = 'SELECT * FROM good_detail AS d LEFT JOIN goods AS g ON d.good_id=g.good_id WHERE d.good_id='+info.valueId+';'
        db.query(sql,function (err,data) {
            console.log('===========asd3============')
            console.log(data);
            fn(err,data);
        })
    },
    user_cart:function (fn){
        var sql = 'SELECT * FROM user_cart AS u LEFT JOIN goods AS g ON u.good_id=g.good_id LEFT JOIN good_detail AS d ON g.good_id=d.good_id WHERE u.cart_id=1'
        db.query(sql,function (err,data) {
            console.log('===========asd3============')
            console.log(data);
            fn(err,data);
        })
    }
}
module.exports = rendModel;
