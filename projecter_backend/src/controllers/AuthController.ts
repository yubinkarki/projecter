import { Response, Request } from "express";

import { userModel } from "@/models"; // User database model.
import { sendToken } from "@/utils"; // Create JWT token function.

const { pick } = require("lodash");
const bcrypt = require("bcrypt");

// Create user.
export const signup = async (req: Request, res: Response) => {
  try {
    let userData = pick(req.body, ["firstName", "lastName", "email", "password", "phoneNumber", "designation"]);

    await userModel.create(userData);

    return res.status(201).json({ status: true, msg: "User created successfully" });
  } catch (err: any) {
    if (err.keyPattern.email === 1) {
      res.status(400).json({ status: false, msg: "Email already exists" });

      return null;
    } else if (err.keyPattern.phoneNumber === 1) {
      res.status(400).json({ status: false, msg: "Phone number already exists" });

      return null;
    } else {
      res.status(400).json({ status: false, msg: "Error in creating user" });

      return null;
    }
  }
};

// Login user.
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const login = await userModel.findOne({ email }).select("+password");

  try {
    if (!login) res.status(404).json({ emailError: true, msg: "Could not find email" });

    const verify = await bcrypt.compare(password, login?.password);

    if (!verify) res.status(401).json({ passwordError: true, msg: "Incorrect password" });

    return sendToken(login, 202, res);
  } catch (err) {
    return res.status(401).json({ status: false, msg: "Could not login" });
  }
};

// Delete user by id.
export const deleteOneUser = async (req: Request, res: Response) => {
  try {
    const user = await userModel.findByIdAndRemove(req.params.id);

    if (!user) return res.status(404).json({ noUser: true, msg: "User not found" });

    return res.status(202).json({ status: true, msg: "User deleted successfully" });
  } catch (err) {
    return res.status(400).json({ status: false, msg: "Error deleting user" });
  }
};

// Update user details.
export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!user) res.status(404).json({ noUser: true, msg: "User not found" });

    return res.status(202).json({ status: true, msg: "User updated successfully" });
  } catch (err) {
    return res.status(404).json({ status: false, msg: "Error updating users", err });
  }
};

// Update user password.
export const updatePassword = async (req: Request, res: Response) => {
  try {
    const user = await userModel.findById(req.params.id).select("+password");
    const passwordMatch = await user?.comparePassword(req.body.currentPassword);

    if (!passwordMatch) {
      return res.status(400).json({ passwordError: true, msg: "Incorrect current password" });
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      return res.status(400).json({
        confirmPasswordError: true,
        msg: "Password does not match with each other",
      });
    }

    if (user != null) {
      user.password = req.body.newPassword;
      await user?.save();
    }

    return res.status(200).json({ status: true, msg: "Password updated successfully" });
  } catch (err) {
    return res.status(400).json({ status: false, msg: "Could not update password", err });
  }
};
