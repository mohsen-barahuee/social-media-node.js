const User = require('../models/user')
const Post = require('../models/post')

exports.myAccount = async (req, res) => {

    res.render('pages/profile/index')
}

exports.userPage = async (req, res) => {


    // Find the User
    const user = await User.findByPk(req.query.user, {
        include: [
            //show all models we want to show in api
            { model: User, as: 'Followers', through: { attributes: [] } },
            { model: User, as: 'Following', through: { attributes: [] } },
            { model: Post, as: 'Posts', attributes: { exclude: ['userId', 'createdAt', 'updatedAt',] } }
        ],
        //dont show this attributes in api
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
    })

    //we make logic to show default image if user has no image
    if (user.image === null) {
        user.image = 'http://localhost:4000/uploads/default.jpg'
    }
    else {
        user.image = `http://localhost:4000/uploads/${user.image}`
    }

    //send user posts to the template engine
    const userPosts = user.Posts.map(post => {
        return post.dataValues
    })

    res.render('pages/profile/singleProfile/index', { user, userPosts })

}

exports.followUser = async (req, res) => {

    try {
        // Find the user to be followed
        const user = await User.findByPk(req.user.id)
        // Check if the user exists
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        // find the user to following
        const followUser = await User.findByPk(req.params.id)
        if (!followUser) {
            return res.status(404).json({ message: "User not found" })
        }
        // Check if the user is trying to follow themselves
        await user.addFollowing(followUser);

        return res.status(200).json("User followed successfully")

    } catch (error) {
        //error handling
        console.log("ERORR===>", error);
        return res.status(500).json({ message: "Internal server error" })
    }
}


