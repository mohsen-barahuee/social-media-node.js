const User = require('../models/user')
const { Op } = require('sequelize')

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

exports.loginUser = async (req, res) => {

    try {

        const { identifire, password } = req.body
        const user = await User.findOne({
            raw: true,
            where: {
                [Op.or]: [
                    { email: identifire },
                    { userName: identifire }
                ],
                [Op.and]: [
                    { password }
                ]
            }
        })

        if (user === null) {
            return res.status(404).json({ message: "User not Founded !!" })
        }

        return res.status(200).redirect('/')



    } catch (error) {
        console.log(error);

        return res.status(500).json({ errorMessage: error })
    }

}


exports.login = (req, res) => {


    res.render('pages/auth/login')

}

exports.recovery = (req, res) => {
    res.render('pages/auth/recovery')
}