import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import { Schema, model } from "mongoose";

import { envConfig } from "@/config/EnvConfig";

// User database schema.
export const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      validate: [validator.isEmail, "Enter a valid email"],
      unique: [true, "This email already exists"],
    },
    // select: {Boolean} - Specifies default path selection behavior.
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
      minLength: [5, "Minimum 5 characters required"],
    },
    designation: {
      type: String,
      enum: [
        "Fullstack Developer",
        "Frontend Developer",
        "Backend Developer",
        "Human Resource",
        "Finance",
        "Product Designer",
        "Marketing",
      ],
      required: [true, "Designation is required"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      unique: [true, "This phone number already exists"],
      minLength: [10, "Should be 10 digits minimum"],
      maxLength: [15, "Should be 15 digits maximum"],
    },
    role: {
      type: String,
      enum: ["admin", "pm", "user"],
      required: [true, "Role is required"],
      default: "user",
    },
    currentProject: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "Project",
    },
    previousProject: [
      {
        type: Schema.Types.ObjectId,
        required: false,
        ref: "Project",
      },
    ],
  },
  { timestamps: true }
);

// Password encrypting using bcrypt.
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare old and new password.
userSchema.methods.comparePassword = async function (password: string) {
  const compare = await bcrypt.compare(password, this.password);
  return compare;
};

// JWT token creation.
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, envConfig.jwtKey, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// 'User' table is created in the database.
export default model("User", userSchema);
