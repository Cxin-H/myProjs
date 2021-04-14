//引入express
var express = require('express');
var myRouter = express.Router();

//引入controller
var cartController = require('../controller/cartController');

myRouter.route('/shoppingCart').get(cartController.cart);
myRouter.route('/delBtn').get(cartController.delGood)
// myRouter.route('/getUser').get(loginController.getUser);
// myRouter.route('/exit').get(loginController.exit);

module.exports = myRouter;