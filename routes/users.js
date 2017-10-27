var express = require('express');
var User = require('../model/User');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//注册路由
router.get('/logging', function(req, res, next) {
  res.render('users/logging');
});

//登录路由
router.get('/login', function(req, res, next) {
  res.render('users/login');
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
          res.redirect("/users/logging");
        }else{
          res.redirect("/users/login");
        }
      });
    }else{
      res.redirect("/users/logging");
      console.log("用户名已存在")
    }
  }); 
});

module.exports = router;
