import User from "./user.model";
const createUser = async (data) => {
    const { name, email, password, confirmPassword } = data;
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("User with this email already exists");
    }
    // Create new user
    const newUser = new User({ name, email, password, confirmPassword });
    const result = await newUser.save();
    return result;
};
const userServices = {
    createUser,
};
export default userServices;
