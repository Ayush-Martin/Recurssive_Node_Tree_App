import NodeEntity from "../../domain/entities/node.entity";

export class forwardGetChildNodesDTO {
  public parentId: string;

  constructor(data: unknown) {
    const { parentId } = data as { parentId: string };
    this.parentId = parentId;
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

