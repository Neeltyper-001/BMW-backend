import {mongoose,Schema} from "mongoose";

import { baseUserFields, baseOptions, applyBasePlugins } from './userBase.js';

const renterUserSchema = new Schema(
{
    ...baseUserFields,
    Documents: {
        governmentId: {
            type: String,
            enum: ["Aadhar Card", "PAN Card", "Passport"],
            required: [true, "Government ID is required"],
        },
        governmentIdNumber: {
            type: String,
            required: [true, "Government ID number is required"],
        },
        drivingLicenseFrontImage: {
            type: String,
            required: [true, "Front image is required"],
        },
        drivingLicenseBackImage: {
            type: String,
            required: [true, "Back image is required"],
        },
        selfie: {
            type: String,
            required: [true, "Selfie is required"],
        },
        alternateContactNumber: {
            type: String,
            required: [true, "Alternate contact number is required"],
        },
    },
    addressPreferences: {
        residentialAddress: {
            type: String,
            required: [true, "Residential address is required"],
        },
        city: {
            type: String,
            required: [true, "City is required"],
        },
        state: {
            type: String,
            required: [true, "State is required"],
        },
        pinCode: {
            type: String,
            required: [true, "Pin code is required"],
        },
    },
    paymentDetails: {
        paymentMethod: {
            type: String,
            enum: ["Credit Card", "Debit Card", "Bank Account", "UPI"],
            required: [true, "Payment method is required"],
        },
        paymentTypeCard: {
            accountHolderName: {
                type: String,
                required: function () {
                    return this.paymentMethod === "Credit Card" || this.paymentMethod === "Debit Card";
                },
            },
            cardNumber: {
                type: String,
                required: function () {
                    return this.paymentMethod === "Credit Card" || this.paymentMethod === "Debit Card";
                },
            },
            expiryDate: {
                type: String,
                required: function () {
                    return this.paymentMethod === "Credit Card" || this.paymentMethod === "Debit Card";
                },
            },
            cvv: {
                type: String,
                required: function () {
                    return this.paymentMethod === "Credit Card" || this.paymentMethod === "Debit Card";
                },
            },
        },
        paymentTypeUpi: {
            upiId: {
                type: String,
                required: function () {
                    return this.paymentMethod === "UPI";
                },
            },
        },
        paymentTypeBank: {
            accountHolderName: {
                type: String,
                required: function () {
                    return this.paymentMethod === "Bank Account";
                },
            },
            bankName: {
                type: String,
                required: function () {
                    return this.paymentMethod === "Bank Account";
                },
            },
            accountNumber: {
                type: String,
                required: function () {
                    return this.paymentMethod === "Bank Account";
                },
            },
            ifscCode: {
                type: String,
                required: function () {
                    return this.paymentMethod === "Bank Account";
                },
            },
        },
    },
    emergencyContact: {
        emergencyfullName: {
            type: String,
            required: [true, "Full name is required"],
        },
        relationship: {
            type: String,
            required: [true, "Relationship is required"],
        },
        emergencyContactNumber: {
            type: String,
            required: [true, "Contact number is required"],
        },
    },
},
    baseOptions
);

applyBasePlugins(renterUserSchema);

const Renter = mongoose.model("Renter", renterUserSchema);

export { Renter };