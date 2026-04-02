import { Router } from "express";

const apiRouter = Router();

apiRouter.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});


export default apiRouter;
