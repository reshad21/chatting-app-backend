import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
    },
    confirmPassword: {
        type: String,
        required: [true, "Please confirm your password"],
        minlength: [6, "Confirm password must be at least 6 characters long"],
    },
}, { timestamps: true });
// Optional: remove confirmPassword before saving to DB
userSchema.pre("save", function (next) {
    if (this.password !== this.confirmPassword) {
        return next(new Error("Passwords do not match"));
    }
    this.confirmPassword = undefined; // don’t save confirmPassword field
    next();
});
const User = mongoose.model("User", userSchema);
export default User;
