import { injectable } from "inversify";
import { NextFunction, Request, Response } from "express";
import AppError from "../../shared/errors/app.error";
import { StatusCodes } from "../../shared/constants/statusCodes";
import { binder } from "../../shared/utils/binder";
import { errorResponse } from "../../shared/utils/responseCreator";

@injectable()
class ErrorHandlerMiddleware {
  constructor() {
    binder(this);
  }

  /**
   * method to handle errors
   * @param err
   * @param req
   * @param res
   * @param _next
   * @returns
   */
  public handle(
    err: AppError,
    req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    console.log(err);

    const status = Number(err.status) || StatusCodes.INTERNAL_SERVER_ERROR;
    res.status(status).json(errorResponse(err.message));
  }
}

export default ErrorHandlerMiddleware;
