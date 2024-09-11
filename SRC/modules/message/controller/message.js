import MessageModel from "../../../../DB/models/message/messageModel.js"
import { UserModel } from "../../../../DB/models/user/userModel.js"



export const sendMessage=async(req,res,next)=>{
    const{id}=req.params
    const{message}=req.body

    if(! await UserModel.findById(id)){
        req.flash('findUser','user not founded')
        res.redirect(`/use/${id}/ShareProfile`)
    } 

    console.log(id);

     await MessageModel.create({message,receiverID:id})
    req.flash('thankMessage',' thank you come agein')
    res.redirect(`/user/${id}/ShareProfile`)


}

export const deleteMessage=async(req,res,next)=>{
    const{id}=req.params
    
     await MessageModel.findByIdAndDelete({_id:id})
    // req.flash('thankMessage',' Done')
    res.redirect(`/user/profile`)


}