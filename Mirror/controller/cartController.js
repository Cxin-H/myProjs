var cartModel = require('../model/cartModel')
var cartController = {
    cart:function (req,res){
        cartModel.cart_add(function (err,data){
            if(err){
                res.send({code:401,msg:err})
            }else {
                res.render('shoppingcart',{data:data});
            }
        });
        // res.render('shoppingcart');
    },
    delGood:function (req,res){
        console.log('=========del========');
        console.log(req.query);
        let shopGoodsId = req.query.goodsId;
        cartModel.cart_del({goodsId: shopGoodsId}).then(function (data) {
            if (!data.length){
                res.json({code:200});
            }else {
                res.send({code:201})
            }
        }).catch(function (err) {
            console.log('==========2==========')
            console.log(err);
            res.send({code:501,msg:'数据库执行错误'});
        })
    }
}
module.exports = cartController;