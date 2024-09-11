import MessageModel from "../../../../DB/models/message/messageModel.js"
import { UserModel } from "../../../../DB/models/user/userModel.js"
import cloundinary from "../../utils/cloundinary.js"



export const profile=async(req,res,next)=>{

    const user = await UserModel.findById(req.session?.user?.id)
    const messages = await MessageModel.find({receiverID:req.session?.user?.id})
    console.log(messages);
    res.render('profile.ejs',
        {
         pageTitle:'sharaha',
         linkCSS:'/shared/css/signUp.css',
         user,
         messages
        }
    )

}

export const profilePic=async(req,res,next)=>{

console.log(req.file);
   const {secure_url,public_id}=await cloundinary.uploader.upload(req.file.path,{folder:`EJS/user/${req.session.user.id}`})

    const user = await UserModel.updateOne({_id:req.session.user.id},{profilePic:{secure_url,public_id}})
    console.log(user);
    res.redirect('/user/profile')
    

}


export const shareProfile=async(req,res,next)=>{
    const {id}=req.params 
    const user = await UserModel.findById(id)
   res.render('MessageSend.ejs',
    {
     pageTitle:'sharaha',
     linkCSS:'/shared/css/signUp.css',
     thankMessage:req.flash('thankMessage')[0],
     findUser:req.flash('findUser')[0],
     user
    }
)
}