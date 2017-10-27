var mongoose = require('mongoose');
//建立连接
mongoose.connect('mongodb://localhost/blog', { useMongoClient: true });
mongoose.Promise = global.Promise;

//定义数据结构
var articleSchema = mongoose.Schema({
    title:String,
    author:String,
    note:String,
    content:String,
    createtime:{
        default:new Date(),
        type:Date
    }
})

var Article = mongoose.model('Article', articleSchema);

//导出
module.exports = Article; 