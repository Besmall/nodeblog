//认证登录和未登录跳转路劲
function renzheng(req, res, next){
    if(req.session.user){
      next();
    }else{
      //跳转用redirect
      res.redirect('/users/login');
    }
  } 
//检测登录显示什么和未登录显示什么
function norenzheng(req, res, next){
  if(req.session.user){
    res.locals.username=req.session.user.name;
  }
  next();
} 
exports.renzheng=renzheng;
exports.norenzheng=norenzheng;