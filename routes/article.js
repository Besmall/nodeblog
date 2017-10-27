var express = require('express');
var Article = require('../model/Article');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('article/addarticle');
});
//发布文章
router.post('/', function(req, res, next) {
    var article = new Article({
        title:req.body.title,
        author:req.body.author,
        note:req.body.note,
        content:req.body.content
    });
    article.save(function(err,data){
        if(err) res.end("发布失败");
        res.end("发布成功")
    });
  });

module.exports = router;
