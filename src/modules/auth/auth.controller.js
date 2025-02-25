const userModel = require("../../models/user")
const RefreshToken = require('../../models/RefreshToken')
const { errorResponse, successResponse } = require("../../utils/response")
const { registerValidationSchema } = require('./auth.validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.register = async (req, res, next) => {

    try {
        const { email, username, name, password } = req.body

        // Validation
        await registerValidationSchema.validate({ email, username, name, password }, {
            abortEarly: false,
        })

        const isUserExist = await userModel.findOne({ $or: [{ username }, { email }] })

        if (isUserExist) {
            // req.flash("error", "Email Or Username is already exist !!")
            // return res.redirect("/auth/register")
            return errorResponse(res, 400, "Email Or Username is already exist !!")
        }

        const isFirstUser = (await userModel.countDocuments()) === 0

        let role = "USER"

        if (isFirstUser) {
            role = 'ADMIN'
        }

        let user = new userModel({ email, username, password, name })
        user = await user.save()

        const accessToken = jwt.sign({ userID: user._id }, process.env.JWT_SECRET, {
            expiresIn: "30day"
        })

        const refreshToken = await RefreshToken.createToken(user)


        res.cookie("token", accessToken, {
            maxAge: 900_000,
            httpOnly: true
        })
        res.cookie("refreshToken", refreshToken, {
            maxAge: 900_000,
            httpOnly: true
        })

        return successResponse(res, 201, {
            message: "User Created Successfully :)) ",
            user: { ...user.toObject(), password: undefined }
        })

    } catch (error) {
        next(error)
    }

}


exports.showRegisterView = async (req, res) => {

    return res.render('auth/register')

}


exports.showLoginView = async (req, res) => {

    return res.render('auth/login')

}
exports.login = async (req, res, next) => {

    try {
        const { email, password } = req.body

        // validation

        const user = await userModel.findOne({ email }).lean()

        if (!user) {
            return errorResponse(res, 400, "Email Or Username is not correct !!")
        }

        const isPasswordCorrct = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrct) {
            return errorResponse(res, 400, "password is not correct !!")
        }
        
        const accessToken = jwt.sign({ userID: user._id }, process.env.JWT_SECRET, {
            expiresIn: "30day"
        })

        const refreshToken = await RefreshToken.createToken(user)


        res.cookie("token", accessToken, {
            maxAge: 900_000,
            httpOnly: true
        })
        res.cookie("refreshToken", refreshToken, {
            maxAge: 900_000,
            httpOnly: true
        })

        return successResponse(res, 201, {
            message: "Login is successfull :)) ",
            user: { ...user.toObject(), password: undefined }
        })




    } catch (error) {
        next()
    }

}


