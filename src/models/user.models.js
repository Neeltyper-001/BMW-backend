import {mongoose,Schema} from "mongoose";
import bcrypt from "bcrypt";

// const userSchema = new Schema({
//     fullName: {
//         type: String,
//         required: [true, "Full name is required"],
//         trim: true,
//     },

//     dob: {
//         type: Date,
//         required: [true, "Date of birth is required"],
//     },

//     username: {
//         type: String,
//         required: [true, "Username is required"],
//         lowercase: true,
//         trim: true, 
//         index: true,
//         unique: true,
//     },

//     mobile: {
//         type: Number,
//         required: [true, "Mobile number is required"],
//         unique: true,
//     },

//     email:{
//         type: String,
//         required: [true,'Email is required'],
//         unique: true,
//         lowercase: true,
//         validate: {
//             validator: function(email){
//                 return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email);                
//             },
//             message: "Invalid email format"
//         }
//     },

//     password:{
//         type: String,    
//         required: [true, 'Password is required'],
//         select:false, 
//     },

//     role: {
//         type: String,
//         enum: ["admin","user"],
//         default: "user"
//     },
    
//     profilePhoto:{
//         type: String
//     },
// },
// {
//     timestamps: true,
// },)

//Renter (Customer) Schema

const renterUserSchema = new Schema({
    fullName: {
        type: String,
        required: [true, "Full name is required"],
    },

    username: {
        type: String,
        required: [true, "Username is required"],
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        validate: {
            validator: function(email){
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email);
            },
            message: "Invalid email format"
        }
    },

    mobileNumber: {
        type: String,
        required: [true, "Mobile number is required"],
        unique: true,
    },

    password : {
        type: String,
        required: [true, "Password is required"],
    },

    dateOfBirth: {
        type: Date,
        required: [true, "Date of birth is required"],
    },

    governmentId: {
        type: String,
        enum: ["Aadhar Card", "PAN Card", "Passport"],
        required: [true, "Government ID is required"],
    },

    grovernmentIdNumber: {
        type: String,
        required: [true, "Government ID number is required"],
    },

    drivingLicense: {
        frontImage: { 
            type: String, 
            required: [true, "Front image is required"]
        },
        backImage: { 
            type: String, 
            required: [true, "Back image is required"] 
        }
    },

    selfie: { 
        type: String, 
        required: [true, "Selfie is required"] 
    },

    alternateContactNumber: { 
        type: String,
        required: [true, "Alternate contact number is required"]
    },

    addressPreferences: {
        residentialAddress: { 
            type: String, 
            required: [true, "Residential address is required"] 
        },

        city: {
            type: String,
            required: [true, "City is required"]
        },

        state: {
            type: String,
            required: [true, "State is required"]
        },

        pinCode: { 
            type: String, 
            required: [true, "Pin code is required"]
        },

        preferredVehicleType: { 
            type: String, 
            required: [true, "Preferred vehicle type is required"]
        }
    },

    paymentDetails: {
        paymentMethod: {
            type: String,
            enum: ["Credit Card", "Debit Card", "Bank Account", "UPI"],
            required: [true, "Payment method is required"]
        },

        paymentType: {
            accountHolderName: {
                type: String,
                required: [true, "Account holder name is required"]
            },
            cardNumber: {
                type: String,
                required: [true, "Card number is required"]
            },
            expiryDate: {
                type: String,
                required: [true, "Expiry date is required"]
            },
            cvv: {
                type: String,
                required: [true, "CVV is required"]
            },
        }
    },

    emergencyContact: {
        fullName: { 
            type: String, 
            required: [true, "Full name is required"]
        },

        relationship: { 
            type: String, 
            required: [true, "Relationship is required"]
        },

        contactNumber: { 
            type: String, 
            required: [true, "Contact number is required"]
        }
    },
},
{
    timestamps: true,
})

const carOwnerSchema = new Schema({
    fullName: {
        type: String,
        required: [true, "Full name is required"],
    },
    username: {
        type: String,
        required: [true, "Username is required"],
    },
    contactNumber: {
        type: String,
        required: [true, "Contact number is required"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        validate: {
            validator: function(email){
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email);
            },
            message: "Invalid email format"
        }
    },
    password : {
        type: String,
        required: [true, "Password is required"],
    },

    dateOfBirth: {
        type: Date,
        required: [true, "Date of birth is required"],
    },

    carDetails: {
        brandModel: {
            type: String,
            required: [true, "Brand model is required"],
        },
        yearOfManufacture: {
            type: Number,
            required: [true, "Year of manufacture is required"],
        },
        fuelType: {
            trye: String,
            enum: ["Petrol", "Diesel", "CNG", "Electric"],
            required: [true, "Fuel type is required"],
        },
        transmissionType: { 
            type: String, 
            enum: ["Manual", "Automatic"], required: [true, "Transmission type is required"]
        },
        registrationNumber: { 
            type: String, 
            required: [true, "Registration number is required"], 
            unique: true 
        },
        seatingCapacity: { 
            type: Number, 
            required: [true, "Seating capacity is required"]
        },
        carImages: {
            front: { 
                type: String, 
                required: [true, "Front image is required"]
            },
            side: { 
                type: String, 
                required: [true, "Side image is required"] 
            },
            interior: { 
                type: String, 
                required:  [true, "Interior image is required"]
            },
            numberPlate: { 
                type: String, 
                required: [true, "Number plate image is required"]
            }
        }
    },

    carDocuments: {
        rc: { 
            type: String, 
            required: [true, "RC is required"]
        },
        insurance: { 
            type: String, 
            required: [true, "Insurance is required"]
        },
        pollutionCertificate: { 
            type: String, 
            required: [true, "Pollution certificate is required"]
        },
        fitnessCertificate: { 
            type: String 
        }
    },

    bankDetails: {
        holderName: { 
            type: String, 
            required: [true, "Holder name is required"]
        },
        bankAccount: { 
            type: String, 
            required: [true, "Bank account is required"]
        },
        upiId: { 
            type: String 
        },
        panCard: { 
            type: String, 
            required: [true, "Pan card is required"]
        }
    },

    otherDetails: {
        pickupDropLocation: { 
            type: String, 
            required: [true, "Pickup drop location is required"] 
        },
        availabilityTimings: { 
            type: String, 
            required: [true, "Availability timings is required"] 
        },
        securityDepositPreference: { 
            type: String 
        }
    }
},{
    timestamps: true,
})

renterUserSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
})

renterUserSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

carOwnerSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
})

carOwnerSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

renterUserSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

renterUserSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

carOwnerSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

carOwnerSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

module.exports = {
    Renter: mongoose.model("Renter", renterUserSchema),
    CarOwner: mongoose.model("CarOwner", carOwnerSchema)
}

