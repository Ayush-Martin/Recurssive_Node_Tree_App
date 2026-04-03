import { appApi } from "../config/axios";
import type {
  INode,
  IAddNodePayload,
  IDeleteNodeResponse,
} from "../types/node.types";
import { IResponse } from "../types/appResponse.types";

const NODES_ENDPOINT = "/nodes";

export const getRootNodes = async (): Promise<INode[]> => {
  const response = await appApi.get<unknown, IResponse<INode[]>>(NODES_ENDPOINT);
  return response.data;
};

export const getChildNodes = async (parentId: string): Promise<INode[]> => {
  const response = await appApi.get<unknown, IResponse<INode[]>>(`${NODES_ENDPOINT}/${parentId}`);
  return response.data;
};

export const addNode = async (payload: IAddNodePayload): Promise<INode> => {
  const response = await appApi.post<unknown, IResponse<INode>>(NODES_ENDPOINT, payload);
  return response.data;
};

export const deleteNode = async (
  nodeId: string
): Promise<IDeleteNodeResponse> => {
  const response = await appApi.delete<unknown, IResponse<IDeleteNodeResponse>>(
    `${NODES_ENDPOINT}/${nodeId}`
  );
  return response.data;
};
