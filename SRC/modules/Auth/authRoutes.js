import { Router } from "express";
import { LogIn, SignUp, desplayLogin, desplaySignUp, logout} from "./controller/Auth.js";
import { valaidationMiddle } from "../../Middleware/validation.js";
import { sginUpSchema } from "./auth.validation.js";

export const sginUpRouter=Router()




sginUpRouter.get('/', desplaySignUp)
sginUpRouter.post('/SignUp', valaidationMiddle(sginUpSchema,'/auth'),SignUp)


//====================== login ====================//
sginUpRouter.get('/login',desplayLogin)
sginUpRouter.post('/login',LogIn)

//===================== logout ====================//
//AuthMiddleware([endPoint.profile]),
sginUpRouter.get('/logout',logout)