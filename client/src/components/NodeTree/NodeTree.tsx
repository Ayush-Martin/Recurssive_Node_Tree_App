import { useState, useEffect, useCallback } from "react";
import type { INode } from "../../src/types/node.types";
import { getRootNodes, addNode } from "../../services/node.service";
import TreeNode from "../TreeNode/TreeNode";
import AddNodeForm from "../AddNodeForm/AddNodeForm";
import { HiPlus } from "react-icons/hi";
import {
  TbBinaryTree2,
  TbSquareRoundedPlus,
  TbAlertCircle,
} from "react-icons/tb";

const NodeTree = () => {
  const [rootNodes, setRootNodes] = useState<INode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddRoot, setShowAddRoot] = useState(false);

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

  const handleAddRoot = async (name: string) => {
    const newNode = await addNode({ name, parentId: "" });
    setRootNodes((prev) => [...prev, newNode]);
    setShowAddRoot(false);
  };

  const handleNodeDelete = (deletedIds: string[]) => {
    setRootNodes((prev) =>
      prev.filter((node) => !deletedIds.includes(node.id))
    );
  };

  return (
    <div className="node-tree-container">
      {/* Header */}
      <div className="node-tree-header">
        <div className="node-tree-header-left">
          <div className="node-tree-icon">
            <TbBinaryTree2 />
          </div>
          <div>
            <h1 className="node-tree-title">Node Tree</h1>
            <p className="node-tree-subtitle">
              {rootNodes.length} root node{rootNodes.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddRoot((prev) => !prev)}
          className="add-root-btn"
        >
          <HiPlus />
          Add Root Node
        </button>
      </div>

      {/* Add root form */}
      {showAddRoot && (
        <div className="add-root-form-wrapper">
          <AddNodeForm
            onSubmit={handleAddRoot}
            placeholder="Root node name..."
            buttonLabel="Create Root"
          />
        </div>
      )}

      {/* Content */}
      <div className="node-tree-content">
        {isLoading && (
          <div className="node-tree-loading">
            <span className="spinner spinner--large" />
            <p>Loading nodes...</p>
          </div>
        )}

        {error && (
          <div className="node-tree-error">
            <TbAlertCircle size={18} />
            <span>{error}</span>
            <button onClick={fetchRootNodes} className="retry-btn">
              Retry
            </button>
          </div>
        )}

        {!isLoading && !error && rootNodes.length === 0 && (
          <div className="node-tree-empty">
            <div className="empty-icon">
              <TbSquareRoundedPlus />
            </div>
            <p className="empty-title">No nodes yet</p>
            <p className="empty-subtitle">
              Click "Add Root Node" to create your first node
            </p>
          </div>
        )}

        {!isLoading && !error && rootNodes.length > 0 && (
          <div className="node-tree-list">
            {rootNodes.map((node) => (
              <TreeNode
                key={node.id}
                node={node}
                onDelete={handleNodeDelete}
                depth={0}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NodeTree;
