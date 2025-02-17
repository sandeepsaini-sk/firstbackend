const userModel = require("../schema/userschema");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const Stripe = require("stripe");

const signup = async (req, res) => {
try{
     const {email,username,password,phone}=req.body

     const emailexist= await userModel.findOne({email});
     if(emailexist){
      return res.status(400).json({message:"email already exist" ,alert:false});
     }
      // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new userModel({ username, email, phone, password:hashedPassword });
      await newUser.save();

      return res.status(201).json({
        message: "Registration successful",
        token:newUser.generateToken(),
        userId: newUser._id.toString(),
        username: newUser.username,
        isAdmin: newUser.isAdmin,
        email:newUser.email,
        alert:true,
       
      });}
catch(err){
  res.status(500).json({message:"sever is failed" , err:err})
}

};

const login = async (req, res) => {
  try{
       const {email,password}=req.body
  
       const emailexist= await userModel.findOne({email});
       if(!emailexist){
        return res.status(400).json({message:"account not found",alert:false});
       }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, emailexist.password);
    if (isMatch) {
       return res.status(201).json({
          message: "login successful",
          token:emailexist.generateToken(),
          userId: emailexist._id.toString(), 
          username: emailexist.username,
          isAdmin: emailexist.isAdmin,
          email: emailexist.email,
          alert:true,
        });}
        else {
          res.status(401).json({ message: "Invalid email or password" });
        }
      }
  catch(err){
    res.status(500).json({message:"sever is failed" , err:err})
  }
  
  };

  const users=async(req,res)=>{
    try{
      const users= await userModel.find();
      res.json(users);
    }
    catch(err){
      res.json({message:"user server error"})
    }
  }

  const updateuser=async(req,res)=>{
    try{
      const updateuser=await userModel.findByIdAndUpdate(req.params.id, req.body,{new:true});
      res.json({updateuser, alert:true,message:"udpate value successfully"});
    }
    catch{
      res.status(500).json({message:"update api error"})
    }
  }
  const deleteuser=async(req,res)=>{
    try{
      const deleteuser= await userModel.findByIdAndDelete(req.params.id);
  
       if (!deleteuser) {
        return res.status(404).json({ message: "Product not found" ,alert:false });
      }
       res.json({ message: "Product deleted successfully" ,alert:true});
    }
    catch(err){
      res.status(500).json({message:"deleteproduct side err"})
    }
  }

  //payment method

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const payment = async (req, res) => {
    try {
      const data = req.body;
  
      // Check if data is an array
      if (!Array.isArray(data) || data.length === 0) {
        return res.status(400).json({ message: "Invalid cart data! Expected an array." });
      }
  
      const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [{ shipping_rate: "shr_1Qp1L7JZbD2E3ekU87SLzXHz" }],
  
        line_items: data.map((item) => ({
          price_data: {
            currency: "inr",
            product_data: {
              name: item.name,
              // images: [item.image] // Uncomment if images are available
            },
            unit_amount: item.price >= 50 ? item.price * 100 : 50 * 100, // Convert to paise
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.qty,
        })),
  
        success_url: `${process.env.FRONTEND_URL}/success`,
        cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      };
  
      const session = await stripe.checkout.sessions.create(params);
      console.log(session);
      res.status(200).json({ sessionId: session.id });
    } catch (err) {
      console.error("Stripe Error:", err);
      res.status(err.statusCode || 500).json({ message: "Payment processing failed", error: err.message });
    }
  };
   
  



module.exports = { signup ,login,users,deleteuser,updateuser,payment};
