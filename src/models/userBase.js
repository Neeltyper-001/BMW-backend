import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Base fields shared by both Renter and CarOwner
const baseUserFields = {
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
        validator: function (email) {
            return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email);
        },
        message: "Invalid email format",
        },
    },
    contactNumber: {
        type: String,
        required: [true, "Contact number is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    dateOfBirth: {
        type: Date,
        required: [true, "Date of birth is required"],
    },
    role:{
        type: String,
        enum: ["Renter", "CarOwner"],
        required: [true, "Role is required"],
    }
};

    const baseOptions = { timestamps: true };

    // Plugin to add common methods and hooks
    const applyBasePlugins = (schema) => {
    schema.pre("save", async function (next) {
        if (!this.isModified("password")) return next();
        this.password = await bcrypt.hash(this.password, 10);
        next();
    });

    schema.methods.isPasswordCorrect = async function (password) {
        return await bcrypt.compare(password, this.password);
    };

    schema.methods.generateAccessToken = function () {
        return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
        );
    };

    schema.methods.generateRefreshToken = function () {
        return jwt.sign(
        { _id: this._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
        );
    };
};

export { baseUserFields, baseOptions, applyBasePlugins };