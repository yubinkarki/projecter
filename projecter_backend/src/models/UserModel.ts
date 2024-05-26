import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Schema, model } from "mongoose";

import { envConfig } from "@/config";
import { RoleEnum, DesignationEnum, UserSchemaInterface, UserSignedDetailsType } from "@/constants";

const emailRegex = /^[\w-.]+@([\w-]+.)+[a-zA-Z]{2,4}$/;

export const User = new Schema<UserSchemaInterface>(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      minLength: [2, "Minimum 2 characters required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      minLength: [2, "Minimum 2 characters required"],
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      validate: [(value: string) => emailRegex.test(value) || "Enter a valid email"],
      unique: { value: true, message: "This email already exists" },
    },
    password: {
      type: String,
      select: false,
      required: [true, "Password is required"],
      minLength: [5, "Minimum 5 characters required"],
    },
    designation: {
      type: String,
      enum: DesignationEnum,
      required: [true, "Designation is required"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      minLength: [10, "Should be 10 digits minimum"],
      maxLength: [15, "Should be 15 digits maximum"],
      unique: [true, "This phone number already exists"],
    },
    role: {
      enum: RoleEnum,
      type: String,
      default: RoleEnum.user,
      required: [true, "Role is required"],
    },
    currentProject: {
      default: null,
      ref: "Project",
      required: false,
      type: Schema.Types.ObjectId,
    },
    previousProject: [
      {
        ref: "Project",
        required: false,
        type: Schema.Types.ObjectId,
      },
    ],
  },
  { timestamps: true }
);

// Password encrypting using bcrypt.
User.pre("save", async function (next): Promise<void> {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

User.methods.comparePassword = async function (password: string): Promise<boolean> {
  const compare: boolean = await bcrypt.compare(password, this.password);
  return compare;
};

// JWT token creation.
User.methods.getToken = function (): string {
  const payload: UserSignedDetailsType = {
    id: this._id,
    role: this.role,
    email: this.email,
    designation: this.designation,
  };

  return jwt.sign(payload, envConfig.jwtKey, {
    expiresIn: envConfig.jwtExpiryDuration,
  });
};

export default model<UserSchemaInterface>("User", User);
