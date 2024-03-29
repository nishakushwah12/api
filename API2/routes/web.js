const express = require('express')
const UserController = require('../controllers/UserController')
const { ChangeUserAuth } = require('../middleware/auth')
 const CategoryController = require('../controllers/CategoryController')
 const ProductController = require('../controllers/ProductController')

const router= express.Router()

// usercontroller
router.get('/getalluser', UserController.getalluser)
router.post('/userinsert', UserController.userinsert)
router.post('/verifyLogin', UserController.loginUser)
router.get('/logout', UserController.logout)
router.post('/updatePassword', ChangeUserAuth, UserController.updatePassword)
router.get('/admin/getUser/:id', UserController.getSingleUser)
router.post('/updateProfile', ChangeUserAuth, UserController.updateProfile)
router.get('/me', ChangeUserAuth, UserController.getUserDetail)
router.delete('/admin/deleteUser/:id', UserController.deleteUser)
// CategoryController

router.post('/categoryinsert', CategoryController.categoryinsert)
router.get('/categoryDisplay', CategoryController.categorydisplay)
router.get('/categoryView/:id', CategoryController.categoryview)

router.post('/categoryUpdate/:id', CategoryController.categoryUpdate)
router.delete('/categoryDelete/:id', CategoryController.categoryDelete)
// 
router.get('/products', ProductController.getAllProducts)

router.get('/getProductDetail/:id', ProductController.getProductDetail)
router.get('/product/getAdminProduct', ProductController.getAdminProduct)
router.get('/product/deleteProduct', ProductController.deleteProduct)
router.post('/product/create', ProductController.createProduct)



module.exports = router