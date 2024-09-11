import { fileURLToPath } from "url"
import { sginUpRouter } from "./modules/Auth/authRoutes.js"
import { userRouter } from "./modules/user/user.router.js"
import session from "express-session"
import flash from 'connect-flash'
import  mongoDBStore  from "connect-mongodb-session"
import path from 'path'
import connectionDB from "../DB/connection.js"
import { messageRouter } from "./modules/message/message.router.js"


let MongoDBStore=mongoDBStore(session)
const __dirname= path.dirname(fileURLToPath(import.meta.url))

export const initApp=(app,express)=>{
    app.use(express.json({}))
    app.use(express.urlencoded({ extended: false }))
    app.use('/shared', express.static(path.join(__dirname,'./views/shared')))
    app.set('view engine', 'ejs' )
    app.set('views',path.join(__dirname,'./views'))
    
    var store = new MongoDBStore({
        uri:process.env.DB_LOCAL,
        collection: 'mySessions',
    })
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie:{maxAge:60000*60*6},
        store
    }))

    app.use(flash())
    app.use('/auth',sginUpRouter)
    app.use('/user',userRouter)
    app.use('/message',messageRouter)


    
    connectionDB()
}