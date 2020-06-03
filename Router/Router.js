const Express = require('express');
const Router=Express.Router();
const userController=require('../controller/userController')
const jwtAuth=require('../controller/jwtAuth');
const passport=require('passport');

Router.post('/api-signupuser',userController.signupUser);

Router.post('/api-session-creation',jwtAuth.createSession)

Router.get('/api-getnotes/:id',passport.authenticate('jwt',{session:false}),userController.getNotes)

Router.post('/api-postnotes/:id',passport.authenticate('jwt',{session:false}),userController.setNotes)

Router.get('/api-getchecklist/:id',passport.authenticate('jwt',{session:false}),userController.getChecklist)

Router.post('/api-checklist/:id',passport.authenticate('jwt',{session:false}),userController.setChecklist)

Router.get('/api-gettodolist/:id',passport.authenticate('jwt',{session:false}),userController.getTodoList)

Router.post('/api-settodolist/:id',passport.authenticate('jwt',{session:false}),userController.setTodoList)

module.exports=Router;