import mongoose from "mongoose";


//------------------------This part defines a schema for a user in MongoDB--------------------------------
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },

    followers:[{type:String}], // followers is going to be an array of type string
    followings:[{type:String}] // this is also going to be an array of type string
})

export default mongoose.model('User', userSchema);