import jwt from "jsonwebtoken";

const authentication = (req, res, next) => {
  const tokenHeader = req.headers.authorization; // Gets -> Bearer token

  if (tokenHeader) {
    const token = tokenHeader.split(" ")[1]; // Splitting to get the token part only.

    if (!token) res.status(401).json({ status: false, msg: "No token found" });

    try {
      req.user = jwt.verify(token, process.env.JWT_KEY);
      next();
    } catch (err) {
      return res.status(400).json({ status: false, msg: "Invalid token" });
    }
  } else {
    return res.status(400).json({ status: false, msg: "Please send bearer token" });
  }
};

export default authentication;
