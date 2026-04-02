import { Router } from "express";
import { nodeController } from "../../../infrastructure/container/DI";

const nodeRouter = Router();

nodeRouter
  .route("/")
  .get(nodeController.getRootNodes)
  .post(nodeController.addNode);

nodeRouter
  .route("/:parentId")
  .get(nodeController.getChildNodes)
  .delete(nodeController.deleteNode);

export default nodeRouter;
