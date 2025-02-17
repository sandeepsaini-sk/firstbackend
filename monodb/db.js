const { config } = require('dotenv');
const mongoose=require('mongoose');
require('dotenv').config();
const URI=process.env.MONODB_URL;

const connectdb=async()=>{
  try{
   await mongoose.connect(URI,);
    console.log("database connection successfull")
  }
  catch(err){
    console.error(err);
    process.exit(0);
    console.log("database connection failed")
  }
}

module.exports=connectdb;