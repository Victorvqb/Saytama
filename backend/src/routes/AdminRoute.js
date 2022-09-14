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

AdminRoute.get(
  "/muscular-group/:id",
  AuthMiddleware,
  AdminController.findOneMuscularGroup
);

AdminRoute.patch(
  "/muscular-group/:id",
  AuthMiddleware,
  AdminController.updateMuscularGroup
);

AdminRoute.delete(
  "/muscular-group/:id",
  AuthMiddleware,
  AdminController.deleteMuscularGroup
);


AdminRoute.get("/exercise", AuthMiddleware, AdminController.findExercises);
AdminRoute.post("/exercise", AuthMiddleware, AdminController.registerExercises);

AdminRoute.get(
  "/exercise/:id",
  AuthMiddleware,
  AdminController.findOneExercises
);

AdminRoute.patch(
  "/exercise/:id",
  AuthMiddleware,
  AdminController.updateExercises
);

AdminRoute.delete(
  "/exercise/:id",
  AuthMiddleware,
  AdminController.deleteExercises
);

AdminRoute.get(
  "/training-sheet",
  AuthMiddleware,
  AdminController.findTrainingSheets
);

AdminRoute.get("/data-sheet", AuthMiddleware, AdminController.findDataSheets);

AdminRoute.get("/student", AuthMiddleware, AdminController.findStudents);
AdminRoute.get("/professional", AuthMiddleware, AdminController.findStudents);
AdminRoute.get("/user", AuthMiddleware, AdminController.findUsers);

AdminRoute.post("/plan", AuthMiddleware, AdminController.registerPlan);
AdminRoute.get("/plan", AuthMiddleware, AdminController.findPlans);

AdminRoute.get(
  "/plan/:id",
  AuthMiddleware,
  AdminController.findOnePlan
);

AdminRoute.patch(
  "/plan/:id",
  AuthMiddleware,
  AdminController.updatePlan
);

AdminRoute.delete(
  "/plan/:id",
  AuthMiddleware,
  AdminController.deletePlan
);

export { AdminRoute };
