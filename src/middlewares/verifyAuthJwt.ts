import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
export default function authJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization;
  if (token)
    jwt.verify(
      token.replace("Bearer", "").trim(),
      "15086ac417c36c74ced9353a44e74898",
      (err, decoded) => {
        if (err)
          return res.status(203).json({
            statusCode: 203,
            error: "Token invalid",
          });
        //@ts-ignore
        req.userID = decoded?.sub;
        return next();
      }
    );
  else {
    return res.status(203).json({
      statusCode: 203,
      error: "Need Sign in",
    });
  }
}
