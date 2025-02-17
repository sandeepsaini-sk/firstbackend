const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET; 

const userschema = new mongoose.Schema({
  username: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }, 
});


userschema.methods.generateToken = function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      JWT_SECRET, 
      { expiresIn: "7d" }
    );
  } catch (err) {
    throw new Error("JWT generation error: " + err.message);
  }
};

const usermodel = mongoose.model("User", userschema);

module.exports = usermodel;
