import { IUser } from "./user.interface";
import User from "./user.model";
import bcrypt from "bcrypt";


export const createUser = async (data: IUser) => {
  const { name, email, password, confirmPassword } = data;

  // Password match check
  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  // Check if email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user WITHOUT confirmPassword
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  const result = await newUser.save();

  return result;
};

const loginUser = async (email: string, password: string) => {
  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  // Compare password
  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) {
    throw new Error("Invalid password");
  }

  // Return user without password
  const { password: _, ...userData } = user.toObject();
  return userData;
};

const userServices = {
  createUser,
  loginUser,
};

export default userServices;
