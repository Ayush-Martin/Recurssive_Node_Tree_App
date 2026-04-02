import { inject, injectable } from "inversify";
import { TYPES } from "../../infrastructure/container/types";
import { INodeRepository } from "../../infrastructure/interface/repositories/INode.repository";
import {
  backwardGetChildNodesDTO,
  forwardGetChildNodesDTO,
} from "../DTO/getChildNodesDTO";
import { IGetChildNodesUseCase } from "../interface/useCases/IGetChildNodes.useCase";

@injectable()
class GetChildNodesUseCase implements IGetChildNodesUseCase {
  constructor(
    @inject(TYPES.NodeRepository) private _nodeRepository: INodeRepository,
  ) {}

  /**
   * Retrieves all child nodes of a given parent node.
   * @param dto
   * @returns
   */
  public async execute(
    dto: forwardGetChildNodesDTO,
  ): Promise<backwardGetChildNodesDTO[]> {
    const nodes = await this._nodeRepository.getChildNodes(dto.parentId);
    return nodes.map((node) => new backwardGetChildNodesDTO(node));
  }
}

export default GetChildNodesUseCase;
