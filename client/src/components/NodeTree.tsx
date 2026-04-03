import { useState } from "react";
import { HiPlus } from "react-icons/hi";
import { TbBinaryTree2, TbSquareRoundedPlus, TbAlertCircle } from "react-icons/tb";
import useNodeTree from "../hooks/useNodeTree";
import TreeNode from "./TreeNode";
import AddNodeForm from "./AddNodeForm";

const NodeTree = () => {
  const { 
    rootNodes, 
    isLoading, 
    error, 
    addRootNode, 
    deleteFromState, 
    refreshNodes 
  } = useNodeTree();

  const [showAddRoot, setShowAddRoot] = useState(false);

  const handleAddRootSubmit = async (name: string) => {
    const success = await addRootNode(name);
    if (success) setShowAddRoot(false);
  };

  return (
    <div className="node-tree-container">
      {/* Header */}
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

        <button onClick={() => setShowAddRoot(!showAddRoot)} className="add-root-btn">
          <HiPlus /> {showAddRoot ? "Cancel" : "Add Root Node"}
        </button>
      </header>

      {/* Conditional Forms */}
      {showAddRoot && (
        <section className="add-root-form-wrapper">
          <AddNodeForm 
            onSubmit={handleAddRootSubmit} 
            placeholder="Root node name..." 
            buttonLabel="Create Root" 
          />
        </section>
      )}

      {/* Main Content Area */}
      <main className="node-tree-content">
        {isLoading && <LoadingState />}
        {error && <ErrorState message={error} onRetry={refreshNodes} />}
        {!isLoading && !error && rootNodes.length === 0 && <EmptyState />}
        
        {!isLoading && !error && rootNodes.length > 0 && (
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

// Sub-components for cleaner JSX
const LoadingState = () => (
  <div className="node-tree-loading">
    <span className="spinner spinner--large" />
    <p>Loading nodes...</p>
  </div>
);

const EmptyState = () => (
  <div className="node-tree-empty">
    <div className="empty-icon"><TbSquareRoundedPlus /></div>
    <p className="empty-title">No nodes yet</p>
    <p className="empty-subtitle">Click "Add Root Node" to create your first node</p>
  </div>
);

const ErrorState = ({ message, onRetry }: { message: string, onRetry: () => void }) => (
  <div className="node-tree-error">
    <TbAlertCircle size={18} />
    <span>{message}</span>
    <button onClick={onRetry} className="retry-btn">Retry</button>
  </div>
);

export default NodeTree;