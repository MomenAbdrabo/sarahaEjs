

import joi from "joi"

// arrow fn retrun req, res , next ليه 
// عشان معملهاش مخصص ل روت معين 
// ف و انا بحط الروت اخد الميسود الي هتتنفذ فيها الفلدجين

const arrofresev=['body','Headers','query']
export const valaidationMiddle=(Schema,R_Url)=>{
const arrError=[]
return(req,res,next)=>{
    arrofresev.forEach(key => {

    if(Schema[key]){
        const validate=Schema[key].validate(req[key],{abortEarly:false})
        console.log(validate);
        if(validate.error){
            console.log(validate.error.details);
            for (const detail of validate.error.details) {


                arrError.push(detail.path[0])
                
            }
          
        }
    }
    });
    if(arrError.length>0){
        console.log(arrError);
        req.flash('validationErr',arrError)
        req.flash('oldData',{...req.body,...req.query,...req.params})
        return res.redirect(R_Url)
       // return res.json({message:"valadater error",error:arrError})
    }
    next()
    } 






}

export const generalFaild={
    userName:joi.string().min(2).max(30).required(),
    email:joi.string()
    .email({minDomainSegments:2,maxDomainSegments:3,tlds:{allow:['com','edu']} }),
    password:joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    Cpassword: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
}


