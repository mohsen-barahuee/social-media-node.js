const express = require('express')
const router = express.Router()
const authController = require('../controller/auth')
const authChecker = require('../middleware/auth')


router.route('/signup')
    .get(authController.signup)
    .post(authController.signUpUser)


router.route('/login')
    .get(authController.login)
    .post(authController.loginUser)

router.route('/recovery')
    .get(authController.recovery)
    .post(authController.recoveryUser)



module.exports = router

