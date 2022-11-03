import jwt from "jsonwebtoken";
import User from "./models/User.js";

// secret in .env file
// const secret = 'secret123';

export function getUserFromToken(token) {
  const userInfo = jwt.verify(token, process.env.secret);
  return User.findById(userInfo.id);
}