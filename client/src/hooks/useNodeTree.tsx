import { useState, useEffect, useCallback } from "react";
import type { INode } from "../types/node.types";
import {
  getRootNodes,
  addNode as addNodeService,
} from "../services/node.service";

const useNodeTree = () => {
  const [rootNodes, setRootNodes] = useState<INode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRootNodes = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getRootNodes();
      setRootNodes(data);
    } catch (err) {
      console.error("Failed to fetch root nodes:", err);
      setError("Failed to load nodes. Make sure the server is running.");
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
    } catch (err) {
      console.error("Add root failed:", err);
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
    error,
    addRootNode,
    deleteFromState,
    refreshNodes: fetchRootNodes,
  };
};

export default useNodeTree;
