import { Schema, model, Document, ObjectId } from "mongoose";

export interface INodeDocument extends Document {
  name: string;
  parentId: ObjectId | null;
}

const Node = new Schema<INodeDocument>(
  {
    name: { type: String, required: true },
    parentId: { type: Schema.Types.ObjectId, default: null },
  },
  { timestamps: true },
);

export default model<INodeDocument>("Node", Node);
