//引入express
var express = require('express');
var myRouter = express.Router();
//引入controller
var demoController = require('../controller/demoController');

myRouter.route('/index').get(demoController.demo);
myRouter.route('/modern-lady').get(demoController.demo_goods);
myRouter.route('/particulars').get(demoController.demo_par);
// myRouter.route('/shoppingcart').get(demoController.demo_cart);
module.exports =  myRouter;