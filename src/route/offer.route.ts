import express, { Request, Response, NextFunction } from "express";
import OfferController from "../controller/offer.controller";

const router = express.Router();

// Middleware for logging requests to this router
router.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`API request received: ${req.method} ${req.originalUrl}`);
  next();
});

router.post(
  "/psbt",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body);
      await OfferController.requestPsbt(req, res);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/add", async (req: Request, res: Response, next: NextFunction) => {
    try {
        await OfferController.requestOffer(req, res);
    } catch (error) {
        next(error);
    }
})

router.get("/remove/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        await OfferController.rejectOffer(req, res);
    } catch (error) {
        next(error);
    }
})

router.post("/accept", async (req: Request, res: Response, next: NextFunction) => {
    try {
        await OfferController.acceptOffer(req, res);
    } catch (error) {
        next(error);
    }
})

router.get("/all/inscription/:inscriptionId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        await OfferController.getAllOffers(req, res);
    } catch (error) {
        next(error);
    }
})

router.post("/test", async (req: Request, res: Response, next: NextFunction) => {
    await OfferController.test(req, res);
})

export default router;