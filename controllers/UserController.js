const UserModel = require('../models/User')

const bcrypt = require('bcrypt');

var cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dk4ulehts',
    api_key: '563452817625954',
    api_secret: 'tMryYl6JihhF7F6vE2RKBwBghzg'
})
class UserController {
    static getalluser = async (req, res) => {
        try {
            res.send('hello user')
        } catch (error) {
            console.log(error);

        }
  
    }
    static userinsert = async (req, res) => {
        try {
            //console.log(req.files.image);
            const file = req.files.image
            const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'profileimageapi'
            })

            //console.log(imageUpload)


            //console.log(req.body)

            const { n, e, p, cp } = req.body

            const User = await UserModel.findOne({ email: e })
            // console.log(User);
            if (User) {
                res
                .status(401)
                .json({status:"failed", message:"THIS EMAIL ALREADY EXIT😌😌"})
            }
            
            else {
                if (n && e && p && cp) {
                    if (p == cp) {
                        const hashpassword = await bcrypt.hash(p, 10)// generate secure password
                        const result = new UserModel({
                            //model view
                            name: n,
                            email: e,
                            password: hashpassword,//p
                            image: {
                                public_id: imageUpload.public_id,
                                url: imageUpload.secure_url
                            }

                        })
                        const userData = await result.save()
                        if (userData) {
                            const token = jwt.sign({ ID: userData._id }, 'nisha@12345');
                            // console.log(token);
                            res.cookie('token', token)
                            this.sendVerifyMail(n, e, userData._id)
                            req.flash('success', 'Your Registraion has beeb successfullly.please Login')

                            res.redirect('/register')

                        } else {
                            req.flash('error', 'Not a Verifyed User.')
                            res.redirect('/register')

                        }
                        // req.flash('success', 'Register successfully please login')
                        // res.redirect('/')

                    }
                    else {
                        req.flash('error', 'password and confirm password does not match')
                        res.redirect('/register')


                    }

                }
                else {
                    res
                .status(401)
                .json({status:"failed", message:"ALL FEILD ARE😌😌"})
            }

                }
            
                


        } catch (error) {
            console.log(error);

        }


    }
  
    static logout = async (req, res) => {
        try {

            res.send('logout api');
        } catch (error) {
            console.log(error);

        }
    }





}
module.exports = UserController