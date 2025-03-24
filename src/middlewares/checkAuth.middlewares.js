import { ApiError } from "../utils/apiError.js"

export const checkAuth = (req, res, next)=>{

    req.user ? next() : (()=>{console.log("user not logged in"); throw new ApiError(401,"Not authorized")})()
}