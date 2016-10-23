var UserModel = require('../model/user');
var jwt = require('jwt-simple');
var express = require('express');
var app = express();
app.set('jwtTokenSecret', 'STANLEYISFUCKINGLYAWESOME');

module.exports.needRequied = function(req, res, next) {
  // code goes here
  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
  if (token) {
    var decoded = jwt.decode(token, app.get('jwtTokenSecret'));

    // handle token here
    if (decoded.exp <= Date.now()) {
      res.end('Access token has expired', 400);
    }

    UserModel.findOne({ _id: decoded.iss }, function(err, user) {
      req.user = user;
      console.log('we find this user from the token you provided')
      console.log(user);
      next();
    });

    // next();

  } else {
    var err = new Error('no token');
    err.status = 401;
    next(err);
  }
};
