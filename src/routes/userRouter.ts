import { Request, Response, NextFunction, Router } from "express";
import { userController } from "../dependencyInjection/user";
import { authorization } from "../middlewares";

const router = Router();

router.post("/", (req: Request, res: Response) =>
  userController.createUser(req, res)
);

router.post("/login", (req: Request, res: Response) =>
  userController.loginUser(req, res)
);

router.get(
  "/",
  (req: Request, res: Response, next: NextFunction) =>
    authorization.verifyToken(req, res, next),
  (req: Request, res: Response) => userController.getUserById(req, res)
);

router.get(
  "/check-auth",
  (req: Request, res: Response, next: NextFunction) =>
    authorization.verifyToken(req, res, next),
  (req: Request, res: Response) =>
    userController.returnAuthorizedResult(req, res)
);

export { router };
