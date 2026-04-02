import NodeEntity from "../../domain/entities/node.entity";

export class forwardGetRootNodesDTO {
  constructor(_data: unknown) {}
}

export class backwardGetRootNodesDTO {
  public id: string;
  public name: string;
  public parentId: string;

  constructor(entity: NodeEntity) {
    this.id = entity.id;
    this.name = entity.name.value;
    this.parentId = entity.parentId || "";
  }
}

