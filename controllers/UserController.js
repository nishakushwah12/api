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
    static bloguser = async (req, res) => {
        try {
            res.send('hello block')

        } catch (error) {
            console.log(error);

        }
    }

    static userinsert = async (req, res) => {
        try {
            //console.log(req.files.image);
            const file = req.files.image
            const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'profileimagapi'
            })

            //console.log(imageUpload)


          //  console.log(req.body)

            const { n, e, p, cp } = req.body

            const User = await UserModel.findOne({ email: e })
            // console.log(User);
            if (User) {
                res
                    .status(401)
                    .json({ satus: "faild", message: "THIS EMAIL IS ALREADY EXSIT 😌😌" });
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
                        await result.save()
                        res
                            .status(201)
                            .json({ satus: "success", message: "Registration Successfully 😄😄" });

                        res.redirect('/')

                    }
                    else {
                        res
                            .status(401)
                            .json({ satus: "faild", message: "PASSWORD AND CONFIRM PASSWORD DOES NT MATCH 😌😌" });



                    }

                }
                else {
                    res
                        .status(401)
                        .json({ satus: "faild", message: "ALL FIELD REQUIRE 😌😌" });


                }
            }


        } catch (error) {
            console.log(error);

        }


    }
    static verifylogin = async (req, res) => {
        try {
            //console.log(req.body)
            const { email, password } = req.body
            if (email && password) {
                const user = await UserModel.findOne({ email: email })
                //console.log(user)
                if (user != null) {

                    const ismatch = await bcrypt.compare(password, user.password)
                    if (ismatch) {
                        // console.log(user.role)
                        if (user.role == 'admin') {
                            const token = jwt.sign({ ID: user._id }, 'nisha@12345');
                            //console.log(token);
                            res.cookie('token', token)
                            res.redirect('/admin/dashboard')

                        }
                        if (user.role == 'user') {
                            const token = jwt.sign({ ID: user._id }, 'nisha@12345');
                            //console.log(token);
                            res.cookie('token', token)
                            res.redirect('/dashboard')

                        }

                    }
                    else {
                        res
                            .status(401)
                            .json({ satus: "faild", message: "EMAIL & PASSWORD DOES NOT MATCHES 😌😌" });
                    }
                }
                else {

                    res
                        .status(401)
                        .json({ satus: "faild", message: "YOUR ARE NOT RAGISTERED USER 😌😌" });
                }
            }
            else {

                res
                    .status(201)
                    .json({ satus: "success", message: "ALL FEILD ARE REQUIRED 😌😌" });
            }
        } catch (error) {

        }



    }
    static changepassword = async (req, res) => {
        try {
            //  console.log(req.body)
            const { OldPassword, NewPassword, ConfirmPassword } = req.body
            // const { id } = req.user
            if (OldPassword && NewPassword && ConfirmPassword) {
                const user = await UserModel.findById(id)
                const ismatch = await bcrypt.compare(OldPassword, user.password)

                if (!ismatch) {
                    res
                        .status(401)
                        .json({ satus: "faild", message: "CURRENT PASSWORD DOES NOT MATCH 😌😌" });


                } else {
                    if (NewPassword != ConfirmPassword) {

                        res
                            .status(401)
                            .json({ satus: "faild", message: "password does not match😌😌" });

                    } else {

                        const newHashPassword = await bcrypt.hash(NewPassword, 10)
                        await UserModel.findByIdAndUpdate(id, {
                            password: newHashPassword
                        })
                      
                        res
                            .status(201)
                            .json({ satus: "success", message: "PASSWORD UPDATE SUCCESSFULLY  😄😄" });


                    }
                }

            } else {

                res
                    .status(401)
                    .json({ satus: "faild", message: "ALL FEILD REQUIRE  😄😄" });


            }
        } catch (error) {
            console.log(error);

        }
    }
   

  
    static getuserdetails = async(req,res)=>{
        try {
            const { name, email, id}= req.data1
            
            const user = await UserModel.findById(req.data1.id)
           
            res.status(201)
                .json({status:'success',
                 message:'user details  insert successfully 😄😄',
                 user,
        
                 })
                 res.send(' hello user')

        } catch (error) {
            console.log(error);
            
        }
    }


  


    static getsingleuser = async(req, res) =>{
        try {
            
            const user = await UserModel.findById(req.params.id)
            res.satus (200).json({
                success: true,
                user,
            })

            // console.log(req.body);
        } catch (error) {
            console.log(error);
            
        }
    }
    
static updateprofile= async(req, res)=>{
    try {

        // console.log(req.body);
        // console.log(req.files.image)
        const { name, email, image } = req.body
        if (req.files) {
            const userImg = await UserModel.findById(req.user.id)

            const imgId = userImg.image.public_id
            await cloudinary.uploader.destroy(imgId)//for delete image
            const file = req.files.image;
            const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'profileimageapi'

            });
            console.log(imageUpload);
            var data = {
                name: name,
                email: email,
                image: {
                    public_id: imageUpload.public_id,
                    url: imageUpload.secure_url
                }

            }
            // console.log(imgId);
            //  console.log(userImg);


        } else {
            var data = {
                name: name,
                email: email,
            }

        }
        await UserModel.findByIdAndUpdate(req.user.id, data)
        res
        .status(201)
        .json({ satus: "success", message: "Registration Successfully 😄😄" });

        
        res.redirect('/profile')
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