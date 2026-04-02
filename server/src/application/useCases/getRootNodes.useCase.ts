import { inject, injectable } from "inversify";
import { INodeRepository } from "../../infrastructure/interface/repositories/INode.repository";
import { TYPES } from "../../infrastructure/container/types";
import {
  backwardGetRootNodesDTO,
  forwardGetRootNodesDTO,
} from "../DTO/getRootNodesDTO";
import { IGetRootNodesUseCase } from "../interface/useCases/IGetRootNodes.useCase";

@injectable()
class GetRootNodesUseCase implements IGetRootNodesUseCase {
  constructor(
    @inject(TYPES.NodeRepository) private _nodeRepository: INodeRepository,
  ) {}

  /**
   * Retrieves all root nodes from the tree.
   * @param _dto 
   * @returns 
   */
  public async execute(
    _dto: forwardGetRootNodesDTO,
  ): Promise<backwardGetRootNodesDTO[]> {
    const nodes = await this._nodeRepository.getRootNodes();
    return nodes.map((node) => new backwardGetRootNodesDTO(node));
  }
}

export default GetRootNodesUseCase;

