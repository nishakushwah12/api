const CategoryModel = require('../models/Category')
var cloudinary = require('cloudinary').v2;
const bcrypt = require("bcrypt");


cloudinary.config({
    cloud_name: 'dk4ulehts',
    api_key: '563452817625954',
    api_secret: 'tMryYl6JihhF7F6vE2RKBwBghzg'
});


class CategoryController {

    static categoryinsert = async (req, res) => {
        try {
            const {cname, image}= req.body
            const file = req.files.image
            const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'categoryimage'
            })
            const result = new CategoryModel({
                cname: cname,
                image: {
                    public_id: imageUpload.public_id,
                    url: imageUpload.secure_url,
                }
            })

            // console.log(req.body);
            await result.save()
            res
            .status(201)
                .json({ status: "success", message: "category insert successfully 🤗😀" })

        } catch (error) {
            console.log(error);

        }


    }

static categorydisplay = async(req, res)=>{
    try {
        const category = await CategoryModel.find()
        res
            .status(201)
                .json({ status: "success", 
                message: "category display successfully 🤗😀",
                category,
             })
        // console.log(category);

    } catch (error) {
        console.log(error);
        
    }
}

static categoryview = async(req, res)=>{
    try {
        const category= await CategoryModel.findById(req.params.id)
        res
        .status(201)
            .json({ status: "success", 
            message: "category view successfully 🤗😀",
            category,
         })
       
    } catch (error) {
        console.log(error);
        
    }
}


static categoryUpdate = async(req, res)=>{
    try {
        
        const category= await CategoryModel.findByIdAndUpdate(req.params.id)
        res
        .status(201)
            .json({ status: "success", 
            message: "category update successfully 🤗😀",
            category,
         })
       
    } catch (error) {
        
        console.log(error);
        
    }
}
static categoryDelete = async(req, res)=>{
    try {
        
        const category = await CategoryModel.findByIdAndDelete(req.params.id)
        // console.log(req.body);
        res
        .status(201)
            .json({ status: "success", 
            message: "category delete successfully 🤗😀",
            category,
         })
    } catch (error) {
        console.log(error);
        
    }
}



}
module.exports = CategoryController