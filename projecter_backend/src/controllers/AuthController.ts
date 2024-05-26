import { pick } from "lodash";
import { compare } from "bcrypt";
import { Response, Request } from "express";

import { logger } from "@/config";
import { sendToken } from "@/utils";
import { UserModel } from "@/models";
import { NewUserFormType, UserSchemaInterface, StatusEnum } from "@/constants";

const pickReqUserData: (keyof NewUserFormType)[] = [
  "email",
  "password",
  "lastName",
  "firstName",
  "phoneNumber",
  "designation",
];

export async function signup(req: Request, res: Response) {
  try {
    const userData: NewUserFormType = pick(req.body, pickReqUserData);

    const result = await UserModel.create(userData);

    if (!result) {
      res.status(500).json({ status: false, msg: "Failed to create user" });
    }

    return res.status(201).json({ status: true, msg: "User created successfully" });
  } catch (e: any) {
    return res.status(500).json({ status: false, msg: e.errors });
  }
}

export async function login(req: Request, res: Response): Promise<Response> {
  const { email, password } = req.body;

  try {
    const result: UserSchemaInterface | null = await UserModel.findOne({ email }).select("+password");

    if (!result) {
      return res.status(404).json({ emailError: true, msg: "User nor found" });
    }

    const verify: boolean = await compare(password, result.password);

    if (!verify) {
      return res.status(401).json({ passwordError: true, msg: "Incorrect password" });
    }

    return sendToken(result, StatusEnum.accepted, res);
  } catch (e: unknown) {
    logger.error("Login error:", e);
    return res.status(500).json({ status: false, msg: e });
  }
}
