import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { Renter } from "../models/renterUser.js"
import { CarOwner } from "../models/carOwner.js"
import jwt from "jsonwebtoken";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js"
import { encryptData } from "../utils/encryptionAndDecryption.js";
import passport from "passport"
import { mailTransporter } from "../configs/mail.js"

import dotenv from 'dotenv';
dotenv.config();

const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await Renter.findById(userId)
        if(!user){
            const user = await CarOwner.findById(userId)
        }
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401,"unauthorized request",)
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await Renter.findById(decodedToken?._id)
        if(!user){
            const user = await CarOwner.findById(decodedToken?._id)
        }
    
        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }
    
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401,"Refresh token is expired or used")
            
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, newRefreshToken} = await generateAccessAndRefereshTokens(user._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200, 
                {accessToken, refreshToken: newRefreshToken},
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

});

const renterUserSignUp = asyncHandler(async (req, res) => {
    console.log("Request Body:", req.body);

    // 1. Validate required fields
    const requiredFields = [
        'fullName', 'username', 'email', 'contactNumber',
        'password', 'confirmPassword', 'dateOfBirth','role',
        'governmentId', 'governmentIdNumber', 'alternateContactNumber', 'residentialAddress', 'city', 'state', 'pinCode', 'paymentMethod',
        'emergencyfullName', 'relationship', 'emergencyContactNumber'
    ];

    for (const field of requiredFields) {
        if (!req.body[field]) {
            throw new ApiError(400, `${field} is required`);
        }
    }

    // 2. Check password match
    if (req.body.password !== req.body.confirmPassword) {
        throw new ApiError(400, "Password and confirm password do not match");
    }

    // 3. Validate username format
    const usernameRegex = /^[a-zA-Z0-9]{8,20}$/;
    if (!usernameRegex.test(req.body.username)) {
        throw new ApiError(400, 
            "Username must be 8-20 characters and alphanumeric");
    }

    // 4. Check for existing user in single query
    const existingUser = await Renter.findOne({
        $or: [
            { username: req.body.username },
            { email: req.body.email },
            { contactNumber: req.body.contactNumber }
        ]
    });

    if (existingUser) {
        const conflicts = [];
        if (existingUser.username === req.body.username) conflicts.push('username');
        if (existingUser.email === req.body.email) conflicts.push('email');
        if (existingUser.contactNumber === req.body.contactNumber) conflicts.push('contact number');
        
        throw new ApiError(409, 
            `Conflict on: ${conflicts.join(', ')} already exists`);
    }

    // Payment method ecnryption
    const paymentDetails = {
        paymentMethod: req.body.paymentMethod
    };

    switch(req.body.paymentMethod) {
        case 'Credit Card':
        case 'Debit Card':
            paymentDetails.paymentType = {
                accountHolderName: encryptData(req.body.accountHolderName),
                cardNumber: encryptData(req.body.cardNumber),
                expiryDate: encryptData(req.body.expiryDate),
                cvv: encryptData(req.body.cvv)
            };
            break;
            
        case 'Bank Account':
            paymentDetails.paymentType = {
                accountHolderName: encryptData(req.body.accountHolderName),
                accountNumber: encryptData(req.body.accountNumber),
                ifscCode: encryptData(req.body.ifscCode)
            };
            break;
            
        case 'UPI':
            paymentDetails.paymentType = {
                upiId: encryptData(req.body.upiId)
            };
            break;
            
        default:
            throw new ApiError(400, "Invalid payment method");
    }

    // 5. Handle file uploads
    const files = req.files || {};

    if (!files.drivingLicenseFrontImage?.[0] || !files.drivingLicenseBackImage?.[0]) {
        throw new ApiError(400, "Both driving license images are required");
    }

    if (!files.selfie?.[0]) {
        throw new ApiError(400, "Selfie image is required");
    }

    // Process selfie
    const [drivingLicenseFront, drivingLicenseBack, selfie] = await Promise.all([
        uploadOnCloudinary(files.drivingLicenseFrontImage[0]?.path),
        uploadOnCloudinary(files.drivingLicenseBackImage[0]?.path),
        uploadOnCloudinary(files.selfie[0]?.path)
    ]);
    
    // Verify successful uploads
    if (!drivingLicenseFront?.url || !drivingLicenseBack?.url) {
        throw new ApiError(500, "Failed to upload driving license images");
    }
    
    if (!selfie?.url) {
        throw new ApiError(500, "Failed to upload selfie");
    }

    // 6. Create new user object
    const newRenter = new Renter({
        fullName: req.body.fullName,
        username: req.body.username,
        email: req.body.email,
        contactNumber: req.body.contactNumber,
        password: req.body.password,
        dateOfBirth: req.body.dateOfBirth,
        role: req.body.role,
        Documents: {
            governmentId: req.body.governmentId,
            governmentIdNumber: req.body.governmentIdNumber,
            drivingLicenseFrontImage: drivingLicenseFront.url,
            drivingLicenseBackImage: drivingLicenseBack.url,
            selfie: selfie.url,
            alternateContactNumber: req.body.alternateContactNumber
        },
        addressPreferences: {
            residentialAddress: req.body.residentialAddress,
            city: req.body.city,
            state: req.body.state,
            pinCode: req.body.pinCode
        },
        paymentDetails,
        emergencyContact: {
            emergencyfullName: req.body.emergencyfullName,
            relationship: req.body.relationship,
            emergencyContactNumber: req.body.emergencyContactNumber
        }

    });

    // 7. Save user and generate tokens
    await newRenter.save();

    // 8. Generate tokens
    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(newRenter._id);

    // 9. Secure response
    const createdUser = await Renter.findById(newRenter._id).select(
        '-password -refreshToken -paymentDetails.cvv -governmentIdNumber'
    );

    // 10. Set cookies
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    };

    return res
        .status(201)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(new ApiResponse(
            201,
            { user: createdUser },
            "RenterUser registered successfully"
        ));
});

export { renterUserSignUp };

