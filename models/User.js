import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide name'],
            minlength: 3,
            maxlength: 20,
            trim: true
        },
        email: {
            type: String,
            required: [true, 'Please provide email'],
            validate: {
                validator: validator.isEmail,
                message: 'Please provide a valid email'
            },
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Please provide password'],
            minlength: 5,
            select: false,
        },
        lastName: {
            type: String,
            default: 'lastName',
            trim: true,
        },
        location: {
            type: String,
            default: 'my city',
            trim: true,
            maxlength: 15,
        },
    }
)

UserSchema.pre('save', async function(){
    if (!this.isModified('password')) return
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    // console.log(this.modifiedPaths());
    // console.log(this.isModified('location'));
})

UserSchema.methods.createJWT = function(){
    return jwt.sign({userID: this._id}, process.env.JWT_SECRET,{ expiresIn: process.env.JWT_LIFETIME })
}

UserSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch;
}

export default mongoose.model('User', UserSchema)