import {mongoose,Schema} from "mongoose";
import { baseUserFields, baseOptions, applyBasePlugins } from './userBase.js';

const carOwnerSchema = new Schema(
{
    ...baseUserFields,
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
            type: String,
            enum: ["Petrol", "Diesel", "CNG", "Electric"],
            required: [true, "Fuel type is required"],
        },
        transmissionType: {
            type: String,
            enum: ["Manual", "Automatic"],
            required: [true, "Transmission type is required"],
        },
        registrationNumber: {
            type: String,
            required: [true, "Registration number is required"],
            unique: true,
        },
        seatingCapacity: {
            type: Number,
            required: [true, "Seating capacity is required"],
        },
        carImages: {
            front: {
            type: String,
            required: [true, "Front image is required"],
            },
            side: {
            type: String,
            required: [true, "Side image is required"],
            },
            interior: {
            type: String,
            required: [true, "Interior image is required"],
            },
            numberPlate: {
            type: String,
            required: [true, "Number plate image is required"],
            },
        },
        },
        carDocuments: {
        rc: {
            type: String,
            required: [true, "RC is required"],
        },
        insurance: {
            type: String,
            required: [true, "Insurance is required"],
        },
        pollutionCertificate: {
            type: String,
            required: [true, "Pollution certificate is required"],
        },
        fitnessCertificate: {
            type: String,
        },
    },
    bankDetails: {
        holderName: {
            type: String,
            required: [true, "Holder name is required"],
        },
        bankAccount: {
            type: String,
            required: [true, "Bank account is required"],
        },
        upiId: {
            type: String,
        },
        panCard: {
            type: String,
            required: [true, "Pan card is required"],
        },
    },
    otherDetails: {
        pickupDropLocation: {
            type: String,
            required: [true, "Pickup drop location is required"],
        },
        availabilityTimings: {
            type: String,
            required: [true, "Availability timings is required"],
        },
        securityDepositPreference: {
            type: String,
        },
    },
    },
    baseOptions
);

applyBasePlugins(carOwnerSchema);

const CarOwner = mongoose.model("CarOwner", carOwnerSchema);

export { CarOwner };