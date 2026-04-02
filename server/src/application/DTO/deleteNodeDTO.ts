export class forwardDeleteNodeDTO {
  public nodeId: string;

  constructor(data: unknown) {
    const { nodeId } = data as { nodeId: string };
    this.nodeId = nodeId;
  }
}

export class backwardDeleteNodeDTO {
  public deletedIds: string[];

  constructor(deletedIds: string[]) {
    this.deletedIds = deletedIds;
  }
}

