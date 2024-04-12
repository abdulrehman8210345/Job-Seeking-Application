export const errorObject=(message,statusCode)=>({
    message:message,
    statusCode:statusCode
})

export const errorHandler = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    switch (err.name) {
        case "caseError":
            err = errorObject(`Resource not found. Invalid ${err.path}`, 400);
            break;
        case 11000:
            err = errorObject(`Duplicate Key ${err.keyValue} already exists`, 400);
            break;
        case "jsonWebTokenError":
            err = errorObject("Invalid Token. Please login again", 400);
            break;
        case "TokenExpiredError":
            err = errorObject("Token Expired. Please login again", 400);
            break;
        // default:
        //     // Log unexpected errors
        //     console.error(err);
    }

    return res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};
