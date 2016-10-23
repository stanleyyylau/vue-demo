var express = require('express');
var bodyParser = require('body-parser');
var moment = require('moment');
var jwt = require('jwt-simple');
var mongoose = require('mongoose');


var port = process.env.PORT || 5000;
var app = express();
app.set('jwtTokenSecret', 'STANLEYISFUCKINGLYAWESOME');

var mid = require('./middleware');
var User = require('./model/user.js');
var apiRouter = require('./routers/api');

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
    var expires = moment().add('days', 7).valueOf();
    var token = jwt.encode({
      iss: user._id,
      exp: expires
    }, app.get('jwtTokenSecret'));

    res.json({
      token : token,
      expires: expires
    });
  });
});

app.post('/login', function(req, res){
  User.authenticate(req.body.user, req.body.password, function(err, user){
    if(err) console.log(err);
    var expires = moment().add('days', 7).valueOf();
    var token = jwt.encode({
      iss: user._id,
      exp: expires
    }, app.get('jwtTokenSecret'));

    res.json({
      token : token,
      expires: expires,
    });
  })
})

app.use('/api', mid.needRequied, apiRouter)

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
