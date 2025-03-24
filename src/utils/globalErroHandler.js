export const globalErrorHandler = (err,req ,res, next)=>{

    try {
        throw new ApiError(500,"The error exists", [err])
    } catch (error) {
            res.status(error.statusCode).json(new ApiResponse(error.statusCode,err.message,err))
    }
}