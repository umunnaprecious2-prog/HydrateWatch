import { Request, Response, NextFunction } from "express";

export function errorHandler(err: any, req: Request, res: Response, _next: NextFunction) {
  console.error("Unhandle error in route handler:", err);

  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({
    detail: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
}
