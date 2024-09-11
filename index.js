import express from 'express'
import * as dotenv from 'dotenv'
import { initApp } from './SRC/initApp.js'

dotenv.config()
const app = express()
const port = 3000
initApp(app,express)
    

app.listen(port, () => console.log(`Example app listening on port ${port}!`))