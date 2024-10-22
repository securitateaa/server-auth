import express, { Router } from "express";
import errorHandler from "../../middlewares/errorHandler";

const createRouter = (): Router => {
  const router = express.Router();
  router.use(errorHandler);
  return router;
};

export default createRouter;
