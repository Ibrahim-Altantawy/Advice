import { model, models, Schema } from "mongoose";


const userShema= new Schema({
    userName:{
        type:String,
        required:[true,"you Name is required"],
        trim: true ,
        
    },
    email:{
        type:String,
        required:[true,"you email is required"],
        trim: true ,
        unique:[true,"this email is exsit"]
    },
    image:String
},{
    timestamps:true
})

const userModel=models.User || model("User",userShema)

export default userModel;