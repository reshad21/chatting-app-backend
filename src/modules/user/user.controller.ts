import { Request, Response } from "express";
import userServices from "./user.services";
import { generateTokenCookie } from "../../jwt/generateToken";

const signUpUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.createUser(req.body);
    if (!result) {
      return res.status(400).json({ message: "User sign up failed" });
    }

    const { token, cookieOptions } = generateTokenCookie(result);

    // Set JWT in cookie
    res.cookie("token", token, cookieOptions);

    res.status(201).json({
      message: "User signed up successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await userServices.loginUser(email, password);
    res.status(200).json({
      success: true,
      data: user,
      message: "Login successful",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


export default { signUpUser, login };
