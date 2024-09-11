
import jwt from "jsonwebtoken"

export const generateToken=({payload,signature=process.env.signature_token,expirend}={})=>{

  const token= jwt.sign(payload,signature,{expiresIn:parseInt(expirend)})

  return token
}
export const verifyToken=({token,signature=process.env.signature_token}={})=>{

  const decode= jwt.verify(token,signature)

  return decode
}