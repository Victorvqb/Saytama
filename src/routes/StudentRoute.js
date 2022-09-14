import express from "express";
import dotenv from "dotenv";

dotenv.config();

import StudentController from "../controllers/StudentController.js";
import { AuthMiddleware } from "../Middlewares/AuthMiddleware.js";

const StudentRoute = express.Router();

StudentRoute.get(
  "/data-sheet",
  AuthMiddleware,
  StudentController.findDatasheet
);

StudentRoute.get(
  "/training-sheet",
  AuthMiddleware,
  StudentController.findTrainingSheet
);

StudentRoute.post("/plan", AuthMiddleware, StudentController.contractPlan);
StudentRoute.patch("/plan", AuthMiddleware, StudentController.revokePlan);

export { StudentRoute };
