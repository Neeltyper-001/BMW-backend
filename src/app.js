import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import { authRouter } from "./routes/user.routes.js";
import './configs/auth.js'
import { globalErrorHandler } from "./utils/globalErroHandler.js";

const app = express();
app.use(cors({
    origin: process.env.ALLOWED_ORIGIN,
    methods:["GET","POST","PUT","DELETE","PATCH"],
    credentials: true
}))

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))

app.use(express.static("public"));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(globalErrorHandler)
app.use(authRouter)


export{app}