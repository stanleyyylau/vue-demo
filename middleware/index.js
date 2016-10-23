function requiredLogin(req, res, next) {
  if (req.session && req.session.userId){
    return next();
  }else{
    var err = new Error('you must login first')
    err.status = 401;
    return next(err);
  }
}

module.exports.requiredLogin = requiredLogin;
