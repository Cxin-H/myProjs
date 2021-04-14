var demoModel = require('../model/demoModel')
var demoController = {
    demo:function (req,res) {
        demoModel.demo(function (err,data) {
            if (err){
                res.send({code:301,msg:err})
            }else {
                res.render('index',{data:data});//渲染index.html，并把数据用json传给html
            }
        })

    },
    demo_goods:function (req,res) {
        demoModel.demo_goods(function (err,data) {
            if (err){
                res.send({code:301,msg:err})
            }else {
                res.render('modern-lady', {data:data})
            }
        })
        // res.render('modern-lady.html') //ejs文件名
    },
    demo_par:function (req,res) {
        demoModel.demo_par(function (err,data) {
            if (err){
                res.send({code:301,msg:err})
            }else {
                res.render('particulars', {data:data})
            }
        })
    }
}
module.exports = demoController;
