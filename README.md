## To signup
**/signup**
+ req.body.user
+ req.body.password
+ 返回一个token

## To login
**/login**
+ req.body.user
+ req.body.password
+ 返回一个token

## To get all todos
**/api  (get)**
+ 返回JSON数组包含所有todos


## To create a new todo
**/create (post)**
+ req.body.name,
+ req.body.status
+ 返回JSON数组包含所有todos
+ 返回uuid

## To update a todo
**/update (post)**
+ req.body.todoId;
+ req.body.name;
+ req.body.status;
+ 返回JSON数组包含所有todos
+ 返回uuid

## To delete a todo
**/delete (post)**
+ req.body.todoId;
+ 返回JSON数组包含所有todos
+ 返回uuid
