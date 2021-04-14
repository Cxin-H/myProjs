//引入express
var express = require('express');
var myRouter = express.Router();

//引入controller
var cartController = require('../controller/cartController');
myRouter.route('/addGoodInCart').get(cartController.cart_add);
myRouter.route('/delGoodFromCart').get(cartController.cart_del);
myRouter.route('/cartjia').get(cartController.cart_jia);
myRouter.route('/cartjian').get(cartController.cart_jian);
// myRouter.route('/delBtn').get(cartController.delGood)
// myRouter.route('/getUser').get(loginController.getUser);
// myRouter.route('/exit').get(loginController.exit);

module.exports = myRouter;