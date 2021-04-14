let mysql = require('mysql');
let db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'community'
})
let cartModel = {
    cart_jia:function (info,fn){
        let sql = 'UPDATE user_cart SET good_num=good_num+1 WHERE all_incart_id='+info.valueId+';'
        db.query(sql,function (err,data){
            console.log('===========asd4===========')
            console.log(data)
            fn(err,data);
        })
    },
    cart_jian:function (info,fn){
        let sql = 'UPDATE user_cart SET good_num=good_num-1 WHERE all_incart_id='+info.valueId+';'
        db.query(sql,function (err,data){
            console.log('===========asd4===========')
            console.log(data)
            fn(err,data);
        })
    },
    user_cart:function (fn){
        var sql = 'SELECT * FROM user_cart AS u LEFT JOIN goods AS g ON u.good_id=g.good_id LEFT JOIN good_detail AS d ON g.good_id=d.good_id WHERE u.cart_id=1'
        db.query(sql,function (err,data) {
            console.log('===========asd4============')
            console.log(data);
            fn(err,data);
        })
    },
    cart_add:function (info,fn){
        var sql = 'INSERT INTO user_cart(cart_id,good_id,good_num) VALUES (1,'+info.goodId+',1)'
        db.query(sql,function (err,data) {
            console.log('===========asd4============')
            console.log(data);
            fn(err,data);
        })
    },
    cart_del:function (info,fn){
        var sql = 'DELETE FROM user_cart WHERE all_incart_id='+info.goodId+';'
        db.query(sql,function (err,data) {
            console.log('===========asd4============')
            console.log(data);
            fn(err,data);
        })
    }
}
module.exports = cartModel;