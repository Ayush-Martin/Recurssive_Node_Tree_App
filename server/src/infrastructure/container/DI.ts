import ErrorHandlerMiddleware from "../../presentation/middlewares/errorHandler.middleware";
import container from "./bindings";
import { TYPES } from "./types";

// Middlewares
export const errorHandlerMiddleware = container.get<ErrorHandlerMiddleware>(
  TYPES.ErrorHandlerMiddleware,
);
