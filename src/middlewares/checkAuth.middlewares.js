import {Renter} from "../models/renterUser.js";
import {CarOwner} from "../models/carOwner.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const isAuthenticated = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if (!token)
        return res.status(404).json({
            success: false,
            message: "Login First",
        });

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        let user = await Renter.findById(decodedToken?._id).select("-password -refreshToken");

        if (!user) {
            user = await CarOwner.findById(decodedToken?._id).select("-password -refreshToken");
        }
        
        if (!user) {    
        throw new ApiError(401, "Invalid Access Token")
        }
        
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
});
export { isAuthenticated };

