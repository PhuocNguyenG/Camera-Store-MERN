import { NextFunction, Response, Request } from "express"


export default function ErrorHandler(req: Request, res: Response, next: NextFunction) {
  const err = new Error('Not Found');
  res.status(404).send(err);
  next(err)
}