import { Response, Request } from "express";

import { userModel } from "@/models"; // User database model.

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

// Get one user by id. Currently logged in user via token.
export const getOneUser = async (req: Request, res: Response) => {
  try {
    const user = await userModel.findById(req.params.id);

    if (user) return res.json({ status: true, user });
    return res.status(404).json({ noUser: true, msg: "User not found" });
  } catch (err) {
    return res.status(400).json({ status: false, msg: "Error getting user" });
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

// Get multiple user data with their ObjectId for user/task page.
export const getManyUsers = async (req: Request, res: Response) => {
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

    return null;
  }
};
