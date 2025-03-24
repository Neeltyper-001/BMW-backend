import mongoose from "mongoose";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { DB_NAME } from "../constants/db.constants.js";

const connectionToDb = async ()=>{
    try {
        console.log(`${process.env.CONNECTION_URI}/${DB_NAME}`)
        const connectionResponse = await mongoose.connect(`${process.env.CONNECTION_URI}/${DB_NAME}`);
        return new Promise((resolve,reject)=> (resolve(new ApiResponse(200,"Connection to database successful",connectionResponse.connection.host))))
    } catch (error) {
        return new Promise((resolve,reject)=>(reject(new ApiError(500, "Connection to the database failed",[error]))));
    }
}

export {connectionToDb}