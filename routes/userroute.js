const express=require('express');
const Router=express.Router();
const usercontroller=require('../controllers/user-controller')

Router.route('/signup').post(usercontroller.signup);
Router.route('/login').post(usercontroller.login);
Router.route('/users').get(usercontroller.users);
Router.route('/user/:id').put(usercontroller.updateuser);
Router.route('/user/:id').delete(usercontroller.deleteuser);
Router.route('/payment').post(usercontroller.payment);
module.exports=Router;