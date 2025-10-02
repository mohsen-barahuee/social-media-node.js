const User = require('../models/user')
const { Op } = require('sequelize')
const bycrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')

// * Showing Ui in Template Enjine
exports.signup = (req, res) => {
    res.render('pages/auth/register')
}

exports.signUpUser = async (req, res) => {

    try {
        // GET DATA FROM REQUEST BODY
        const { fullName, userName, email, password } = req.body

        //HASHING PASSWORD WITH BYCRYPTJS PACKAGE
        const hashedPassword = await bycrypt.hash(password, 12)

        //CREATE DATA IN DATABASE
        const user = await User.create({
            fullName, userName, email, password: hashedPassword,
        })

        //GENERATE TOKEN WITH JSONWEBTOKEN PACKAGE
        const token = jwt.sign({ id: user.id, email: user.email, image: 'http://localhost:4000/uploads/default.jpg', userName: user.userName }, process.env.JWT_SECRET_KEY)

        //CREATE COOKIE IN RESPONSE AND HEADERS FOR AUTHENTICATION
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 365,
        })
        //REDIRECT USER AFTER LOGIN
        res.status(201).redirect('/')

    } catch (error) {
        //ERORR HANDLING
        console.log("ERROR ===>", error);
        return res.status(500).json("Server ERROR")
    }


}

exports.loginUser = async (req, res) => {

    try {
        //GET DATA FROM REQUEST BODY
        const { identifire, password } = req.body

        //FIND ONE USER WITH identifire DATA
        const user = await User.findOne({
            raw: true,
            where: {
                [Op.or]: [
                    { email: identifire },
                    { userName: identifire }
                ]
            }
        })
        // verify password
        const verifyPassword = await bycrypt.compare(password, user.password)

        //REDIRECTING USER TO LOGIN IF ACCOUNT DONT EXIST
        if (user === null || !verifyPassword) {
            return res.status(404).redirect('/login')
        }

        //GENERATE3 TOKEN IF USER EXITS
        const token = jwt.sign({ id: user.id, email: user.email, userName: user.userName }, process.env.JWT_SECRET_KEY)

        //MAKE COOKIE FOR USER
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 365,
        })

        res.status(302).redirect('/')



    } catch (error) {
        //ERORR HANDLING
        console.log(error);
        return res.status(500).json('Server Erorr')
    }

}
exports.recoveryUser = async (req, res) => {
    try {
        //GETING DATA FROM REQUEST BODY
        const { identifire } = req.body

        //FIND USER WHERE EMAIL OR USERNAME = idenifire
        const user = await User.findOne({
            raw: true,
            where: {
                [Op.or]: [
                    { email: identifire },
                    { userName: identifire }
                ]
            }
        })

        //REDIRECTING USER TO RECOVERY IF DONT EXIST
        if (user === null) {
            return res.status(404).redirect('/recovery')
        }

        //GENERATE RANDOM PASSWORD
        const newPassword = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
        const hashedPassword = await bycrypt.hash(newPassword, 12)

        //UPDATING USER PASSWORD
        const resetPassword = await User.update({ password: hashedPassword }, {
            where: {
                id: user.id
            }
        })
        // Create a test account or replace with real credentials.
        const transporter = nodemailer.createTransport({

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

        //REDIRECTING USER AFTER SENDING CODE
        return res.status(200).redirect('/login')

    } catch (error) {
        //ERORR HANDELING
        console.log("Server Error -->", error);
        res.status(500).json("server Error!!")
    }
}

exports.login = (req, res) => {
    //PAGE UI
    res.render('pages/auth/login')

}

exports.recovery = (req, res) => {
    //PAGE UI
    res.render('pages/auth/recovery')
}



