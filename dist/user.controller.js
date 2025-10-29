import userServices from "./user.services";
const signUpUser = async (req, res) => {
    const result = await userServices.createUser(req.body);
    res.status(201).json({
        message: "User signed up successfully",
        data: result,
    });
};
const UserController = {
    signUpUser,
};
export default UserController;
