import bcrypt from "bcryptjs"



export const HashText=({planTEXT="" ,SaltRound=process.env.Salt_Round}={})=>{

    const HashResult=bcrypt.hashSync(planTEXT,parseInt(SaltRound))

        return HashResult;

}

export const combare=({planTEXT="" ,hashValue=""}={})=>{

    const combareText=bcrypt.compareSync(planTEXT,hashValue)

        return combareText;

}