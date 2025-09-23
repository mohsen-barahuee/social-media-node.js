const jwt = require("jsonwebtoken")



module.exports = async (req, res, next) => {
    try {
        if (!req.headers.cookie) {
            return res.redirect('/login')
        }
        const user = req.headers.cookie.split("=")
        const verfiyedUser = jwt.verify(user[1], process.env.JWT_SECRET_KEY)
        

        req.user = verfiyedUser
        next()

    } catch (error) {
        return res.status(500).json(error)
    }
}