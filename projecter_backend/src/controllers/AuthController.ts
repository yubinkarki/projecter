import {pick} from "lodash";
import {compare} from "bcrypt";
import {Response, Request} from "express";

import {sendToken} from "@/utils"; // Create JWT token.
import {userModel} from "@/models"; // User database model.
import {NewUserFormData} from "@/constants";

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    iat: number;
    exp: number;
  };
}

const pickReqUserData: (keyof NewUserFormData)[] = [
  "email",
  "password",
  "lastName",
  "firstName",
  "phoneNumber",
  "designation",
];

// Create user.
export const signup = async (req: Request, res: Response) => {
  try {
    const userData: NewUserFormData = pick(req.body, pickReqUserData);

    const result = await userModel.create(userData);

    if (!result) res.status(500).json({status: false, msg: "Failed to create user"});

    return res.status(201).json({status: true, msg: "User created successfully"});
  } catch (err: any) {
    return res.status(500).json({status: false, msg: err.errors});
  }
};

// Login user.
export const login = async (req: Request, res: Response) => {
  const {email, password} = req.body;
  const login = await userModel.findOne({email}).select("+password");

  try {
    if (!login) res.status(404).json({emailError: true, msg: "Could not find email"});

    const verify = await compare(password, login?.password ?? "");

    if (!verify) res.status(401).json({passwordError: true, msg: "Incorrect password"});

    return sendToken(login, 202, res);
  } catch (err: any) {
    res.status(500).json({status: false, msg: err.errors});
  }
};

// Delete user by id.
export const deleteOneUser = async (req: Request, res: Response) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);

    if (!user) return res.status(404).json({noUser: true, msg: "User not found"});

    return res.status(202).json({status: true, msg: "User deleted successfully"});
  } catch (err) {
    return res.status(400).json({status: false, msg: "Error deleting user"});
  }
};

// Update user details.
export const updateUser = async (req: AuthenticatedRequest, res: Response) => {
  if (req.user) {
    try {
      const {id} = req.user;

      await userModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      return res.status(202).json({status: true, msg: "User updated successfully"});
    } catch (err) {
      return res.status(404).json({status: false, msg: "Error updating users", err});
    }
  }

  return res.status(404).json({noUser: true, msg: "User not found"});
};

// Update user password.
export const updatePassword = async (req: AuthenticatedRequest, res: Response) => {
  if (req.user) {
    try {
      const {id} = req.user;
      const user = await userModel.findById(id).select("+password");
      const passwordMatch = await user?.comparePassword(req.body.currentPassword);

      if (!passwordMatch) res.status(400).json({passwordError: true, msg: "Incorrect current password"});

      if (req.body.newPassword !== req.body.confirmPassword)
        res.status(400).json({
          confirmPasswordError: true,
          msg: "Password does not match with each other",
        });

      if (user != null) {
        user.password = req.body.newPassword;
        await user?.save();
      }

      return res.status(200).json({status: true, msg: "Password updated successfully"});
    } catch (err) {
      return res.status(400).json({status: false, msg: "Could not update password", err});
    }
  }

  return res.status(404).json({noUser: true, msg: "User not found"});
};
