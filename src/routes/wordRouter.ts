import { Request, Response, NextFunction, Router } from "express";
import { wordController } from "../dependencyInjection/word";
import { authorization } from "../middlewares";

const router = Router();

router.post(
  "/user",
  (req: Request, res: Response, next: NextFunction) =>
    authorization.verifyToken(req, res, next),
  (req: Request, res: Response) => wordController.createWord(req, res)
);

router.get(
  "/user",
  (req: Request, res: Response, next: NextFunction) =>
    authorization.verifyToken(req, res, next),
  (req: Request, res: Response) => wordController.getWordsByUserId(req, res)
);

router.get(
  "/user/memory-game",
  (req: Request, res: Response, next: NextFunction) =>
    authorization.verifyToken(req, res, next),
  (req: Request, res: Response) =>
    wordController.getWordsForMemoryGame(req, res)
);

router.put(
  "/user",
  (req: Request, res: Response, next: NextFunction) =>
    authorization.verifyToken(req, res, next),
  (req: Request, res: Response) => wordController.updateWord(req, res)
);

router.put(
  "/user/incrementing-count-of-word-played",
  (req: Request, res: Response, next: NextFunction) =>
    authorization.verifyToken(req, res, next),
  (req: Request, res: Response) =>
    wordController.incrementCountOfWordPlayed(req, res)
);

router.put(
  "/user/refreshing-count-of-word-played",
  (req: Request, res: Response, next: NextFunction) =>
    authorization.verifyToken(req, res, next),
  (req: Request, res: Response) =>
    wordController.refreshCountOfWordPlayed(req, res)
);

router.delete(
  "/user",
  (req: Request, res: Response, next: NextFunction) =>
    authorization.verifyToken(req, res, next),
  (req: Request, res: Response) => wordController.deleteWord(req, res)
);

export { router };
