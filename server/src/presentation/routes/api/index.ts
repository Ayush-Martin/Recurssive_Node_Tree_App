import { Router } from "express";
import nodeRouter from "./node.router";

const apiRouter = Router();

apiRouter.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

apiRouter.use("/nodes", nodeRouter);

export default apiRouter;
