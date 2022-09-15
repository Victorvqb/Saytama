import express from "express";
import dotenv from "dotenv";

dotenv.config();

import UserController from "../controllers/UserController.js";

const UserRoute = express.Router();

UserRoute.post("/", UserController.signUp);

export { UserRoute };
