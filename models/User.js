const mongoose = require('mongoose')
//User 
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    
    password:{
        type: String,
        required: true
    },
    user_id:{
        type:String,
        Required:true
    },
   
   
   
    image: {
        public_id: {
            type: String,
        },
        url: {
            type: String
        }
    },
   
    role:{
        type: String,
        default: "User"
    },

},{timestamps:true})

const UserModel = mongoose.model('user',UserSchema)

module.exports = UserModel

