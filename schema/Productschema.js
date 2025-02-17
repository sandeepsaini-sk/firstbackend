const mongoose = require("mongoose");


const JWT_SECRET = process.env.JWT_SECRET; 

const Productschema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true, maxlength: 100 },
  price: { type: Number, required: true, min: 0 },
  description: { type: String, required: true, maxlength: 500 },
  category: { type: String, required: true },
  stock: { type: Number, default: 0, min: 0 },
  image: { type: String, required: true }
});
const productmodel = mongoose.model("Product", Productschema);

module.exports = productmodel;