import { Request } from "express";

enum Role {
  pm = "pm",
  user = "user",
  admin = "admin",
}

enum Designation {
  finance = "Finance",
  marketing = "Marketing",
  humanResource = "Human Resource",
  productDesigner = "Product Designer",
  backendDeveloper = "Backend Developer",
  frontendDeveloper = "Frontend Developer",
  fullstackDeveloper = "Fullstack Developer",
}

interface NewUserFormData {
  email: string;
  lastName: Date;
  firstName: Date;
  password: string;
  phoneNumber: string;
  designation: Designation;
}

type DecodedData = {
  id: string;
  role: Role;
  iat: number;
  exp: number;
  email: string;
};

interface AuthenticatedRequest extends Request {
  user?: DecodedData;
}

export { Role, Designation, NewUserFormData, DecodedData, AuthenticatedRequest };
