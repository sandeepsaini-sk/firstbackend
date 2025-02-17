const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  items: { type: Array, required: true },
  totalAmount: { type: Number, required: true },
  status: { type: String, default: "Processing" },
  createdAt: { type: Date, default: Date.now },
  name: { type: String }, 
});
const ordermodel = mongoose.model("Order", orderSchema);

module.exports = ordermodel;
