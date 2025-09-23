const jwt = require("jsonwebtoken")



module.exports = async (req, res, next) => {
    try {
        // CHECKING FOR COOKIES IN REQUEST HEADER
        if (!req.headers.cookie) {
            return res.redirect('/login') //IF COOKIE DOSEN'T EXIST REDIRECT USER TO LOGIN
        }
        
        const user = req.headers.cookie.split("=") //GETING USER COOKIE VALUE 
        const verfiyedUser = jwt.verify(user[1], process.env.JWT_SECRET_KEY) //DECODE COOKIE WITH JWT 

        req.user = verfiyedUser //SENDING USER DATA TO NEXT REQUEST
        next() //GOING TO NEXT CONTROLLER

    } catch (error) {
        // HANDLING ERROR
        console.log("ERORR ===>",error);
        return res.status(500).json("Server ERROR")
    }
}