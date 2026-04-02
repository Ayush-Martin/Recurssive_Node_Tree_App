import { backwardGetRootNodesDTO, forwardGetRootNodesDTO } from "../../DTO/getRootNodesDTO";

export interface IGetRootNodesUseCase {
  execute(dto: forwardGetRootNodesDTO): Promise<backwardGetRootNodesDTO[]>;
}

