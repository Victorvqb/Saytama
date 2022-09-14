import express from "express";
import dotenv from "dotenv";

dotenv.config();

import ProfessionalController from "../controllers/ProfessionalController.js";
import { AuthMiddleware } from "../Middlewares/AuthMiddleware.js";

const ProfessionalRoute = express.Router();

ProfessionalRoute.get(
  "/data-sheet",
  AuthMiddleware,
  ProfessionalController.findDatasheet
);
ProfessionalRoute.post(
  "/data-sheet",
  AuthMiddleware,
  ProfessionalController.registerDatasheet
);

ProfessionalRoute.get(
  "/training-sheet",
  AuthMiddleware,
  ProfessionalController.findTrainingSheet
);
ProfessionalRoute.post(
  "/training-sheet",
  AuthMiddleware,
  ProfessionalController.registerTrainingSheet
);

export { ProfessionalRoute };
