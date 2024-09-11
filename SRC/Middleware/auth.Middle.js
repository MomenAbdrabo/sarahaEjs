import { UserModel } from "../../DB/models/user/userModel.js"



export const AuthMiddleware=(accessRolse=[])=>{
    return async(req,res,next)=>{

        if(!req.session?.user?.id){
            req.flash('emailErr','not authraziation')
           return res.redirect('/auth/login')
        }
        //console.log(req.session);
        const user =await UserModel.findById(req.session.user.id)
        //console.log(user);
        if(!user){
          req.flash('emailErr','account not register')
          return  res.redirect('/auth/')
    
        }
        if(!accessRolse.includes(user.role)){
            req.flash('emailErr','not access to you')
            return  res.redirect('/auth/login')
        }
        req.user=user
        //console.log(req.user);
        return next()
    }
}