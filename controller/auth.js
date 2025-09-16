const User = require('../models/user')
const { Op, where } = require('sequelize')
const nodemailer = require('nodemailer')

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
exports.recoveryUser = async (req, res) => {
    try {
        const { identifire } = req.body

        const user = await User.findOne({
            raw: true,
            where: {
                [Op.or]: [
                    { email: identifire },
                    { userName: identifire }
                ]
            }
        })

        if (user === null) {
            return res.status(404).json("Not Found")
        }

        const newPassword = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
        const resetPassword = await User.update({ password: newPassword }, {
            where: {
                id: user.id
            }
        })
        // Create a test account or replace with real credentials.
        const transporter = nodemailer.createTransport({
            // host: "live.smtp.mailtrap.io",
            // port: 587,
            // secure: false, // true for 465, false for other ports
            service: "gmail",
            auth: {
                user: "mohsenbrh657@gmail.com",
                pass: "mvra dfzw iobo zjss",
            },
        });

        // Wrap in an async IIFE so we can use await.
        (async () => {
            const info = await transporter.sendMail({
                from: 'mohsenbrh657@gmail.com',
                to: user.email,
                subject: "RealState Reset Password",
                // text: "Password Reset Code", // plain‑text body
                html: `<h1>New Password : ${newPassword}</h1>`, // HTML body
            });
            console.log("Message sent:", info.messageId);
        })();


        return res.status(200).redirect('/login')

    } catch (error) {
        console.log("Server Error -->", error);
        res.status(500).json("server Error!!")
    }
}

exports.login = (req, res) => {


    res.render('pages/auth/login')

}

exports.recovery = (req, res) => {
    res.render('pages/auth/recovery')
}

