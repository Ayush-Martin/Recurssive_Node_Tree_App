import { deleteNodeSchema } from "../../shared/validation/node.validation";

export class forwardDeleteNodeDTO {
  public nodeId: string;

  constructor(data: unknown) {
    const validatedData = deleteNodeSchema.parse(data);
    this.nodeId = validatedData.nodeId;
  }
}

export class backwardDeleteNodeDTO {
  public deletedIds: string[];

  constructor(deletedIds: string[]) {
    this.deletedIds = deletedIds;
  }
}

