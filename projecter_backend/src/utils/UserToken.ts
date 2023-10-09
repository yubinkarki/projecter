import { Response } from "express";

const sendToken = (user: any, statusCode: number, res: Response): void => {
  const token = user.getJWTToken();

  const options = {
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    status: true,
    token,
  });
};

export default sendToken;
