


export const errorHandling=(fn)=>{
    return(req,res,next)=>{
        fn(req,res,next).catch(error=>{
            res.json({message:"catch error",error,stack:error.stack})  }      )
    }
}


export const GlobalErrorHandling=(err,req,res,next)=>{

    if(err){
        return res.json({message:err.message})
    }

}