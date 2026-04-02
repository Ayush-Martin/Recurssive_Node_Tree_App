import { Container } from "inversify";
import { TYPES } from "./types";
import ErrorHandlerMiddleware from "../../presentation/middlewares/errorHandler.middleware";
import NodeRepository from "../repositories/node.repository";
import { INodeRepository } from "../interface/repositories/INode.repository";
import AddNodeUseCase from "../../application/useCases/addNode.useCase";
import GetRootNodesUseCase from "../../application/useCases/getRootNodes.useCase";
import GetChildNodesUseCase from "../../application/useCases/getChildNodes.useCase";
import DeleteNodeUseCase from "../../application/useCases/deleteNode.useCase";
import NodeController from "../../presentation/controllers/node.controller";

const container = new Container();

// Repositories
container
  .bind<INodeRepository>(TYPES.NodeRepository)
  .to(NodeRepository)
  .inSingletonScope();

// UseCases
container.bind(TYPES.AddNodeUseCase).to(AddNodeUseCase).inSingletonScope();

container
  .bind(TYPES.GetRootNodesUseCase)
  .to(GetRootNodesUseCase)
  .inSingletonScope();

container
  .bind(TYPES.GetChildNodesUseCase)
  .to(GetChildNodesUseCase)
  .inSingletonScope();

container
  .bind(TYPES.DeleteNodeUseCase)
  .to(DeleteNodeUseCase)
  .inSingletonScope();

// Middlewares
container
  .bind<ErrorHandlerMiddleware>(TYPES.ErrorHandlerMiddleware)
  .to(ErrorHandlerMiddleware);

// Controllers
container.bind<NodeController>(TYPES.NodeController).to(NodeController);

export default container;
