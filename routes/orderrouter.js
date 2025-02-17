const express=require('express');
const Router=express.Router();
const ordercontroller=require('../controllers/ordercontrlloer')


Router.route("/order").post(ordercontroller.orders);
Router.route("/orderget").get(ordercontroller.orderget);
Router.route("/orderget/:id").patch(ordercontroller.orderstatus);
Router.route("/orderget/:email").get(ordercontroller.userorder)
module.exports=Router;