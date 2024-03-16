const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config({path:'./.env'})
const web = require('./routes/web')
const connectDb = require('./db/connectdb')
const fileUpload = require("express-fileupload");
//temp file uploader
app.use(fileUpload({useTempFiles: true}));
const cors = require('cors')







app.use(cors())// for API communication in react
//for dataget api
app.use(express.json())

connectDb()


//load route
app.use('/api', web)
//localhost:2000/api







//server createting

app.listen(process.env.PORT,()=>{
    console.log(`sever running on localhost: ${process.env.PORT}`);
})





