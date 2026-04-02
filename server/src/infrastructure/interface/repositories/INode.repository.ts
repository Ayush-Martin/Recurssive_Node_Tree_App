import NodeEntity from "../../../domain/entities/node.entity";

export interface INodeRepository {
  addNode(entity: NodeEntity): Promise<NodeEntity>;
  getRootNodes(): Promise<NodeEntity[]>;
  getChildNodes(parentId: string): Promise<NodeEntity[]>;
  getSubtreeIDs(parentId: string): Promise<string[]>;
  bulkDeleteNodes(ids: string[]): Promise<void>;
}
