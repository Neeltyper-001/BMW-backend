import express from "express"
import passport from "passport";
import { isAuthenticated } from "../middlewares/checkAuth.middlewares.js";
import {renterUserSignUp } from "../controllers/auth.controllers.js";
import {upload} from "../middlewares/multer.middleware.js"
export const authRouter = express.Router();

authRouter.route("/renter/signup").post(
    upload.fields([
        {
            name:"drivingLicenseFrontImage",
            maxCount:1
        },
        {
            name:"drivingLicenseBackImage",
            maxCount:1
        },
        {
            name:"selfie",
            maxCount:1
        }
    ]),
    renterUserSignUp
);


// authRouter.route('/').get((req,res)=>res.send(`<a href="/auth/google" >Click here</a>`))
// authRouter.route('/auth/google').get(passport.authenticate('google',{scope: ['email', 'profile']}))
// authRouter.route('/auth/google/callback').get(passport.authenticate('google',{
//     successRedirect: '/protected',
//     failureRedirect: '/auth/failure',
// }))
// authRouter.route('/protected').get(isAuthenticated,resource)
// authRouter.route('/auth/failure').get(failureRedirect)
// // authRouter.route('/test-mail').get(sendMyMail)