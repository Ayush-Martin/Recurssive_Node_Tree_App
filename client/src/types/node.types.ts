export interface INode {
  id: string;
  name: string;
  parentId: string;
}

export interface IAddNodePayload {
  name: string;
  parentId: string;
}

export interface IDeleteNodeResponse {
  deletedIds: string[];
}
