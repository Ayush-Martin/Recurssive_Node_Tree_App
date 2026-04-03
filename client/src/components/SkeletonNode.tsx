import { FC } from "react";

interface SkeletonNodeProps {
  depth?: number;
}

const SkeletonNode: FC<SkeletonNodeProps> = ({ depth = 0 }) => {
  const paddingLeft = `${depth * 1.5}rem`;

  return (
    <div className="tree-node-wrapper" style={{ paddingLeft }}>
      {depth > 0 && <div className="tree-connector-vertical" />}
      <div className="skeleton-node">
        <div className="tree-node-accent" style={{ background: "rgba(255,255,255,0.05)" }} />
        <div className="skeleton-icon" />
        <div className="skeleton-text" />
      </div>
    </div>
  );
};

export default SkeletonNode;
