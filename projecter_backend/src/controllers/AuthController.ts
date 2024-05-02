import { pick } from "lodash";
import { compare } from "bcrypt";
import { Response, Request } from "express";

import { sendToken } from "@/utils";
import { userModel, UserModel } from "@/models";
import { NewUserFormData } from "@/constants";

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

    if (!result) {
      res.status(500).json({ status: false, msg: "Failed to create user" });
    }

    return res.status(201).json({ status: true, msg: "User created successfully" });
  } catch (err: any) {
    return res.status(500).json({ status: false, msg: err.errors });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const login: UserModel = await userModel.findOne({ email }).select("+password");

    console.log("🚀 - login - login >>", login);

    if (!login) {
      return res.status(404).json({ emailError: true, msg: "Could not find email" });
    }

    const verify = await compare(password, login.password);

    if (!verify) {
      return res.status(401).json({ passwordError: true, msg: "Incorrect password" });
    }

    return sendToken(login, 202, res);
  } catch (err: any) {
    return res.status(500).json({ status: false, msg: err.errors });
  }
};
