import {
  backwardGetChildNodesDTO,
  forwardGetChildNodesDTO,
} from "../../DTO/getChildNodesDTO";

export interface IGetChildNodesUseCase {
  execute(dto: forwardGetChildNodesDTO): Promise<backwardGetChildNodesDTO[]>;
}

