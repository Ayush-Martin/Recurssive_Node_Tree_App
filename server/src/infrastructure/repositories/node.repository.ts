import { injectable } from "inversify";
import NodeEntity from "../../domain/entities/node.entity";
import nodeModel, { INodeDocument } from "../db/model/node.model";
import { INodeRepository } from "../interface/repositories/INode.repository";
import NodeNameVo from "../../domain/valueObjects/nodeName.vo";
import mongoose from "mongoose";
import NotFoundError from "../../shared/errors/not-found.error";

@injectable()
class NodeRepository implements INodeRepository {
  private _toEntity(doc: INodeDocument) {
    return new NodeEntity(
      doc._id.toString(),
      new NodeNameVo(doc.name),
      doc.parentId ? doc.parentId.toString() : "",
    );
  }

  private _toDocument(entity: NodeEntity) {
    return {
      name: entity.name.value,
      parentId: entity.parentId
        ? new mongoose.Types.ObjectId(entity.parentId)
        : null,
    };
  }

  public async addNode(entity: NodeEntity): Promise<NodeEntity> {
    const doc = this._toDocument(entity);
    const node = await nodeModel.create(doc);
    return this._toEntity(node);
  }

  public async getRootNodes(): Promise<NodeEntity[]> {
    const nodes = await nodeModel.find({ parentId: null });
    return nodes.map((node) => this._toEntity(node));
  }

  public async getChildNodes(parentId: string): Promise<NodeEntity[]> {
    const nodes = await nodeModel.find({
      parentId: new mongoose.Types.ObjectId(parentId),
    });
    return nodes.map((node) => this._toEntity(node));
  }

  public async getSubtreeIDs(parentId: string): Promise<string[]> {
    const objectId = new mongoose.Types.ObjectId(parentId);

    const result = await nodeModel.aggregate<{
      _id: mongoose.Types.ObjectId;
      descendants: { _id: mongoose.Types.ObjectId }[];
    }>([
      { $match: { _id: objectId } },
      {
        $graphLookup: {
          from: nodeModel.collection.name,
          startWith: "$_id",
          connectFromField: "_id",
          connectToField: "parentId",
          as: "descendants",
        },
      },
      { $project: { _id: 1, descendants: "$descendants._id" } },
    ]);

    if (result.length === 0) {
      throw new NotFoundError(`Node with id ${parentId} not found`);
    }

    return result[0].descendants.map((node) => node._id.toString());
  }

  public async bulkDeleteNodes(ids: string[]): Promise<void> {
    await nodeModel.deleteMany({ _id: { $in: ids } });
  }
}

export default NodeRepository;
