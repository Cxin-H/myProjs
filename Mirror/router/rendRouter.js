//引入express
var express = require('express');
var myRouter = express.Router();
//引入controller
var rendController = require('../controller/rendController');

myRouter.route('/getPartList').get(rendController.rend_index);
myRouter.route('/getGoodList').get(rendController.good_index);
myRouter.route('/getDetailList').get(rendController.rend_detail);

module.exports = myRouter;