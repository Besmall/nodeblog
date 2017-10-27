var express = require('express');
//引用认证模块
var renzheng = require('../common/renzheng');
var router = express.Router();

/* GET home page. */
//多个中间件（权限认证路由拦截）
router.get('/', renzheng,function(req, res, next) {
    //显示模板用render
    res.render('index', { title: '我的首页' }); 
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
