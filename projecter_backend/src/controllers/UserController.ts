import { Response, Request } from "express";

import { UserModel } from "@/models";
import { AuthenticatedUserInterface } from "@/constants";

// Get all users.
export async function getAllUsers(_: Request, res: Response) {
  try {
    const users = await UserModel.find();
    if (users.length > 0) return res.json({ status: true, users });
    return res.status(404).json({ emptyUser: true, msg: "Users not found" });
  } catch (err) {
    return res.status(400).json({ status: false, msg: "Error getting users" });
  }
}

// Get currently logged in user via token.
export async function getOneUser(req: AuthenticatedUserInterface, res: Response) {
  if (req.user) {
    try {
      const user = await UserModel.findById(req.user.id);

      if (user) return res.json({ status: true, user });
      return res.status(404).json({ noUser: true, msg: "User not found" });
    } catch (err) {
      return res.status(400).json({ status: false, msg: "Error getting user" });
    }
  }

  return res.status(400).json({ status: false, msg: "Logged in user not found" });
}

// Delete user by id.
export async function deleteOneUser(req: Request, res: Response) {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);

    if (!user) return res.status(404).json({ noUser: true, msg: "User not found" });

    return res.status(202).json({ status: true, msg: "User deleted successfully" });
  } catch (err) {
    return res.status(400).json({ status: false, msg: "Error deleting user" });
  }
}

// Update user details.
export async function updateUser(req: Request, res: Response) {
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!user) res.status(404).json({ noUser: true, msg: "User not found" });
    return res.status(202).json({ status: true, msg: "User updated successfully" });
  } catch (err) {
    return res.status(404).json({ status: false, msg: "Error updating users", err });
  }
}

// Get one user by it's id. To fetch pm details on user/task page.
export async function getOneUserById(req: Request, res: Response) {
  try {
    const userData = await UserModel.findById(req.params.id);

    if (!userData) {
      return res.status(404).json({ noUser: true, msg: "User not found" });
    }

    return res.status(200).json({ status: true, msg: "User found", userData });
  } catch (err) {
    return res.status(404).json({ status: false, msg: "User not found", err });
  }
}

// Update user password.
export async function updateUserPassword(req: AuthenticatedUserInterface, res: Response) {
  if (req.user) {
    try {
      const { id } = req.user;
      const user = await UserModel.findById(id).select("+password");
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
}
