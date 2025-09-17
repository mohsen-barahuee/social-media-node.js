const Post = require('../models/post')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

exports.page = (req, res) => {
    res.render('pages/posts/postUpload')
}

exports.uploadPost = async (req, res) => {
    const user = req.headers.cookie.split("=")
    const verfiyedUser = jwt.verify(user[1], process.env.JWT_SECRET_KEY)
    // console.log(verfiyedUser.id);


    const post = await Post.create({
        description: "safsafasfasffasfas",
        image: req.file.filename,
        creator: verfiyedUser.id
    })

    // console.log(req.file.filename);

    res.json("ok")
}

exports.getAllPosts = async (req, res) => {
    const posts = await Post.findAll({
        include: [User]
    })
    console.log(posts);

    res.json(posts)

}