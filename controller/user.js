const User = require('../models/user')
const Post = require('../models/post')

exports.myAccount = async (req, res) => {



    res.render('pages/profile/index')
}


exports.userPage = async (req, res) => {
    // Find the User
    const user = await User.findByPk(req.user.id, {
        include: [
            //show all models we want to show in api
            { model: User, as: 'Followers', through: { attributes: [] } },
            { model: User, as: 'Following', through: { attributes: [] } },
            { model: Post, as: 'Posts' ,attributes: { exclude: ['userId', 'createdAt', 'updatedAt',] } }
        ],


        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
})

//we make logic to show default image if user has no image
if (user.image === null) {
    user.image = 'http://localhost:4000/uploads/default.jpg'
}
else {
    user.image = `http://localhost:4000/uploads/${user.image}`
}

;
const userPosts = user.Posts.map(post => {
    return post.dataValues
})

// res.json(user )
res.render('pages/profile/singleProfile/index', { user , userPosts })

}


exports.followUser = async (req, res) => {

    try {

        const user = await User.findByPk(req.user.id)
        const followUser = await User.findByPk(req.params.id)
        if (!followUser) {
            return res.status(404).json({ message: "User not found" })
        }

        await user.addFollowing(followUser);

        return res.status(200).json("User followed successfully")

    } catch (error) {
        console.log("ERORR===>", error);
        return res.status(500).json({ message: "Internal server error" })
    }
}

exports.userFollowers = async (req, res) => {

    try {
        const user = await User.findByPk(req.user.id, {
            include: [
                { model: User, as: 'Followers', through: { attributes: [] } },
                { model: User, as: 'Following', through: { attributes: [] } }
            ]
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        return res.status(200).json(user)


    } catch (error) {
        console.log("ERORR===>", error);
        return res.status(500).json({ message: "Internal server error" })
    }
}


