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
  "/data-sheet/:id",
  AuthMiddleware,
  ProfessionalController.findOneDatasheet
);

ProfessionalRoute.delete(
  "/data-sheet/:id",
  AuthMiddleware,
  ProfessionalController.deleteDatasheet
);

ProfessionalRoute.patch(
  "/data-sheet/:id",
  AuthMiddleware,
  ProfessionalController.updateDatasheet
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

ProfessionalRoute.get(
  "/training-sheet/:id",
  AuthMiddleware,
  ProfessionalController.findOneTrainingSheet
);

ProfessionalRoute.delete(
  "/training-sheet/:id",
  AuthMiddleware,
  ProfessionalController.deleteTrainingSheet
);

ProfessionalRoute.patch(
  "/training-sheet/:id",
  AuthMiddleware,
  ProfessionalController.updateTrainingSheet
);

export { ProfessionalRoute };
