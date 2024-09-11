
import mongoose from "mongoose";

const connectionDB=async()=>{
     return  await mongoose.connect(process.env.DB_LOCAL)
        .then(result=>{console.log("connection BataBase done ")})
        .catch(err=>{console.log(`connection faild......${err} `)})

}

export default connectionDB;

