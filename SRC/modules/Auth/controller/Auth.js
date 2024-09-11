

import { UserModel } from "../../../../DB/models/user/userModel.js"
import { HashText, combare } from "../../utils/Hash&Combare.js"
import { generateToken, verifyToken } from "../../utils/genarate&veraifayToken.js"
import main from "../../utils/sendEmail.js"

export const desplaySignUp=(req, res, next ) =>{
 // console.log(req.flash('emailErr')[0]);
    res.render('signUp.ejs',
        {
            pageTitle:'sharaha',
         linkCSS:'./shared/css/signUp.css',
         emailErr:req.flash('emailErr')[0],
         oldData:req.flash('oldData')[0],
         validationErr:req.flash('validationErr')
       //  endSession:req.session.destroy()
        })
}



//////////////////////////////////////////////////////////////////////////



export const SignUp= async(req,res,next)=>{

 
//try {
 
    const {email,password , userName ,cpassword}=req.body


    
    //check email 
    const checkEmail=await UserModel.findOne({email})
    //checkEmail=0
    if(checkEmail){
       // return res.json({message:"email exist"})
       req.flash('emailErr',"email exist")
       req.flash('oldData', req.body)
       return res.redirect('/auth')
       
    } 
    const token=generateToken({payload:{email},signature:process.env.SGNEmail,expirend:60*5})
    const link=`${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`
    const Newtoken=generateToken({payload:{email},signature:process.env.SGNEmail,expirend:60*5})
    const restartlink=`${req.protocol}://${req.headers.host}/auth/SendAgin/${Newtoken}`
    const html=`<a href=${link}>click to confirm Email</a> <br><br>
    
                <a href=${restartlink}> clic to restart email</a>
    `
    
   const confirm= main({
        to:`${email}`,
        subject:'welcom abdrabo cv',
        html,
        text:"hallo"

    })
    
    if(!confirm){
      return next(new Error('email not exist',{cause:400}))
    }
   const hashPass=  HashText({planTEXT:password,SaltRound:9})

       const AddUser=await UserModel.create({email,password:hashPass , userName})

      // return res.json({message:"add done",user:AddUser._id})
      return res.redirect('/auth/login')

}

// export const confirmEmail=async(req,res,next)=>{

//   const{token}=req.params
//   const decoded=verifyToken({token,signature:process.env.SGNEmail})
  
//   const user =await UserModel.updateOne({email:decoded.email},{confirmEmail:true})

//     return user.modifiedCount?res.status(200).redirect("https://www.facebook.com/momen.abdrabou/?locale=ar_AR")
//                              :res.status(404).send("not reqister account")   
  

// }

// export const SendAgin=async(req,res,next)=>{
//     const{token}=req.params
//     const {email}=verifyToken({token,signature:process.env.SGNEmail})
    
//     const newtoken=generateToken({payload:{email},signature:process.env.SGNEmail,expirend:60*2})
//     const link=`${req.protocol}://${req.headers.host}/auth/confirmEmail/${newtoken}`

//     const restartlink=`${req.protocol}://${req.headers.host}/auth/SendAgin/${token}`
//     const html=`<a href=${link}>click to confirm Email</a> <br><br>
    
//                 <a href=${restartlink}> clic to restart email</a>
//     `
    
//    const confirm= main({
//         to:`${email}`,
//         subject:'restart email',
//         html,
//         text:"hallo"

//     })
//     console.log(confirm);
//     if(!confirm){
//       return next(new Error('email not exist',{cause:400}))
//     }
//     return res.status(200).send("<p>chick your account</p>")

// }



//======================== login =============//

export const desplayLogin=(req, res, next ) =>{
  res.render('login.ejs',
      {
          pageTitle:'sharaha',
       linkCSS:'/shared/css/signUp.css',
       emailErr:req.flash('emailErr')[0],
      PasswordErr:req.flash('PasswordErr')[0],
       oldData:req.flash('oldData')[0],
       endSession:req.session.destroy()
      })
}

export const LogIn=async (req,res)=>{    
  
  const{email ,password}=req.body
            
    //check email  
    
    const checkEmail= await UserModel.findOne({email})
    
    if(!checkEmail){

       req.flash('emailErr', 'email not exist')
       req.flash('oldData', req.body)
       return res.redirect('/auth/login')
            
    }
    
       const checkPassword=combare({planTEXT:password ,hashValue:checkEmail.password })
    
       if(!checkPassword){
       // return res.json({message:"password not match"})
         
         req.flash('PasswordErr', 'password not match')
         req.flash('oldData', req.body)
         return res.redirect('/auth/login')
         
       }
       req.session.user=
       {
        id:checkEmail._id,
        isLogged:true,
        rule:checkEmail.role
      }
       checkEmail.status="online";
       await checkEmail.save();
       return res.redirect('/user/profile')

     //return res.json({message:"welcome"})
    
    }


    export const logout=async(req,res,next)=>{
     
      await UserModel.updateOne({_id:req.session.user.id},{status:'ofline'})

      req.session.destroy()
      
      return res.redirect('/auth/login')

    }