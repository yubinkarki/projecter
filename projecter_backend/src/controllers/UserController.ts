import { Response, Request } from "express";

import { userModel } from "@/models";
import { AuthenticatedRequest } from "@/constants";

// Get all users.
export const getAllUsers = async (_: Request, res: Response) => {
  try {
    const users = await userModel.find();
    if (users.length > 0) return res.json({ status: true, users });
    return res.status(404).json({ emptyUser: true, msg: "Users not found" });
  } catch (err) {
    return res.status(400).json({ status: false, msg: "Error getting users" });
  }
};

// Get currently logged in user via token.
export const getOneUser = async (req: AuthenticatedRequest, res: Response) => {
  if (req.user) {
    try {
      const user = await userModel.findById(req.user.id);

      if (user) return res.json({ status: true, user });
      return res.status(404).json({ noUser: true, msg: "User not found" });
    } catch (err) {
      return res.status(400).json({ status: false, msg: "Error getting user" });
    }
  }

  return res.status(400).json({ status: false, msg: "Logged in user not found" });
};

// Delete user by id.
export const deleteOneUser = async (req: Request, res: Response) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);

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

// Get one user by it's id. To fetch pm details on user/task page.
export const getOneUserById = async (req: Request, res: Response) => {
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

// Update user password.
export const updatePassword = async (req: AuthenticatedRequest, res: Response) => {
  if (req.user) {
    try {
      const { id } = req.user;
      const user = await userModel.findById(id).select("+password");
      const passwordMatch = await user?.comparePassword(req.body.currentPassword);

      if (!passwordMatch) res.status(400).json({ passwordError: true, msg: "Incorrect current password" });

      if (req.body.newPassword !== req.body.confirmPassword)
        res.status(400).json({
          confirmPasswordError: true,
          msg: "Password does not match with each other",
        });

      if (user != null) {
        user.password = req.body.newPassword;
        await user?.save();
      }

      return res.status(200).json({ status: true, msg: "Password updated successfully" });
    } catch (err) {
      return res.status(400).json({ status: false, msg: "Could not update password", err });
    }
  }

  return res.status(404).json({ noUser: true, msg: "User not found" });
};
