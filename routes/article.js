var express = require('express');
var Article = require('../model/Article');
var author = require('../common/author');
var router = express.Router();

//中间件
router.use(author.renzheng,author.norenzheng)

/* 
    文章列表详情路由
    文章列表详情操作
 */
router.get('/',function(req, res, next) {
    Article.find(function(err,data){
        res.render('article/article',{articles:data});
    }) 
});

//文章发布操作
router.get('/addarticle',function(req, res, next) {
    res.render('article/addarticle',{username:req.session.user.name});
});
//发布文章操作
router.post('/addarticle', function(req, res, next) {
    
    var article = new Article({
        title:req.body.title,
        author:req.body.author,
        note:req.body.note,
        content:req.body.content
    });
    article.save(function(err,data){
        if(err){
            res.redirect("/article/addarticle");
        }else{
            res.redirect("/article/");
        }
    });
});

//文章修改路由
router.get('/update/:id',function(req, res, next) {
    Article.find({_id:req.params.id},function(err,data){
        if(err) return handleError(err);
        res.render('article/update',{data:data[0]});
    })
});


//操作修改
router.post('/update',function(req, res, next) {
    //es6写法
    let = {title,author,note,content,shujuid}=req.body;
    Article.update({ _id:shujuid } , {title,author,note,content}, function (err) {
        if(err)return console.error(err);
        res.redirect("/article/");
    });
});

/* Student.remove({ name: 'xiaowangba' }, function (err) {
    if (err) return handleError(err);
    console.log("removed!"); 
  }); */
//删除文章操作
router.post('/del', function(req, res, next) {
    let = articleID=req.body.articleID;
    Article.remove({ _id:articleID }, function (err) {
        var obj = {};
        if(err){
            obj={
                status : -1
            };
        }else{
            obj={
                status : 1
            };
        }
        res.json(obj);
    });
});

module.exports = router;
