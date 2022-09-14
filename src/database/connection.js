import * as dotenv from "dotenv";

import { mysqlPool } from "./config.js";

dotenv.config();

const defineDB = (connection) => {
  return new Promise((resolve, reject) => {
    connection.query(String(process.env.MYSQL_CREATE_DB), (error, results) =>
      error ? reject(error) : resolve(results)
    );
  });
};

const sync = async (connection) => {
  try {
    // await connection.sync({ force: true, alter: true });
    await connection.sync({ force: false, alter: false });
    console.log("🎲 => Database synced successfully");
  } catch (error) {
    console.error("🚨 => Failed to sync database: ", error.message);
  }
};

const authenticate = async (connection) => {
  try {
    await defineDB(mysqlPool);
    await connection.authenticate();

    console.log("🎲 => Database connected successfully");
  } catch (error) {
    error instanceof Error &&
      console.error("🚨 => Failed to connect database: ", error.message);
  }
};

export { sync, authenticate };
