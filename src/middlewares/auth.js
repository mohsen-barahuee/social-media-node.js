const jwt = require('jsonwebtoken')
const userModel = require('../models/user')


module.exports = async (req, res, next) => {

    try {

        const token = req.cookies['token'];
        
    
        if (!token) {

            return res.json({ message: "Please login First" })
        }

        const payload = jwt.verify(token,process.env.JWT_SECRET)
        console.log(payload)


    } catch (error) {
        next(error)
    }

}
