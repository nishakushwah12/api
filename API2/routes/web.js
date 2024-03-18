const express = require('express')
const UserController = require('../controllers/UserController')
const { ChangeUserAuth } = require('../middleware/auth')

const router= express.Router()

// usercontroller
router.get('/getalluser', UserController.getalluser)
router.post('/userinsert', UserController.userinsert)
router.post('/verifyLogin', UserController.loginUser)
router.get('/logout', UserController.logout)
router.post('/updatePassword', ChangeUserAuth, UserController.updatePassword)

module.exports = router