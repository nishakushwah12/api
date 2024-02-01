const UserModel = require('../models/User')

const bcrypt = require('bcrypt');

var cloudinary = require('cloudinary').v2;

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
                    .json({ status: "faild", message: "this email already exite 😌" });

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
                        res.redirect('/')
                        res.status(201).json({
                            status: "success",
                            message: "Registraion successfully 😃 😊",

                        });

                    }

                }

                res
                    .status(401)
                    .json({ status: "faild", message: "all field required 😌" });



            }


        } catch (error) {
            console.log(error);

        }

    }

}
module.exports = UserController