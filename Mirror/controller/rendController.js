var rendModel = require('../model/rendModel')
var rendController = {
    rend_index:function (req,res) {
        rendModel.rend_index(function (err,data) {
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
    },
    good_index:function (req,res) {
        rendModel.good_index(function (err,data) {
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
    },
    rend_detail:function (req,res) {
        var valueId = req.query.valId;
        rendModel.rend_detail({valueId:valueId},function (err,data) {
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
}
module.exports = rendController;
