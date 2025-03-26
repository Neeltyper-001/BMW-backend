import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import { authRouter } from "./routes/user.routes.js";
import { globalErrorHandler } from "./utils/globalErroHandler.js";
import "./configs/auth.js";

// Load environment variables
dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.ALLOWED_ORIGIN || "http://localhost:3000", // Default to localhost
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
}));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === "production" } // Only secure in production
}));

app.use((req, res, next) => {
  console.log("🔥 Incoming Request:");
  console.log("Headers:", req.headers);
  console.log("Method:", req.method);
  console.log("Body:", req.body);
  next();
});


app.use(express.json()); // Order matters!
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1/users", authRouter);

// Global error handler should be last!
app.use(globalErrorHandler);

export { app };




// import express from "express";
// import cors from "cors"
// import cookieParser from "cookie-parser";
// import session from "express-session";
// import passport from "passport";
// import { authRouter } from "./routes/user.routes.js";
// import './configs/auth.js'
// import { globalErrorHandler } from "./utils/globalErroHandler.js";

// const app = express();
// app.use(cors({
//     origin: process.env.ALLOWED_ORIGIN,
//     methods:["GET","POST","PUT","DELETE","PATCH"],
//     credentials: true
// }))

// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
// }))

// app.use(express.static("public"));
// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: true }
// }))
// app.use(passport.initialize())
// app.use(passport.session())

// app.use(express.json())
// app.use(express.urlencoded({extended: true}))
// app.use(cookieParser())
// app.use(globalErrorHandler)
// app.use("/api/v1/users", authRouter)


// export{app}