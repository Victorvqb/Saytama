import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { authenticate, sync } from "./database/connection.js";
import { sequelize as connection } from "./database/config.js";
import routes from "./routes/routes.js";

const server = async () => {
  try {
    dotenv.config();

    const app = express();
    await authenticate(connection);
    await sync(connection);

    app.use(cors());
    app.use(express.json());
    app.use("/v1", routes);

    app.listen(process.env.SERVER_PORT, () => {
      console.log("Server listen on port: ", process.env.SERVER_PORT);
    });

  } catch (error) {
    console.log("Error: ", error.message);
    console.log("Server Error: ", error);
  }
};

server();
