var mongoose = require('mongoose');
//建立连接
mongoose.connect('mongodb://localhost/blog', { useMongoClient: true });
mongoose.Promise = global.Promise;

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