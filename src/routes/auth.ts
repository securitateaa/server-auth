import { Router, Request, Response } from "express";
import AuthController from "../controllers/AuthController";
import createRouter from "./utils/router";
import { authenticate, authorize } from "../middlewares/auth";

const router: Router = createRouter();

router.get(
  "/users",
  authenticate,
  authorize("admin"),
  async (req: Request, res: Response) => {
    return AuthController.getUsers(req, res);
  }
);

router.post(
  "/register",
  async (
    req: Request<
      {},
      {},
      {
        email: string;
        password: string;
        displayName: string;
        adminToken?: string;
      }
    >,
    res: Response
  ) => {
    return AuthController.addUser(req, res);
  }
);

router.put(
  "/:name",
  authenticate,
  authorize("admin"),
  async (
    req: Request<
      { name: string },
      {},
      { email?: string; displayName?: string }
    >,
    res: Response
  ) => {
    return AuthController.updateUser(req, res);
  }
);

router.delete(
  "/:name",
  authenticate,
  authorize("admin"),
  async (req: Request<{ name: string }, {}, {}>, res: Response) => {
    return AuthController.deleteUser(req, res);
  }
);

export default router;
