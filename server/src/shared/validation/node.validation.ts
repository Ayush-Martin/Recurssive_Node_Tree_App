import { z } from "zod";

export const addNodeSchema = z.object({
  parentId: z.string(),
  name: z.string().min(1, "Name is required"),
});

export const deleteNodeSchema = z.object({
  nodeId: z.string().min(1, "Node ID is required"),
});

export const getChildNodesSchema = z.object({
  parentId: z.string().min(1, "Parent ID is required"),
});
