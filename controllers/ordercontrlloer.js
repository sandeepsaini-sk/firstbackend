const ordermodel = require("../schema/Order");

const orders = async (req, res) => {
  try {
    const { cart, userEmail, total } = req.body;
    const neworder = new ordermodel({
      userEmail,
      items: cart,
      totalAmount: total,
      status: "Processing",
      createdAt: new Date(),
    });

    const savedOrder = await neworder.save();
    res.status(201).json({
      message: "Order placed successfully!",
      order: savedOrder,
      alert: true,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Order save API not working", error: err.message });
  }
};


const orderget=async(req,res)=>{
  try{
      const saveorder= await ordermodel.find();
      res.json(saveorder)
  }
  catch(err){
    res.status(500).json({message:"server error product api"})
  }
}

const orderstatus=async(req,res)=>{
  try {
    const { status } = req.body;
    const updatedOrder = await ordermodel.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: "Error updating order", error: err });
  }
}
const userorder=async(req,res)=>{
  try {
    const userEmail = req.params.email;
    const orders = await ordermodel.find({ userEmail }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders", error: err });
  }
}
module.exports = { orders,orderget,orderstatus ,userorder};
