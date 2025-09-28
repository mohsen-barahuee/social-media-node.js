const Post = require('../models/post')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


exports.page = (req, res) => {
    res.render('pages/posts/postUpload')
}

exports.uploadPost = async (req, res) => {

    try {
        // GETTING DATA FROM REQUEST BODY
        const { description } = req.body

        // CREATE DATA IN DATABASE
        const post = await Post.create({
            description,
            image: `http://localhost:4000/uploads/${req.file.filename}`,
            userId: req.user.id
        })

         res.redirect('/')

    } catch (error) {
        // ERROR HANDLER
        console.log("ERORR ===> ", error);
        return res.stauts(500).redirect('/post-upload')
    }

}

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({

            include: {
                model: User,
                attributes: ['fullName', 'userName','image']
            },
            attributes: { exclude: ['updatedAt', 'createdAt', 'userId'] },

            raw: true,
            nest: true
        })


        return res.status(200).json(posts)
    } catch (error) {
        console.log("ERORR ===>", error);

        return res.status(500).json("Server ERORR!!!")
    }

}