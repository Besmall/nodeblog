var express = require('express');
var User = require('../model/User');
//引用认证模块
var author = require('../common/author');
var router = express.Router();

/* 获取文章管理页面 */
//多个中间件（权限认证路由拦截）
router.get('/',author.renzheng,author.norenzheng,function(req, res, next) {
  //显示模板用render
  res.render('users/index',{username:req.session.user.name}); 
});



//登录路由
router.get('/login', function(req, res, next) {
  res.render('users/login');
});

//登录查询
router.post('/login', function(req, res, next) {
  var {username,pwd} = req.body;
  User.find({name:username,pwd:pwd},function(err,data){
    if(err) {
      res.json({status:-1,msg:"登录失败"});
    }else if(data.length==0){
      res.json({status:-1,msg:"用户名或密码不对"});
    }else{
      req.session.user = data[0];
      res.json({status:1,msg:"登录成功"});
    }
  });
});

//退出session
router.post("/signout",function(req,res,next){
  req.session.destroy(function(err){
    if(err)res.json({state:-1});
    res.json({state:1})
  })
})

//注册路由
router.get('/logging', function(req, res, next) {
  res.render('users/logging');
});

//注册添加数据库
router.post('/logging', function(req, res, next) {
  var {username,pwd} = req.body;
  User.find({name:username},function(err,data){
    if(data.length == 0){
      var user = new User({
        name:username,
        pwd:pwd
      });
      user.save(function(err,data){
        if(err) {
          res.json({status:-1,msg:"注册失败"});
        }else{
          res.json({status:1,msg:"注册成功"});
        }
      });
    }else{
        res.json({status:-1,msg:"用户名已存在"});
    }
  }); 
});

module.exports = router;
