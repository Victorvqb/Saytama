import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const AuthMiddleware = (request, response, next) => {
  try {
    const { authorization } = request.headers;

    if (!authorization) return response.send().status(401);

    const token = authorization.replace("Bearer", "").trim();
    const data = jwt.verify(token, String(process.env.JWT_SECRET));

    const { id, userType } = data;

    request.userId = id;
    request.userType = userType;

    return next();
  } catch {
    return response.sendStatus(401);
  }
};
