import jwt from "jsonwebtoken";

const userAuth = (req, res, next) => {
  const authHeader = req.header("Authorization");

  console.log("Raw Authorization Header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access Denied: No token provided" });
  }

  const token = authHeader.split(" ")[1];
  console.log("Token received:", token);

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = verified.id;
    console.log("User ID extracted:", req.userId);
    next();
  } catch (err) {
    console.log("JWT verification error:", err.message);
    return res.status(401).json({ message: "Not authorized, login again" });
  }
};

export default userAuth;
