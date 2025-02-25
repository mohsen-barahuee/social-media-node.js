const yup = require("yup")

exports.registerValidationSchema = yup.object({

    email: yup.string().email("Please Enter a valid email").required("Email is required"),
    username: yup.string().min(3, "Username must be at least 3 chars long").required("Username is required"),
    name: yup.string().min(3, "Username must be at least 3 chars long").max(50, "name cannot be more than 50 chars long").required("name is required"),
    password: yup.string().min(5, "Username must be at least 3 chars long").required("name is required")
})

