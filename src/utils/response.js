// Helper function to format success response
const successResponse = (res, statusCode = 200, data) => {
    return res.status(statusCode).json({ status: statusCode, success: true, data })

}




// Helper function to format error response
const errorResponse = (res, statusCode, data) => {
    return res.status(statusCode).json({ status: statusCode, success: true, data })

}


module.exports = { successResponse, errorResponse }