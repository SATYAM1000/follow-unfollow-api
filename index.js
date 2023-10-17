import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import route from "./routes/userRoute.js";

//creating the express app
const app=express();

//--------------------------middlewares------------------------------------
app.use(bodyParser.json()); // convert the incoming data into javascript objects so that the server can understand
app.use(cookieParser()); // cookie parser middleware

//------------------------------configuring the dotenv file----------------------------
dotenv.config();
const PORT=process.env.PORT || 3006;
const URL=process.env.MONGOURL;
console.log(PORT)

//connecting with mongodb----------------------------

mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log("Database Connection successfull..."))
.catch((error)=>console.log("ERROR: ",error))
 app.use('/api/user', route)

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
