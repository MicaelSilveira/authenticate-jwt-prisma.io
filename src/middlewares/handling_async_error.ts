import type { Request, Response } from "express";
import type { NextFunction } from "express-serve-static-core";
import { AplicationServerError } from "../async_error_msg";

const handling_error = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AplicationServerError) {
    return res.status(error.statusCode).json({
      statusCode: error.statusCode,
      error: error.message,
    });
  } else {
    return res.status(500).json({
      statusCode: 500,
      error: "Internal Server Error :(",
    });
  }
};
export { handling_error };
