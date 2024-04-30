import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import { Schema, model, Document, Types } from "mongoose";

import { envConfig } from "@/config/EnvConfig";
import { Role, Designation } from "@/constants";

interface UserModel extends Document {
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  password: string;
  lastName: string;
  firstName: string;
  getJWTToken(): string;
  designation: Designation;
  email: { type: string; unique: { value: true } };
  previousProject: (Types.ObjectId | string)[];
  currentProject?: Types.ObjectId | string | null;
  phoneNumber: { type: string; unique: { value: true } };
  comparePassword(password: string): Promise<boolean>;
}

// User database schema.
export const userSchema = new Schema<UserModel>(
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
      unique: { value: true, message: "This email already exists" },
    },
    // select: {Boolean} - Specifies default path selection behavior.
    password: {
      type: String,
      select: false,
      required: [true, "Password is required"],
      minLength: [5, "Minimum 5 characters required"],
    },
    designation: {
      type: String,
      enum: Designation,
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
      enum: Role,
      type: String,
      default: Role.user,
      required: [true, "Role is required"],
    },
    currentProject: {
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
    expiresIn: envConfig.jwtExpiryDuration,
  });
};

// 'User' table is created in the database.
export default model("User", userSchema);
