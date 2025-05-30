import express from 'express';
import { registerUser,loginUser } from '../controllers/userController.js';
// import { createTodo, fecthToDo, deleteToDo, updateToDoStatus } from '../controllers/todoController.js';
import * as todoController from '../controllers/todoController.js';

// import { auth } from '../auth/authenticationMiddleware.js';

const router = express.Router();


//api route to user reg 
router.post('/signup', registerUser);

//user login
router.post('/login', loginUser);


//for saving the todo 
router.post("/addNewToDo/:userid", todoController.createTodo)

//for getting To Do 
router.get("/fetchToDo/:userid", todoController.fecthToDo)

//delete to do 
router.delete("/deleteToDo/:id",todoController.deleteToDo)

//update status of task
router.put("/updateTodoStatus/:id", todoController.updateToDoStatus)

//edit to do
router.put("/editToDo/:id/:userid", todoController.editTodo)

export default router;
