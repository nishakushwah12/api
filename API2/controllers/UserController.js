const UserModel = require('../models/user')
var cloudinary = require('cloudinary').v2;
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');



cloudinary.config({
    cloud_name: 'dk4ulehts',
    api_key: '563452817625954',
    api_secret: 'tMryYl6JihhF7F6vE2RKBwBghzg'
});


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
                    .json({ status: "failed", message: "this email already exit" });
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
                            // this.sendVerifyMail(n, e, userData._id)

                            res
                                .status(201)
                                .json({ status: "success", message: "your registraion has been succesfully" });

                        } else {

                            res
                                .status(401)
                                .json({ status: "failed", message: "not a verifyed user" });

                        }
                        // req.flash('success', 'Register successfully please login')
                        // res.redirect('/')
                        // res
                        //     .status(401)
                        //     .json({ status: "success", message: "Register successfully please login" });

                    }
                    else {

                        res
                            .status(401)
                            .json({ status: "failed", message: "password and confirm password does not match" });


                    }

                }
                else {

                    res
                        .status(401)
                        .json({ status: "failed", message: "All field are require" });


                }
            }


        } catch (error) {
            console.log(error);

        }


    }
}



module.exports = UserController