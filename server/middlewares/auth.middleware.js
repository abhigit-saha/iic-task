import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/APIError.js";
export const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");
  console.log("Token from cookies:", req.cookies?.accessToken);
  console.log("Token from header:", req.header("Authorization"));
  if (!token) {
    throw new ApiError(401, "Unauthorized Request");
  }
  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const user = await User.findById(decodedToken?._id).select(
    "-password -refreshToken"
  );
  if (!user) {
    throw new ApiError(401, "Invalid Access Token");
  }
  req.user = user;
  next();
});
