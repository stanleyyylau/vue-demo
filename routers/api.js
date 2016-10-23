var express = require('express');
// var app = express();
var router = express.Router();
var User = require('./../model/user');

router.get('/', function(req, res, next){
  var todos = req.user.todos
  console.log(todos);
  res.json(todos);
})

router.post('/delete', function(req, res, next){
  var todos = req.user.todos
  todos.forEach()
})

// Todo: add a route to update a todo
router.post('/update', function(req, res, next){

})

// Todo: create a new todo
router.post('create', function(req, res, next){

})

// Todo: Todo should have name, compeleted, todoId these three properties

module.exports = router;
