const express=require('express');
const Router=express.Router();
const productcontroller=require('../controllers/productcontroller')

Router.route('/newproduct').post(productcontroller.newproduct);
Router.route('/product').get(productcontroller.product);
Router.route('/products/:id').put(productcontroller.updateproduct);
Router.route('/products/:id').delete(productcontroller.deleteproduct);


module.exports=Router;