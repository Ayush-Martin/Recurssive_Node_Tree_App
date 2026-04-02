import NodeController from "../../presentation/controllers/node.controller";
import ErrorHandlerMiddleware from "../../presentation/middlewares/errorHandler.middleware";
import container from "./bindings";
import { TYPES } from "./types";

//Controllers
export const nodeController = container.get<NodeController>(
  TYPES.NodeController,
);

// Middlewares
export const errorHandlerMiddleware = container.get<ErrorHandlerMiddleware>(
  TYPES.ErrorHandlerMiddleware,
);
