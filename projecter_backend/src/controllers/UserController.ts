const _ = require("lodash");
const bcrypt = require("bcrypt");

// Importing custom modules.
import { userModel } from "@/models"; // User database model.
import { sendToken } from "@/utils"; // Create JWT token function.

// Get all users.
export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    if (users.length > 0) return res.json({ status: true, users });
    return res.status(404).json({ emptyUser: true, msg: "Users not found" });
  } catch (err) {
    return res.status(400).json({ status: false, msg: "Error getting users" });
  }
};

// Get one user by id. Currently logged in user via token.
export const getOneUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);

    if (user) return res.json({ status: true, user });
    return res.status(404).json({ noUser: true, msg: "User not found" });
  } catch (err) {
    return res.status(400).json({ status: false, msg: "Error getting user" });
  }
};

// Create user.
export const signup = async (req, res) => {
  try {
    let userData = _.pick(req.body, ["firstName", "lastName", "email", "password", "phoneNumber", "designation"]);

    await userModel.create(userData);

    return res.status(201).json({ status: true, msg: "User created successfully" });
  } catch (err) {
    if (err.keyPattern.email === 1) {
      res.status(400).json({ status: false, msg: "Email already exists" });
    } else if (err.keyPattern.phoneNumber === 1) {
      res.status(400).json({ status: false, msg: "Phone number already exists" });
    } else {
      res.status(400).json({ status: false, msg: "Error in creating user" });
    }
  }
};

// Login user.
export const login = async (req, res) => {
  const { email, password } = req.body;
  const login = await userModel.findOne({ email }).select("+password");

  try {
    if (!login) res.status(404).json({ emailError: true, msg: "Could not find email" });

    const verify = await bcrypt.compare(password, login.password);

    if (!verify) res.status(401).json({ passwordError: true, msg: "Incorrect password" });

    return sendToken(login, 202, res);
  } catch (err) {
    return res.status(401).json({ status: false, msg: "Could not login" });
  }
};

// Delete user by id.
export const deleteOneUser = async (req, res) => {
  try {
    const user = await userModel.findByIdAndRemove(req.params.id);

    if (!user) return res.status(404).json({ noUser: true, msg: "User not found" });

    return res.status(202).json({ status: true, msg: "User deleted successfully" });
  } catch (err) {
    return res.status(400).json({ status: false, msg: "Error deleting user" });
  }
};

// Update user details.
export const updateUser = async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
    });

    if (!user) res.status(404).json({ noUser: true, msg: "User not found" });
    return res.status(202).json({ status: true, msg: "User updated successfully" });
  } catch (err) {
    return res.status(404).json({ status: false, msg: "Error updating users", err });
  }
};

// Update user password.
export const updatePassword = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("+password");
    const passwordMatch = await user.comparePassword(req.body.currentPassword);

    if (!passwordMatch) {
      return res.status(400).json({ passwordError: true, msg: "Incorrect current password" });
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      return res.status(400).json({
        confirmPasswordError: true,
        msg: "Password does not match with each other",
      });
    }

    user.password = req.body.newPassword;
    await user.save();

    return res.status(200).json({ status: true, msg: "Password updated successfully" });
  } catch (err) {
    return res.status(400).json({ status: false, msg: "Could not update password", err });
  }
};

// Get one user by it's id. To fetch pm details on user/task page.
export const getOneUserById = async (req, res) => {
  try {
    const userData = await userModel.findById(req.params.id);

    if (!userData) {
      return res.status(404).json({ noUser: true, msg: "User not found" });
    }

    return res.status(200).json({ status: true, msg: "User found", userData });
  } catch (err) {
    return res.status(404).json({ status: false, msg: "User not found", err });
  }
};

// Get multiple user data with their ObjectId for user/task page.
export const getManyUsers = async (req, res) => {
  const userId = req.query.userId;

  try {
    const manyUsers = await userModel.find({
      _id: {
        $in: userId,
      },
    });

    return res.status(200).json({ status: true, msg: "Users found successfully", manyUsers });
  } catch (err) {
    res.status(504).json({ status: false, msg: "Error getting users" });
  }
};
