import { NextFunction, Response, Request } from "express";

export default function UserHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const data = req.body;

  if (!data) {
    res.status(401).json({ err: "Data is null" });
  }
  next();
}
