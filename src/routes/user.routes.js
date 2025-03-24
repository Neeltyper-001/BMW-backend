import express from "express"
import passport from "passport";
import { checkAuth } from "../middlewares/checkAuth.middlewares.js";
import {resource,failureRedirect } from "../controllers/auth.controllers.js";
export const authRouter = express.Router();



authRouter.route('/').get((req,res)=>res.send(`<a href="/auth/google" >Click here</a>`))
authRouter.route('/auth/google').get(passport.authenticate('google',{scope: ['email', 'profile']}))
authRouter.route('/auth/google/callback').get(passport.authenticate('google',{
    successRedirect: '/protected',
    failureRedirect: '/auth/failure',
}))
authRouter.route('/protected').get(checkAuth,resource)
authRouter.route('/auth/failure').get(failureRedirect)
// authRouter.route('/test-mail').get(sendMyMail)