import { inject, injectable } from "inversify";
import { TYPES } from "../../infrastructure/container/types";
import { INodeRepository } from "../../infrastructure/interface/repositories/INode.repository";
import {
  backwardDeleteNodeDTO,
  forwardDeleteNodeDTO,
} from "../DTO/deleteNodeDTO";
import { IDeleteNodeUseCase } from "../interface/useCases/IDeleteNode.useCase";

@injectable()
class DeleteNodeUseCase implements IDeleteNodeUseCase {
  constructor(
    @inject(TYPES.NodeRepository) private _nodeRepository: INodeRepository,
  ) {}

  /**
   * Deletes a node and all its descendants from the tree.
   * It first retrieves all descendant node IDs, then performs a bulk delete operation.
   * Finally, it returns the list of deleted node IDs for client-side state updates.
   * @param dto
   * @returns
   */
  public async execute(
    dto: forwardDeleteNodeDTO,
  ): Promise<backwardDeleteNodeDTO> {
    const descendantIds = await this._nodeRepository.getSubtreeIDs(dto.nodeId);
    const idsToDelete = [dto.nodeId, ...descendantIds];
    await this._nodeRepository.bulkDeleteNodes(idsToDelete);
    return new backwardDeleteNodeDTO(idsToDelete);
  }
}

export default DeleteNodeUseCase;
