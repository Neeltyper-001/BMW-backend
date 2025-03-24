import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import passport from "passport"
import { mailTransporter } from "../configs/mail.js"

const resource = 
    (req, res )=>{
        console.log(req.user)
        res.send("Successfully Logged In")
    }

const failureRedirect =  (req,res)=>{
     console.log("failure redirect")     
}



export {resource , failureRedirect}

