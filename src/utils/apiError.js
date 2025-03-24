class ApiError extends Error{

    constructor(
        statusCode,
        message = "something went wrong (default error)",
        errors = [],        
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors
    }
}

export {ApiError}