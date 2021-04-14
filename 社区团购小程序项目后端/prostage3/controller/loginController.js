var loginModel = require('../model/loginModel');
var loginController = {
    loginGet:function (req,res) {
        console.log('=========1=======');
        console.log(req.query);
        var tel = req.query.u_tel;
        var pwd = req.query.u_pwd;
        loginModel.login({u_tel:tel,u_pwd:pwd}).then(function (data) {
            if (data.length){
                // req.session.user=data[0];
                console.log('找到数据！');
                res.json({code:200,msg:'成功'});
            }else {
                console.log('用户不存在!');
                res.send({code:201,msg:'密码错误或用户不存在'})
            }
        }).catch(function (err) {
            console.log('==========2==========')
            console.log(err);
            res.send({code:501,msg:'数据库执行错误'});
        })
    },
    register:function (req,res) {
        var tel = req.body.u_tel;
        var pwd = req.body.u_pwd;
        loginModel.register({u_tel:tel,u_pwd:pwd},function (err,data) {
            if (err){
                console.log(err);
                res.send('database sql err');
            }else{
                if (data.length){
                    console.log('已找到数据');
                    var msg = {errCode:101,errMsg:'该号码已注册'}
                    res.send(msg);
                }else {
                    loginModel.add({u_tel:tel,u_pwd:pwd},function (err,data) {
                        if (err){
                            console.log(err);
                            var msg = {
                                errCode:102,
                                errMsg:'database sql err',
                                sqlMsg:err
                            }
                            res.send(msg);
                        }else{
                            var msg = {
                                errCode:'',
                                errMsg:'',
                                successMsg:'注册成功'
                            }
                            res.send(msg);
                        }
                    })
                }
            }
        })
    }
/*    exit:function(req,res){
        req.session.destroy();
    }*/
}

module.exports =loginController;