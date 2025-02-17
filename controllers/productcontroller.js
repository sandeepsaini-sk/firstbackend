const productmodel=require('../schema/Productschema');

const newproduct=async(req,res)=>{
  try{
      const{name,price,description,stock,category,image}=req.body;
      const NewProduct=new productmodel({name,price,description,category,stock,image});
      await NewProduct.save();
      res.status(201).json({message:"product added successfully",alert:true})
  }
  catch(err){
    res.status(500).json({message:'server side erroe product'})
  }
}
const product=async(req,res)=>{
  try{
      const product= await productmodel.find();
      res.json(product)
  }
  catch(err){
    res.status(500).json({message:"server error product api"})
  }
}
const updateproduct=async(req,res)=>{
  try{
    const updateproduct=await productmodel.findByIdAndUpdate(req.params.id, req.body,{new:true});
    res.json({updateproduct,alert:true,message:"udpate value successfully"});
  }
  catch{
    res.status(500).json({message:"update api error"})
  }
}
const deleteproduct=async(req,res)=>{
  try{
    const deletedProduct= await productmodel.findByIdAndDelete(req.params.id);

     if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" ,alert:false });
    }
     res.json({ message: "Product deleted successfully" ,alert:true});
  }
  catch(err){
    res.status(500).json({message:"deleteproduct side err"})
  }
}




module.exports={newproduct,product,updateproduct,deleteproduct} 