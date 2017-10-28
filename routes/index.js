var express = require('express');
var Article = require('../model/Article');
var author = require('../common/author');
var router = express.Router();

/* GET home page. */
//多个中间件（权限认证路由拦截）
router.get('/',author.norenzheng,function(req, res, next) {
  Article.find(function(err,data){
      res.render('index',{articles:data});
  }) 
    //显示模板用render
});

//文章详情页面
/* router.get('/articlelist',function(req, res, next) {
  Article.find(function(err,data){
      res.render('articlelist',{articles:data});
  }) 
}); */

router.get('/articlelist/:id',author.norenzheng,function(req, res, next) {
  Article.find({_id:req.params.id},function(err,data){
      if(err) return handleError(err);
      res.render('articlelist',{articles:data[0]});
  })
});


//session测试
router.get('/session',function(req,res,next){
  if(req.session.views == undefined){
    req.session.views=0;
  }else{
    req.session.views++;
  }
  res.send(req.session.views.toString());
  res.end();
})

module.exports = router;
