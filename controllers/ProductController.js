const ProductModel = require('../models/Product')
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dk4ulehts',
    api_key: '563452817625954',
    api_secret: 'tMryYl6JihhF7F6vE2RKBwBghzg'
})


class ProductController {


    static createproduct = async (req, res) => {
        try {
            // console.log(req.body);

            const { name, description, price, image, category, stock } = req.body
            const file = req.files.image
            const image_Upload = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'productimage'
            })
            const result = new ProductModel({
                name: name,
                description: description,
                price: price,
                category: category,
                stock: stock,
                image: {
                    public_id: image_Upload.public_id,
                    url: image_Upload.secure_url
                },


            })
            await result.save()
            res.status(201).json({
                status: 'success',
                message: 'product inserted successfully',
            });


        } catch (error) {
            console.log(error);

        }
    }



    static getallproduct = async (req, res) => {
        try {
            const product = await ProductModel.findById(req.params.id)
            res.status(201).json({
                status: 'success',
                message: 'successfull',
                product,
            })
        } catch (error) {
            console.log(error);

        }

    }

    static getallproductdetail = async (req, res) => {

        try {

            //  console.log(req.params.id);
            const product = await ProductModel.findById(req.params.id)
            res.status(201).json({
                status: 'success',
                message: 'successfull',
                product,
            })
        } catch (error) {
            console.log(error);

        }
    }


    static productupdate = async (req, res) => {

        try {
            const product = await ProductModel.findByIdAndUpdate(req.params.id)
            res.status(201)
                .json({
                    status: 'success',
                    message: 'proudct update successfully',
                    product,
                })
            res.send('hyy')

        } catch (error) {
            console.log(error);

        }
    }




}




module.exports = ProductController