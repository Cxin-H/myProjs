var cartModel = require('../model/cartModel')
var cartController = {
    cart_add:function (req,res){
        var valueId = req.query.goodId;
        cartModel.cart_add({goodId:valueId},function (err,data) {
            if (err){
                res.send({code:401,msg:err})
            }else {
                res.send({code:200,msg:'添加成功！'})
            }
        })
    },
    cart_del:function (req,res){
        var valueId = req.query.goodId;
        cartModel.cart_del({goodId:valueId},function (err,data) {
            if (err){
                res.send({code:401,msg:err})
            }else {
                res.send({code:200,msg:'删除成功！'})
            }
        })
    },
    cart_jia:function (req,res){
        var valueId = req.query.cartId;
        cartModel.cart_jia({valueId:valueId},function (err,data) {
            if (err){
                res.send({code:401,msg:err})
            }else {
                cartModel.user_cart(function (err,data){
                    console.log(data);
                    if (err){
                        res.send({code:301,msg:err})
                    }else {
                        if(data.length){
                            res.send({data:data});//把数据用json传给html
                        }else {
                            res.send({msg:'没有数据'})
                        }
                    }
                })
            }
        })
    },
    cart_jian:function (req,res){
        var valueId = req.query.cartId;
        cartModel.cart_jian({valueId:valueId},function (err,data) {
            if (err){
                res.send({code:401,msg:err})
            }else {
                cartModel.user_cart(function (err,data){
                    console.log(data);
                    if (err){
                        res.send({code:301,msg:err})
                    }else {
                        if(data.length){
                            res.send({data:data});//把数据用json传给html
                        }else {
                            res.send({msg:'没有数据'})
                        }
                    }
                })
            }
        })
    },
/*    delGood:function (req,res){
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
    }*/
}
module.exports = cartController;