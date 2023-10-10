const _ = require("lodash");
const bcrypt = require("bcrypt");

// Importing custom modules.
import { userModel } from "@/models"; // User database model.
import { sendToken } from "@/utils"; // Create JWT token function.

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
