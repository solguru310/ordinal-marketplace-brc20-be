import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import inscriptionRouter from "./route/inscription.route";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 6000;

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(async () => {
    console.log("Connected to the database!");
    app.listen(port, async () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.get("/", (req: Request, res: Response) => {
  res.send("<h3>Marketplace API is up and running.</h3>");
});

app.use("/api/inscription", inscriptionRouter);
