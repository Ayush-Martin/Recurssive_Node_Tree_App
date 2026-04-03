import { useState } from "react";
import { HiPlus } from "react-icons/hi";
import { TbBinaryTree2, TbSquareRoundedPlus } from "react-icons/tb";
import useNodeTree from "../hooks/useNodeTree";
import TreeNode from "./TreeNode";
import AddNodeForm from "./AddNodeForm";
import SkeletonNode from "./SkeletonNode";
import { Button } from "./ui/Button";

const NodeTree = () => {
  const { 
    rootNodes, 
    isLoading,
    addRootNode, 
    deleteFromState,
  } = useNodeTree();

  const [showAddRoot, setShowAddRoot] = useState(false);

  const handleAddRootSubmit = async (name: string) => {
    const success = await addRootNode(name);
    if (success) setShowAddRoot(false);
  };

  return (
    <div className="node-tree-container">
      <header className="node-tree-header">
        <div className="node-tree-header-left">
          <div className="node-tree-icon"><TbBinaryTree2 /></div>
          <div>
            <h1 className="node-tree-title">Node Tree</h1>
            <p className="node-tree-subtitle">
              {rootNodes.length} root node{rootNodes.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <Button onClick={() => setShowAddRoot(!showAddRoot)} variant="primary">
          <HiPlus /> {showAddRoot ? "Cancel" : "Add Root Node"}
        </Button>
      </header>

      {showAddRoot && (
        <section className="add-root-form-wrapper">
          <AddNodeForm 
            onSubmit={handleAddRootSubmit} 
            placeholder="Root node name..." 
            buttonLabel="Create Root" 
          />
        </section>
      )}

      <main className="node-tree-content">
        {isLoading && (
          <div className="node-tree-list">
            {[1, 2, 3].map((i) => (
              <SkeletonNode key={i} />
            ))}
          </div>
        )}
        {!isLoading && rootNodes.length === 0 && <EmptyState />}
        
        {!isLoading && rootNodes.length > 0 && (
          <div className="node-tree-list">
            {rootNodes.map((node) => (
              <TreeNode
                key={node.id}
                node={node}
                onDelete={deleteFromState}
                depth={0}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

const EmptyState = () => (
  <div className="node-tree-empty">
    <div className="empty-icon"><TbSquareRoundedPlus /></div>
    <p className="empty-title">No nodes yet</p>
    <p className="empty-subtitle">Click "Add Root Node" to create your first node</p>
  </div>
);

export default NodeTree;