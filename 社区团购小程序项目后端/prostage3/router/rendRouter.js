//引入express
var express = require('express');
var myRouter = express.Router();
//引入controller
var rendController = require('../controller/rendController');

myRouter.route('/getPartList').get(rendController.rend_index);//获取商品分类信息，渲染主页的分类
myRouter.route('/getGoodList').get(rendController.good_index);//获取主页商品信息，渲染主页的商品推荐
myRouter.route('/getDetailList').get(rendController.rend_detail);//获取商品详情，渲染商品详情
myRouter.route('/getCartList').get(rendController.user_cart);//获取购物车信息，渲染购物车内的商品

module.exports = myRouter;