const userModel = require("../../models/user")
const { errorResponse, successResponse } = require("../../utils/response")


exports.register = async (req, res) => {

    try {
        const { email, username, name, password } = req.body

        // Validation
        const isUserExist = await userModel.findOne({ $or: [{ username }, { email }] })

        if (isUserExist) {
            return errorResponse(res, 400, "Email Or Username is already exist !!")
        }

        const isFirstUser = (await userModel.countDocuments()) === 0

        let role = "USER"

        if (isFirstUser) {
            role = 'ADMIN'
        }

        const user = new userModel({ email, username, password, name })
        user = await user.save()

        return successResponse(res, 201, {
            message: "User Created Successfully :)) ",
            user: { ...user, password: undefined }
        })

    } catch (error) {
        next(error)
    }

}