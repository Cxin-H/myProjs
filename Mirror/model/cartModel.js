let mysql = require('mysql');
let db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'mirror'
})
let cartModel = {
    cart_add:function (fn){
        let sql = 'SELECT * FROM shopping_list AS s LEFT JOIN m_goods AS g ON s.shop_goods_id=g.goods_id LEFT JOIN m_color AS c ON s.shop_color_id=c.color_ids LEFT JOIN m_style AS l ON g.goods_style_id=l.style_id WHERE s.shop_cart_id=1'
        db.query(sql,function (err,data){
            console.log('===========asd4===========')
            console.log(data)
            fn(err,data);
        })
    },
    cart_del:function (goodsInfo){
        console.log('==========del2===========')
        console.log(goodsInfo);
        var sql='delete from shopping_list where shop_color_id = '+goodsInfo.goodsId+''
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
    }
}
module.exports = cartModel;