import { inject, injectable } from "inversify";
import { Request, Response, NextFunction } from "express";
import { binder } from "../../shared/utils/binder";
import { TYPES } from "../../infrastructure/container/types";
import { IAddNodeUseCase } from "../../application/interface/useCases/IAddNode.useCase";
import { forwardAddNodeDTO } from "../../application/DTO/addNodeDTO";
import { forwardGetChildNodesDTO } from "../../application/DTO/getChildNodesDTO";
import { forwardGetRootNodesDTO } from "../../application/DTO/getRootNodesDTO";
import { forwardDeleteNodeDTO } from "../../application/DTO/deleteNodeDTO";
import { IGetRootNodesUseCase } from "../../application/interface/useCases/IGetRootNodes.useCase";
import { IGetChildNodesUseCase } from "../../application/interface/useCases/IGetChildNodes.useCase";
import { IDeleteNodeUseCase } from "../../application/interface/useCases/IDeleteNode.useCase";
import { StatusCodes } from "../../shared/constants/statusCodes";
import { successResponse } from "../../shared/utils/responseCreator";
import { NodeResponseMessages } from "../../shared/constants/responseMessages";

@injectable()
class NodeController {
  constructor(
    @inject(TYPES.AddNodeUseCase) private _addNodeUseCase: IAddNodeUseCase,
    @inject(TYPES.GetRootNodesUseCase)
    private _getRootNodesUseCase: IGetRootNodesUseCase,
    @inject(TYPES.GetChildNodesUseCase)
    private _getChildNodesUseCase: IGetChildNodesUseCase,
    @inject(TYPES.DeleteNodeUseCase) private _deleteNodeUseCase: IDeleteNodeUseCase,
  ) {
    binder(this);
  }

  /**
   * Adds a new node to the tree.
   * @param req 
   * @param res 
   * @param next 
   */
  public async addNode(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = new forwardAddNodeDTO(req.body);
      const newNode = await this._addNodeUseCase.execute(dto);
      res.status(StatusCodes.CREATED).json(successResponse(NodeResponseMessages.NODE_CREATED, newNode));
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieves all root nodes from the tree.
   * @param req 
   * @param res 
   * @param next 
   */
  public async getRootNodes(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = new forwardGetRootNodesDTO(req.body);
      const nodes = await this._getRootNodesUseCase.execute(dto);
      res.status(StatusCodes.OK).json(successResponse(NodeResponseMessages.NODES_FETCHED, nodes));
    } catch (error) {
      next(error);
    }
  } 

  /**
   * Retrieves all child nodes of a given parent node.
   * @param req 
   * @param res 
   * @param next 
   */
  public async getChildNodes(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const dto = new forwardGetChildNodesDTO({
        parentId: req.params.parentId,
      });
      const nodes = await this._getChildNodesUseCase.execute(dto);
      res.status(StatusCodes.OK).json(successResponse(NodeResponseMessages.NODES_FETCHED, nodes));
    } catch (error) {
      next(error);
    }
  }

  /**
   * Deletes a node from the tree.
   * @param req 
   * @param res 
   * @param next 
   */
  public async deleteNode(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = new forwardDeleteNodeDTO({ nodeId: req.params.parentId });
      const result = await this._deleteNodeUseCase.execute(dto);
      res.status(StatusCodes.OK).json(successResponse(NodeResponseMessages.NODE_DELETED, result));
    } catch (error) {
      next(error);
    }
  }
}

export default NodeController;
