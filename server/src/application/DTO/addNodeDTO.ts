import NodeEntity from "../../domain/entities/node.entity";

export class forwardAddNodeDTO {
  public parentId: string;
  public name: string;

  constructor(data: unknown) {
    const { parentId, name } = data as { parentId: string; name: string };
    this.parentId = parentId;
    this.name = name;
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
