const express = require('express')
const router = express.Router()
const postController = require('../controller/post')
const upload = require('../middleware/upload')

router.route('/post-upload')
    .get(postController.page)
    .post(upload.single("image"), postController.uploadPost)

router.route('/posts').get(postController.getAllPosts)


module.exports = router