import { inject, injectable } from "inversify";
import { IAddNodeUseCase } from "../interface/useCases/IAddNode.useCase";
import { TYPES } from "../../infrastructure/container/types";
import { INodeRepository } from "../../infrastructure/interface/repositories/INode.repository";
import { forwardAddNodeDTO, backwardAddNodeDTO } from "../DTO/addNodeDTO";
import NodeEntity from "../../domain/entities/node.entity";
import NodeNameVo from "../../domain/valueObjects/nodeName.vo";

@injectable()
class AddNodeUseCase implements IAddNodeUseCase {
  constructor(
    @inject(TYPES.NodeRepository) private _nodeRepository: INodeRepository,
  ) {}

  /**
   * Adds a new node to the tree.
   * @param dto
   * @returns
   */
  public async execute(dto: forwardAddNodeDTO): Promise<backwardAddNodeDTO> {
    const nodeEntity = new NodeEntity(
      "",
      new NodeNameVo(dto.name),
      dto.parentId,
    );

    const createdNode = await this._nodeRepository.addNode(nodeEntity);

    return new backwardAddNodeDTO(createdNode);
  }
}

export default AddNodeUseCase;
