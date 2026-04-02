import { backwardAddNodeDTO, forwardAddNodeDTO } from "../../DTO/addNodeDTO";

export interface IAddNodeUseCase {
  execute(dto: forwardAddNodeDTO): Promise<backwardAddNodeDTO>;
}
