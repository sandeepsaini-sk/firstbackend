require('dotenv').config();
const express=require("express");
const Router=require("./routes/userroute")
const connectdb=require('./monodb/db');
const cors=require('cors');
const product=require('./routes/productrouter')
const order=require('./routes/orderrouter')
const app=express();
app.use(cors())
app.use(express.json({limit:"10mb"})); 
app.use(express.urlencoded({ extended: true }));


app.use('/api',Router)
app.use('/api',product)
app.use('/api',order)
                      
const PORT =  process.env.PORT||3900;
connectdb().then(()=>{
  app.listen(PORT, () => {
    console.log("server is running  port", +PORT);
});
})                        

