

import joi from 'joi'
import { generalFaild } from '../../Middleware/validation.js'



export const sginUpSchema={
    body:joi.object({

        userName:joi.string().min(2).max(30).required(),
        email:generalFaild.email,
        password:generalFaild.password,     
        Cpassword:generalFaild.Cpassword.valid(joi.ref('password'))
    }).required(),
  
}

export const logIN=joi.object({
    email:generalFaild.email,
    password:generalFaild.password,
   
}).required()

