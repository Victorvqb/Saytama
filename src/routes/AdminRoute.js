import express from "express";
import dotenv from "dotenv";

import AdminController from "../controllers/AdminController.js";
import { AuthMiddleware } from "../Middlewares/AuthMiddleware.js";

dotenv.config();

const AdminRoute = express.Router();

AdminRoute.get(
  "/muscular-group",
  AuthMiddleware,
  AdminController.findMuscularGroup
);
AdminRoute.post(
  "/muscular-group",
  AuthMiddleware,
  AdminController.registerMuscularGroup
);

AdminRoute.get("/exercise", AuthMiddleware, AdminController.findExercises);
AdminRoute.post("/exercise", AuthMiddleware, AdminController.registerExercises);

AdminRoute.get(
  "/training-sheet",
  AuthMiddleware,
  AdminController.findTrainingSheets
);
AdminRoute.get("/data-sheet", AuthMiddleware, AdminController.findDataSheets);
AdminRoute.get("/student", AuthMiddleware, AdminController.findStudents);
AdminRoute.get("/professional", AuthMiddleware, AdminController.findStudents);
AdminRoute.get("/user", AuthMiddleware, AdminController.findUsers);
AdminRoute.get("/plan", AuthMiddleware, AdminController.findPlans);

export { AdminRoute };
