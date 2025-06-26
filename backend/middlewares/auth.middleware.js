import jwt from "jsonwebtoken";
import User from "../model/User.js";
 
export const protectRoute  = async(req, res, next) =>{
  const token = req.cookies.token;
  try {
    if(!token){
      return res.status(401).json({ message : "Unauthorized - No token provided!"});
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if(!decode){
      return res.status(401).json({ message : "Unauthorized - Invalid token"});
    }

    const user = await User.findById(decode.userId).select("-password"); 
    if(!user){
      return res.status(401).json({ message : "Unauthorized - User not found!" })
    }
    req.user = user;
    next();
  } catch (error) {
      console.log("Error in protectRoute middleware", error);
      res.status(500).json({ message : "Internal server error!"});
  }
}