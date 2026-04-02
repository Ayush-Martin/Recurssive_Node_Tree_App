import { appApi } from "../config/axios";
import type {
  INode,
  IAddNodePayload,
  IDeleteNodeResponse,
} from "../types/node.types";

const NODES_ENDPOINT = "/nodes";

export const getRootNodes = async (): Promise<INode[]> => {
  const { data } = await appApi.get<INode[]>(NODES_ENDPOINT);
  return data;
};

export const getChildNodes = async (parentId: string): Promise<INode[]> => {
  const { data } = await appApi.get<INode[]>(`${NODES_ENDPOINT}/${parentId}`);
  return data;
};

export const addNode = async (payload: IAddNodePayload): Promise<INode> => {
  const { data } = await appApi.post<INode>(NODES_ENDPOINT, payload);
  return data;
};

export const deleteNode = async (
  nodeId: string
): Promise<IDeleteNodeResponse> => {
  const { data } = await appApi.delete<IDeleteNodeResponse>(
    `${NODES_ENDPOINT}/${nodeId}`
  );
  return data;
};
