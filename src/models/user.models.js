import {mongoose,Schema} from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: [true,'Name is required'],
        trim: true,
    },

    email:{
        type: String,
        required: [true,'Email is required'],
        unique: true,
        lowercase: true,
        validate: {
            validator: function(email){
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email);                
            },
            message: "Invalid email format"
        }
    },

    password:{
        type: String,    
        required: [true, 'Password is required'],
        select:false, 
    },

    role: {
        type: String,
        enum: ["admin","user"],
        default: "user"
    },
    
    profilePhoto:{
        type: String
    },
},
{
    timestamps: true,
},)


userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.verifyPassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

export const User = mongoose.model("User",userSchema);

