import NodeEntity from "../../domain/entities/node.entity";
import { getChildNodesSchema } from "../../shared/validation/node.validation";

export class forwardGetChildNodesDTO {
  public parentId: string;

  constructor(data: unknown) {
    const validatedData = getChildNodesSchema.parse(data);
    this.parentId = validatedData.parentId;
  }
}

export class backwardGetChildNodesDTO {
  public id: string;
  public name: string;
  public parentId: string;

  constructor(entity: NodeEntity) {
    this.id = entity.id;
    this.name = entity.name.value;
    this.parentId = entity.parentId || "";
  }
}

