const User = require('../models/user')

// * Showing Ui in Template Enjine
exports.signup = (req, res) => {
    res.render('pages/auth/register')
}

exports.signUpUser = async (req, res) => {

    try {

        const { fullName, userName, email, password } = req.body
        

        const user = await User.create({
            fullName,
            userName,
            email,
            password,
        })

        res.redirect('/')

    } catch (error) {
        res.status(500).json("DB Error" + error)
    }



}




exports.login = (req, res) => {

    res.render('pages/auth/login')

}

exports.recovery = (req, res) => {
    res.render('pages/auth/recovery')
}