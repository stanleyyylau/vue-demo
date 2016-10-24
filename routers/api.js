var express = require('express');
var uuid = require('uuid');
var bodyParser = require('body-parser');
var app = express();

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// var app = express();
var router = express.Router();
var User = require('./../model/user');

router.get('/', function(req, res, next){
  var todos = req.user.todos
  res.json({
    userName: req.user.userName,
    todos: todos
  });
})

router.post('/delete', function(req, res, next){
  var todos = req.user.todos;
  var newTodos = [];
  var deletedId = req.body.todoId;
  todos.forEach(function(value, index){
    if(value.todoId !== deletedId){
      newTodos.push(value);
    }
  })
  // todo: search Db and replace old todo array with newTodos
  var query = { _id: req.user._id }
  var options = {new: true};
  User.findOneAndUpdate(query, { todos: newTodos }, options, function(err, user){
    res.json({
      userName: req.user.userName,
      todos: user.todos
    });
  })
})

// Todo: add a route to update a todo
router.post('/update', function(req, res, next){
  var todos = req.user.todos;
  var newTodos = [];
  var updatedId = req.body.todoId;
  var newName = req.body.name;
  var newStatus = req.body.status;
  todos.forEach(function(value, index){
    if(value.todoId == updatedId){
      value.name = newName;
      value.compeleted = newStatus;
    }
    newTodos.push(value);
  })
  // Todo: search DB and update value
  var query = { _id: req.user._id }
  var options = {new: true};
  User.findOneAndUpdate(query, { todos: newTodos }, options, function(err, user){
    res.json({
      userName: req.user.userName,
      todos: user.todos
    });
  })

})

// Todo: create a new todo
router.post('/create', function(req, res, next){
  var todos = req.user.todos;
  var newToDoId = uuid.v4();
  var newTodo = {
    todoId: newToDoId, // Server generate this ID
    name: req.body.name,
    compeleted: req.body.status
  }
  todos.push(newTodo);
  // Todo Search DB and update value
  var query = { _id: req.user._id };
  var options = {new: true};
  User.findOneAndUpdate(query, { todos: todos }, options, function(err, user){
    res.json({
      userName: req.user.userName,
      todos: user.todos
    });
  })
})



// Todo: Todo should have name, compeleted, todoId these three properties

module.exports = router;
