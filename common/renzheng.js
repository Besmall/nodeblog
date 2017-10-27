function renzheng(req, res, next){
    if(req.session.user){
      next();
    }else{
      //跳转用redirect
      res.redirect('/users/login');
    }
  } 

  module.exports = renzheng;