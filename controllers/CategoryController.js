const CategoryModel = require('../models/Category');
const bcrypt = require('bcrypt');

var cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dk4ulehts',
    api_key: '563452817625954',
    api_secret: 'tMryYl6JihhF7F6vE2RKBwBghzg'
})

class CategoryController{
  static categoryinsert  = async (req, res) => {

    try {
        
        const {cname, image}= req.body
        const file= req.files.image
        const image_Upload = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: 'categoryimage'
        })
        const result = new CategoryModel({
            cname: cname,
            image: {
                public_id: image_Upload.public_id,
                url: image_Upload.secure_url
            }
        })
   
    //console.log(req.body);
    await result.save()
    res.status(201)
    .json({status:"success", message:"Category insert successfully 😄😄"})
    


    } catch (error) {
        console.log(error);
        
    }
  
}

    static categorydisplay  = async (req, res) => {

    try {
        const category = await CategoryModel.find()
       // console.log(category);
        res.status(201)
    .json({
        status:'success', 
        message:'successfully ',
        category,
    })
    

    } catch (error) {
        console.log(error);
        
    }
}
   

static categoryview = async(req, res)=>{
    try {
       // console.log(req.parms.id);
       const category = await CategoryModel.findById(req.params.id)
       res.status(201)
       .json({
           status:'success', 
           message:'successfully ',
           category,
       })
    } catch (error) {
        console.log(error);
        
    }
}
static categoryupdate = async(req, res)=>{
    try {
        const category= await CategoryModel.findByIdAndUpdate(req.params.id )

        res.status(201)
       .json({
           status:'success', 
           message:' update successfully ',
           category,
       })
         // console.log(req.params.id);

    } catch (error) {
        console.log(error);
        
    }
}
static categorydelete = async(req, res)=>{
    try {
         //console.log(req.params.id);
      const category= await CategoryModel.findByIdAndDelete(req.params.id )

      
      res.status(201)
      .json({
          status:'success', 
          message:' delete successfully ',
          category,
      })
        
    } catch (error) {
        console.log(error);
        
    }
}
}
module.exports = CategoryController



