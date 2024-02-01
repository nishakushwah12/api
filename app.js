const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })
const web = require('./routes/web')
const connectDb = require('./db/connectDb')
const fileUpload = require("express-fileupload");
const cors = require('cors')

app.use(cors())// for api communication
// for file upload
app.use(fileUpload({ useTempFiles: true }));
//data get in api
app.use(express.json())
connectDb()

//load route
app.use('/api', web)
//localhost:4000/api







//server create
app.listen(process.env.PORT, () => {
    console.log(`server running on localhost: ${process.env.PORT}`);
})

