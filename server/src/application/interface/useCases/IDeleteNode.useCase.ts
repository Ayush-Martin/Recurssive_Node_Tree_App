import {
  backwardDeleteNodeDTO,
  forwardDeleteNodeDTO,
} from "../../DTO/deleteNodeDTO";

export interface IDeleteNodeUseCase {
  execute(dto: forwardDeleteNodeDTO): Promise<backwardDeleteNodeDTO>;
}

