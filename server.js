var express = require('express');
var bodyParser = require('body-parser');
var moment = require('moment');
// var session = require('express-session');
var jwt = require('jwt-simple');
var mongoose = require('mongoose');


var app = express();
app.set('jwtTokenSecret', 'STANLEYISFUCKINGLYAWESOME');
var mid = require('./middleware')

var port = process.env.PORT || 5000;



var User = require('./model/user.js');
// use sessions for tracking login
// app.use(session({
//   secret: 'Stanley make a vue demo',
//   resave: true,
//   saveUninitialized: false
// }));

// serve static files from /public
app.use(express.static('public'));

// Mongodb connection
mongoose.connect('mongodb://localhost:27017/vue-demo');
var db = mongoose.connection;
//
db.on('error', console.error.bind(console, 'connection error'));

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.post('/signup', function(req, res){
  var user = new User({userName: req.body.user , password:req.body.password});
  user.save(function(err,user){
    if(err) return console.error(err);
    console.log(user + " new user save to database!!!");
    // req.session.userId = user._id;
    // console.log(req.session.userID);
    // console.log(req.session);
    // res.send('sign up succefful!!!');
    var expires = moment().add('days', 7).valueOf();
    var token = jwt.encode({
      iss: user._id,
      exp: expires
    }, app.get('jwtTokenSecret'));

    res.json({
      token : token,
      expires: expires,
      user: user.toJSON()
    });
  });
});


app.get('/try', mid.needRequied, function(req, res){
  var hi = req.user;
  console.log(req.user);
  res.send('hi ' + req.user.userName + ', you are login, you can view this page');
})

app.use(function(err, req, res, next){
  res.status(401);
  res.send('No token provided');
})

app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});
