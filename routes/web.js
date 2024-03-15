const express = require('express')
const UserController = require('../controllers/UserController')
const CategoryController = require('../controllers/CategoryController')
const ProductController = require('../controllers/ProductController')
const router = express.Router()

//usercontroller
router.get('/getalluser', UserController.getalluser)
router.post('/userinsert', UserController.userinsert)
router.post('/verifylogin', UserController.verifylogin)
router.get('/logout', UserController.logout)
router.post('/changepassword', UserController.changepassword)
router.get('/getuserdetails/:id', UserController.getuserdetails)
router.get('/getsingleuser/:id', UserController.getsingleuser)
router.post('/updateprofile', UserController.updateprofile)
router.get('/bloguser', UserController.bloguser)

//category controller
router.post('/categoryinsert', CategoryController.categoryinsert)
router.get('/categorydisplay', CategoryController.categorydisplay)
router.get('/categoryview', CategoryController.categoryview)

router.post('/categoryupdate', CategoryController.categoryupdate)
router.get('/categorydelete', CategoryController.categorydelete)

//product controller
router.post('/createproduct', ProductController.createproduct)
router.get('/getallproduct', ProductController.getallproduct)
router.get('/getallproductdetail/:id',ProductController.getallproductdetail)
 router.post('/productupdate/:id', ProductController.productupdate)



module.exports = router