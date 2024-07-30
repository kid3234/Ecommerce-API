import { getToken } from "../utils/getToken.js";
import { verifyToken } from "../utils/verifyTolen.js";

export const isLoggedIn = (req, res, next) => {
  // get token from header

  const token = getToken(req);

  // verify token

  const decodedUser = verifyToken(token);

  if (!decodedUser) {
    throw new Error("Invalid/expired token, please login again");
  } else {
    // save user in the req body
    req.userAuthId = decodedUser.id;
    next()
  } 
};
