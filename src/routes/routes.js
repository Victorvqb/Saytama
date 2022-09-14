import express from "express";
import { AdminRoute } from "./AdminRoute.js";
import { AuthRoute } from "./AuthRoute.js";
import { ProfessionalRoute } from "./ProfessionalRoute.js";
import { UserRoute } from "./UserRoute.js";

const routes = express.Router();

routes.use("/auth", AuthRoute);
routes.use("/user", UserRoute);
routes.use("/professional", ProfessionalRoute);
routes.use("/admin", AdminRoute);

export default routes;
