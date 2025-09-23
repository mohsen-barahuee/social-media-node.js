const Post = require('../models/post')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


exports.page = (req, res) => {
    res.render('pages/posts/postUpload')
}

exports.uploadPost = async (req, res) => {
    


    const post = await Post.create({
        description: req.body.description,
        image: req.file.filename,
        hashTags: req.body.hashTags,
        userId: req.user.id
    })


    res.json("post")
}

exports.getAllPosts = async (req, res) => {
    const posts = await Post.findAll({

        include: {
            model: User,
            attributes: ['fullName', 'userName']
        },
        attributes: { exclude: ['updatedAt', 'createdAt', 'userId'] },

        raw: true,
        nest: true
    })
    

    res.json(posts)

}