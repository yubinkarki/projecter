import { Request } from "express";
import { Types, Document } from "mongoose";

import { RoleEnum, DesignationEnum, DecodedUserType } from "@/constants";

export interface AuthenticatedUserInterface extends Request {
  user?: DecodedUserType;
}

export interface ProjectSchemaInterface extends Document {
  projectName: string;
  projectDeadline: Date;
  projectDescription: string;
  projectManager: Types.ObjectId | string;
  projectTasks: (Types.ObjectId | string)[];
  projectMembers: (Types.ObjectId | string)[];
  projectStatus: "completed" | "inprogress" | "assigned";
}

export interface TaskSchemaInterface extends Document {
  taskName: string;
  taskDeadline: Date;
  taskOwner: Types.ObjectId | string;
  taskProject: Types.ObjectId | string;
  taskStatus: "completed" | "inprogress" | "assigned";
}

export interface UserSchemaInterface extends Document {
  role: RoleEnum;
  createdAt: Date;
  updatedAt: Date;
  password: string;
  lastName: string;
  firstName: string;
  _id: Types.ObjectId;
  designation: DesignationEnum;
  previousProject: Types.ObjectId[];
  currentProject?: Types.ObjectId | null;
  email: { type: string; unique: { value: true } };
  phoneNumber: { type: string; unique: { value: true } };

  getJWTToken(): string;
  comparePassword(password: string): Promise<boolean>;
}
