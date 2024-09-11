
import { Router } from "express";
import { profile, profilePic, shareProfile } from "./controller/user.js";
import { AuthMiddleware } from "../../Middleware/auth.Middle.js";
import { endPoint } from "./endPoint.access.js";
import {FileValidation, uploadFile} from '../utils/cloudMulter.js'
export const userRouter=Router()


userRouter.get('/profile',AuthMiddleware(endPoint.profile),profile)
userRouter.post('/profilePic',AuthMiddleware(endPoint.profile),uploadFile(FileValidation.image).single('image'),profilePic)
userRouter.get('/:id/ShareProfile',shareProfile)
