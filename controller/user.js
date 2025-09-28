const User = require('../models/user')

exports.followUser = async (req, res) => {

    try {

        const user = await User.findByPk(req.user.id)
        const followUser = await User.findByPk(req.params.id)
        if (!followUser) {
            return res.status(404).json({ message: "User not found" })
        }

        await user.addFollowing(followUser);

        return res.status(200).json(followUser)

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
    }   }