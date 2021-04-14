//引入express
var express = require('express');
var myRouter = express.Router();

//引入controller
var loginController = require('../controller/loginController');

myRouter.route('/login').get(loginController.loginGet);
myRouter.route('/register').post(loginController.register);
// myRouter.route('/getUser').get(loginController.getUser);
// myRouter.route('/exit').get(loginController.exit);

module.exports = myRouter;