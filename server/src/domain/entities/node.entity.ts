import NodeNameVo from "../valueObjects/nodeName.vo";

class NodeEntity {
  constructor(
    public id: string,
    public name: NodeNameVo,
    public parentId: string | null,
  ) {}
}

export default NodeEntity;
