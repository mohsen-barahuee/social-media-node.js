const userModel = require("../../models/user")
const { errorResponse, successResponse } = require("../../utils/response")
const { registerValidationSchema } = require('./auth.validator')


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