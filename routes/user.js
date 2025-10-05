const express = require('express')
const router = express.Router()
const userController = require('../controller/user')
const authChecker = require('../middleware/auth')



router.route('/my-account')
    .get(authChecker, userController.myAccount)
    .post(authChecker, userController.updateProfile)

router.route('/view-page')
    .get(authChecker, userController.userPage)

router.route('/follow/:id')
    .get(authChecker, userController.followUser)



module.exports = router