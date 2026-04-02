import ValidationError from "../../shared/errors/validation.error";

class NodeNameVo {
  public value: string;
  constructor(name: string) {
    if (!name.trim()) {
      throw new ValidationError("Node name should not be empty");
    }

    this.value=name;
  }
}

export default NodeNameVo;
