import { NextFunction, Response, Request } from "express";

export default function ErrorHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const data = req.body;

  if (!data) {
    res.status(404).json({ err: "Page not Found" });
  }
  next();
}
