export enum RoleEnum {
  pm = "pm",
  user = "user",
  admin = "admin",
}

export enum DesignationEnum {
  finance = "Finance",
  marketing = "Marketing",
  humanResource = "Human Resource",
  productDesigner = "Product Designer",
  backendDeveloper = "Backend Developer",
  frontendDeveloper = "Frontend Developer",
  fullstackDeveloper = "Fullstack Developer",
}

export enum StatusEnum {
  // Success codes.
  ok = 200,
  created = 201,
  accepted = 202,
  noContent = 204,

  // Error codes.
  forbidden = 403,
  linkExpired = 410,
  unauthorized = 401,
  badException = 400,
  tooManyRequests = 429,
  conflictException = 409,
  notFoundException = 404,
  validationException = 422,
  internalServerError = 500,
}

export enum SuccessMessageEnum {
  awesome = "Awesome",
  userCreated = "User created successfully",
}

export enum ErrorMessageEnum {
  wrong = "Something went wrong",
  userNotCreated = "Could not create user",
  genericMessage = "An internal server error occurred",
}

export enum ErrorCategoryEnum {
  notFound = "NotFound",
  server = "ServerError",
  mongooseGeneric = "MongooseError",
  mongooseCast = "MongooseCastError",
  mongooseValidation = "MongooseValidationError",
}
