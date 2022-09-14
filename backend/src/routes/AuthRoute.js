import express from "express";
import dotenv from "dotenv";

dotenv.config();

import AuthController from "../controllers/AuthController.js";

const AuthRoute = express.Router();

AuthRoute.post("/singin", AuthController.singin);

export { AuthRoute };
