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
            // const file = req.files.image
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
    static loginUser = async (req, res) => {
        try {
            // console.log(req.body)
            const { email, password } = req.body
            // console.log(password)
            if (email && password) {
                const user = await UserModel.findOne({ email: email })
                // console.log(user)
                if (user != null) {
                    const isMatched = await bcrypt.compare(password, user.password)
                    if ((user.email === email) && isMatched) {
                        //generate jwt token
                        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
                        // console.log(token)
                        res.cookie('token', token)
                        res
                            .status(201)
                            .json({ status: "success", message: "Login successfully with web token 😃🍻", token, user });
                    } else {
                        res.status(401).json({ status: "failed", message: "'Email and Password is not valid !😓" });
                    }
                } else {
                    res.status(401).json({ status: "failed", message: "'You are not registered user😓" });
                }
            } else {
                res.status(401).json({ status: "failed", message: "'All Fields are required 😓" });
            }
        } catch (err) {
            console.log(err)
        }
    }
    static updatePassword = async (req, res) => {
    //     // console.log(req.user)
    //     try {
    //         const { oldPassword, newPassword, confirmPassword } = req.body

    //         if (oldPassword && newPassword && confirmPassword) {
    //             const user = await UserModel.findById(req.user.id);
    //             const isMatch = await bcrypt.compare(oldPassword, user.password)
    //             //const isPasswordMatched = await userModel.comparePassword(req.body.oldPassword);
    //             if (!isMatch) {
    //                 res.status(201).json({ "status": 400, "message": "Old password is incorrect" })
    //             } else {
    //                 if (newPassword !== confirmPassword) {
    //                     res.status(201)
    //                         .json({ "status": "failed", "message": "password does not match" })
    //                 } else {
    //                     const salt = await bcrypt.genSalt(10)
    //                     const newHashPassword = await bcrypt.hash(newPassword, salt)
    //                     //console.log(req.user)
    //                     await UserModel.findByIdAndUpdate(req.user.id, { $set: { password: newHashPassword } })
    //                     res.status(201)
    //                         .json({ "status": "success", "message": "Password changed succesfully" })
    //                 }
    //             }
    //         } else {
    //             res.status(201)
    //                 .json({ "status": "failed", "message": "All Fields are Required" })
    //         }
    //     } catch (err) {
    //         res.status(201)
    //             .json(err)
    //     }
     }
    



    static logout = async (req, res) => {
        
        try {
            res.cookie("token", null, {
                expires: new Date(Date.now()),
                httpOnly: true,
            });

            res.status(200).json({
                success: true,
                message: "Logged Out",
            });
        } catch (error) {
            console.log(error)
        }
    }
}



module.exports = UserController