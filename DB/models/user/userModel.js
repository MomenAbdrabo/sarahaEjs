
import { Schema ,model } from "mongoose";
import mongoose from "mongoose";

const UserSchema= new Schema({
    userName:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    confirmEmail:{
        type:Boolean,
        default:false
    },
    password:{
        type:String,
        require:true,
    },
    phone:String ,
    profilePic:Object,
    public_id:String,
    coverPic:[],
    address:String,
    age:Number,
    gender:{
        type:String,
        enum:["male","female"],
        default:"male"
        
    },
    role:{
        type:String,
        default:"user",
        enum:["user","admin"]
    },
    status:{
        type:String,
        default:"ofline",
        enum:["ofline","online","blocked"]
    }
},{timestamps:true})



export const  UserModel =mongoose.models.user||model("user",UserSchema);