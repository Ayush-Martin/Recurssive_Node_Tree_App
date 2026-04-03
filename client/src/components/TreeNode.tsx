import { useState, useCallback, memo } from "react";
import type { INode } from "../../src/types/node.types";
import {
  getChildNodes,
  addNode,
  deleteNode,
} from "../services/node.service";
import AddNodeForm from "./AddNodeForm";
import SkeletonNode from "./SkeletonNode";
import { Button } from "./ui/Button";
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
    } catch {
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
    } catch {
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

        <Button
          variant="toggle"
          onClick={handleToggle}
          aria-label={isExpanded ? "Collapse" : "Expand"}
          title={isExpanded ? "Collapse" : "Expand"}
        >
          <span
            className={`toggle-icon ${isExpanded ? "toggle-icon--expanded" : ""} ${isLoading ? "toggle-icon--loading" : ""}`}
          >
            <HiChevronRight />
          </span>
        </Button>

        <span className="tree-node-name">{node.name}</span>

        <div className="tree-node-actions">
          <Button
            variant="action-add"
            onClick={() => setShowAddForm((prev) => !prev)}
            title="Add child node"
            aria-label="Add child node"
          >
            <HiPlus />
          </Button>

          <Button
            variant="action-delete"
            onClick={handleDelete}
            title="Delete node"
            aria-label="Delete node"
            disabled={isDeleting}
          >
            <HiTrash />
          </Button>
        </div>
      </div>

      {showAddForm && (
        <div className="tree-node-add-form">
          <AddNodeForm
            onSubmit={handleAddChild}
            placeholder="Child node name..."
            buttonLabel="Add Child"
          />
        </div>
      )}

      {isExpanded && (
        <div className="tree-children">
          {isLoading && (
            <div style={{ marginTop: "0.25rem" }}>
              <SkeletonNode depth={depth + 1} />
              <SkeletonNode depth={depth + 1} />
            </div>
          )}
          {!isLoading && children.length > 0 && children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              onDelete={handleChildDelete}
              depth={depth + 1}
            />
          ))}
        </div>
      )}

      {isExpanded && hasLoadedChildren && children.length === 0 && !isLoading && (
        <div className="tree-empty-children">
          <span>No child nodes</span>
        </div>
      )}
    </div>
  );
};

export default memo(TreeNode);
