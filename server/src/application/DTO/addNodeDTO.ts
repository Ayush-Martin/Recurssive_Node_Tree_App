import NodeEntity from "../../domain/entities/node.entity";
import { addNodeSchema } from "../../shared/validation/node.validation";

export class forwardAddNodeDTO {
  public parentId: string;
  public name: string;

  constructor(data: unknown) {
    const validatedData = addNodeSchema.parse(data);
    this.parentId = validatedData.parentId;
    this.name = validatedData.name;
  }
}

export class backwardAddNodeDTO {
  public id: string;
  public name: string;
  public parentId: string;

  constructor(entity: NodeEntity) {
    this.id = entity.id;
    this.name = entity.name.value;
    this.parentId = entity.parentId || "";
  }
}
