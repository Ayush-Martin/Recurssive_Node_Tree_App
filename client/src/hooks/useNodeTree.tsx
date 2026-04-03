import { useState, useEffect, useCallback } from "react";
import type { INode } from "../types/node.types";
import {
  getRootNodes,
  addNode as addNodeService,
} from "../services/node.service";

const useNodeTree = () => {
  const [rootNodes, setRootNodes] = useState<INode[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRootNodes = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getRootNodes();
      setRootNodes(data);
    } catch {
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRootNodes();
  }, [fetchRootNodes]);

  const addRootNode = async (name: string) => {
    try {
      const newNode = await addNodeService({ name, parentId: "" });
      setRootNodes((prev) => [...prev, newNode]);
      return true;
    } catch {
      return false;
    }
  };

  const deleteFromState = (deletedIds: string[]) => {
    setRootNodes((prev) =>
      prev.filter((node) => !deletedIds.includes(node.id)),
    );
  };

  return {
    rootNodes,
    isLoading,
    addRootNode,
    deleteFromState,
    refreshNodes: fetchRootNodes,
  };
};

export default useNodeTree;
