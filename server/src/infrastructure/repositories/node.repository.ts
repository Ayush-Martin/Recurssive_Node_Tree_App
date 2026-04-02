import { injectable } from "inversify";
import NodeEntity from "../../domain/entities/node.entity";
import nodeModel, { INodeDocument } from "../db/model/node.model";
import { INodeRepository } from "../interface/repositories/INode.repository";
import NodeNameVo from "../../domain/valueObjects/nodeName.vo";
import mongoose from "mongoose";
import NotFoundError from "../../shared/errors/not-found.error";

@injectable()
class NodeRepository implements INodeRepository {
  /**
   * Converts a database document to a domain entity.
   * @param doc
   * @returns
   */
  private _toEntity(doc: INodeDocument) {
    return new NodeEntity(
      doc._id.toString(),
      new NodeNameVo(doc.name),
      doc.parentId ? doc.parentId.toString() : "",
    );
  }

  /**
   * Converts a domain entity to a database document.
   * @param entity
   * @returns
   */
  private _toDocument(entity: NodeEntity) {
    return {
      name: entity.name.value,
      parentId: entity.parentId
        ? new mongoose.Types.ObjectId(entity.parentId)
        : null,
    };
  }

  /**
   * Adds a new node to the database.
   * @param entity
   * @returns
   */
  public async addNode(entity: NodeEntity): Promise<NodeEntity> {
    const doc = this._toDocument(entity);
    const node = await nodeModel.create(doc);
    return this._toEntity(node);
  }

  /**
   * Retrieves all root nodes from the database.
   * @returns
   */
  public async getRootNodes(): Promise<NodeEntity[]> {
    const nodes = await nodeModel.find({ parentId: null });
    return nodes.map((node) => this._toEntity(node));
  }

  /**
   * Retrieves all child nodes of a given parent node.
   * @param parentId
   * @returns
   */
  public async getChildNodes(parentId: string): Promise<NodeEntity[]> {
    const nodes = await nodeModel.find({
      parentId: new mongoose.Types.ObjectId(parentId),
    });
    return nodes.map((node) => this._toEntity(node));
  }

  /**
   * Retrieves the IDs of all nodes in the subtree rooted at the given parent node.
   * @param parentId
   * @returns
   */
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

  /**
   * Deletes multiple nodes from the database.
   * @param ids
   */
  public async bulkDeleteNodes(ids: string[]): Promise<void> {
    await nodeModel.deleteMany({ _id: { $in: ids } });
  }
}

export default NodeRepository;
