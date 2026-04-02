import { appApi } from "../config/axios";
import type {
  INode,
  IAddNodePayload,
  IDeleteNodeResponse,
} from "../types/node.types";
import { IResponse } from "../types/appResponse.types";

const NODES_ENDPOINT = "/nodes";

export const getRootNodes = async (): Promise<INode[]> => {
  const { data } = await appApi.get<IResponse<INode[]>>(NODES_ENDPOINT);
  return data.data;
};

export const getChildNodes = async (parentId: string): Promise<INode[]> => {
  const { data } = await appApi.get<IResponse<INode[]>>(`${NODES_ENDPOINT}/${parentId}`);
  return data.data;
};

export const addNode = async (payload: IAddNodePayload): Promise<INode> => {
  const { data } = await appApi.post<IResponse<INode>>(NODES_ENDPOINT, payload);
  return data.data;
};

export const deleteNode = async (
  nodeId: string
): Promise<IDeleteNodeResponse> => {
  const { data } = await appApi.delete<IResponse<IDeleteNodeResponse>>(
    `${NODES_ENDPOINT}/${nodeId}`
  );
  return data.data;
};
