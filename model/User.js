var mongoose = require('mongoose');


//定义数据结构
var userSchema = mongoose.Schema({
    name:String,
    pwd:String,
    createtime:{
        default:new Date(),
        type:Date
    }
})

var User = mongoose.model('User', userSchema);

//导出
module.exports = User; 