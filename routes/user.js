const express = require('express')
const router = express.Router()
const userController = require('../controller/user')
const authChecker = require('../middleware/auth')



router.route('/my-account')
    .get(authChecker, userController.myAccount)

router.route('/user-page')
    .get(authChecker, userController.userPage)

router.route('/follow/:id')
    .post(authChecker, userController.followUser)



module.exports = router