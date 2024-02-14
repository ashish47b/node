const express = require('express');
const cors = require('cors');
const userRoute  = require('./routes/userRoute');
const errorHandler  = require('./middleware/errorHandler'); 
const connectDb = require('./config/dbconnection');
const dotenv = require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
connectDb();
app.use('/api/',userRoute)
app.use(errorHandler); /// Not Remember
// app.get('/get/contesx',(request,responce)=>{
//        responce.send('this is test')
// })
app.listen(port,()=>{
      console.log(`Server Run On port ${port}`)
})