import express, { Request, Response, NextFunction } from "express";
import InscriptionController from "../controller/inscription.controller";

const router = express.Router();

// Middleware for logging requests to this router
router.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Raffle request received: ${req.method} ${req.originalUrl}`);
  next();
});

router.post(
  "/list",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await InscriptionController.listInscription(req, res);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/unlist",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await InscriptionController.unlistInscription(req, res);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/all", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await InscriptionController.getAllInscriptions(req, res);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/address/:sellerAddress",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await InscriptionController.getInscriptionsByAddress(req, res);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/inscriptionId/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
        await InscriptionController.getInscriptionsById(req, res);
    } catch (error) {
        next(error);
    }
  }
);

export default router;