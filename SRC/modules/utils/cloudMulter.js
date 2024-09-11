
import multer from "multer"
export const FileValidation={
    image:["image/jpeg","image/png","image/gif",'image/jpg'],
    file:["application/pdf,application/msword"]
}
export function uploadFile(customValidation=[]){
   
    const storage=multer.diskStorage({})
    function fileFulter(req,file,cb){
        if(customValidation.includes(file.mimetype)){
             cb(null,true)

        }else{
            cb('in-vaild file format',false)
        }
    }
    const uploads=multer({storage,fileFulter})
    return uploads
}