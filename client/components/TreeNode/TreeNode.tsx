import { useState, useCallback } from "react";
import type { INode } from "../../src/types/node.types";
import {
  getChildNodes,
  addNode,
  deleteNode,
} from "../../services/node.service";
import AddNodeForm from "../AddNodeForm/AddNodeForm";
import { HiChevronRight, HiPlus, HiTrash } from "react-icons/hi";

interface TreeNodeProps {
  node: INode;
  onDelete: (deletedIds: string[]) => void;
  depth: number;
}

const TreeNode = ({ node, onDelete, depth }: TreeNodeProps) => {
  const [children, setChildren] = useState<INode[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoadedChildren, setHasLoadedChildren] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadChildren = useCallback(async () => {
    if (hasLoadedChildren) return;
    setIsLoading(true);
    try {
      const data = await getChildNodes(node.id);
      setChildren(data);
      setHasLoadedChildren(true);
    } catch (error) {
      console.error("Failed to load children:", error);
    } finally {
      setIsLoading(false);
    }
  }, [node.id, hasLoadedChildren]);

  const handleToggle = async () => {
    if (!isExpanded) {
      await loadChildren();
    }
    setIsExpanded((prev) => !prev);
  };

  const handleAddChild = async (name: string) => {
    const newNode = await addNode({ name, parentId: node.id });
    setChildren((prev) => [...prev, newNode]);
    setHasLoadedChildren(true);
    setIsExpanded(true);
    setShowAddForm(false);
  };

  const handleDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      const result = await deleteNode(node.id);
      onDelete(result.deletedIds);
    } catch (error) {
      console.error("Failed to delete node:", error);
      setIsDeleting(false);
    }
  };

  const handleChildDelete = (deletedIds: string[]) => {
    setChildren((prev) =>
      prev.filter((child) => !deletedIds.includes(child.id))
    );
  };

  const depthColor = `hsl(${270 + depth * 12}, 70%, ${60 - depth * 3}%)`;

  return (
    <div className="tree-node-wrapper">
      {depth > 0 && <div className="tree-connector-vertical" />}

      <div
        className={`tree-node ${isDeleting ? "tree-node--deleting" : ""}`}
        style={{ "--depth-color": depthColor } as React.CSSProperties}
      >
        <div
          className="tree-node-accent"
          style={{ background: depthColor }}
        />

        {/* Expand/Collapse toggle */}
        <button
          onClick={handleToggle}
          className="tree-node-toggle"
          aria-label={isExpanded ? "Collapse" : "Expand"}
          title={isExpanded ? "Collapse" : "Expand"}
        >
          {isLoading ? (
            <span className="spinner spinner--small" />
          ) : (
            <span
              className={`toggle-icon ${isExpanded ? "toggle-icon--expanded" : ""}`}
            >
              <HiChevronRight />
            </span>
          )}
        </button>

        {/* Node name */}
        <span className="tree-node-name">{node.name}</span>

        {/* Actions */}
        <div className="tree-node-actions">
          <button
            onClick={() => setShowAddForm((prev) => !prev)}
            className="tree-action-btn tree-action-btn--add"
            title="Add child node"
            aria-label="Add child node"
          >
            <HiPlus />
          </button>

          <button
            onClick={handleDelete}
            className="tree-action-btn tree-action-btn--delete"
            title="Delete node"
            aria-label="Delete node"
            disabled={isDeleting}
          >
            <HiTrash />
          </button>
        </div>
      </div>

      {/* Add child form */}
      {showAddForm && (
        <div className="tree-node-add-form">
          <AddNodeForm
            onSubmit={handleAddChild}
            placeholder="Child node name..."
            buttonLabel="Add Child"
          />
        </div>
      )}

      {/* Children */}
      {isExpanded && children.length > 0 && (
        <div className="tree-children">
          {children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              onDelete={handleChildDelete}
              depth={depth + 1}
            />
          ))}
        </div>
      )}

      {/* Empty state */}
      {isExpanded && hasLoadedChildren && children.length === 0 && !isLoading && (
        <div className="tree-empty-children">
          <span>No child nodes</span>
        </div>
      )}
    </div>
  );
};

export default TreeNode;
