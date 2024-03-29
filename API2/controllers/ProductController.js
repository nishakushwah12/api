const ProductModel= require('../models/Product');
var cloudinary = require('cloudinary').v2;
const bcrypt = require("bcrypt");


cloudinary.config({
    cloud_name: 'dk4ulehts',
    api_key: '563452817625954',
    api_secret: 'tMryYl6JihhF7F6vE2RKBwBghzg'
});

class ProductController {
    static getAllProducts = async(req,res) => {
        try{
            const allProducts = await ProductModel.find()
            res.status(200).json({
                success: true,
                allProducts
            })
        }catch(err){
            res.send(err)
        }
    }
    static getProductDetail = async(req,res) => {
        try{
            const productDetail = await ProductModel.findById(req.params.id)
            res.status(200).json({
                success: true,
                productDetail
            })
        }catch(err){
            res.send(err)
        }
    }
    static getAdminProduct = async(req,res) => {
        try{
            const data = await ProductModel.find()
            res.status(200).json({
                success: true,
                data
            })
        }catch(err){
            res.send(err)
        }
    }
    static deleteProduct = async(req,res) => {
        try{
            const data = await ProductModel.findByIdAndDelete(req.params.id)
            res
            .status(200)
            .send({ status: "success", message: "Product deleted successfully 😃🍻"});
        }catch(err){
            res.send(err)
        }
    }


    static createProduct = async(req,res) => {
        try{
            //  console.log(req.body)
            //  console.log(req.files)
            const file = req.files.images
            const myCloud = await cloudinary.uploader.upload(file.tempFilePath,{
                folder : 'userImage'
            })

            const {name, description, price, stock, rating, category} = req.body
            const data = new ProductModel({
                name: name,
                description: description,
                price: price,
                stock: stock,
                rating: rating,
                category: category,
                images: {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                },
            })
            const insertedData = await data.save()
            // console.log(insertedData);
            res
            .status(201)
            .json({ status: "success", message: "Product added Successfully 😃🍻",insertedData});
        }catch(err){
            res.send(err)
        }
    }


    static updateProduct = async(req, res)=>{
try {
    
} catch (error) {
    res.send(error)
    
}
    }


}
module.exports = ProductController