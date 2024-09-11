
import mongoose, {Schema , model, Types}from "mongoose"

const MessageSchema= new Schema({
    message:{
        type:String,
        required:true
    },
    receiverID:{ 
        type:Types.ObjectId,
        ref:"User",
        required:true,
    }
},{
    timestamps:true
})

   
const MessageModel=mongoose.models.Message||model("Message",MessageSchema)

export default MessageModel;