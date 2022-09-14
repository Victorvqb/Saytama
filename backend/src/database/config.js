import { Sequelize } from "sequelize";
import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  String(process.env.DB_NAME),
  String(process.env.DB_USER),
  process.env.DB_PASS,
  {
    dialect: "mysql",
    host: process.env.DB_HOST,
    port: +String(process.env.DB_PORT),
  }
);

const mysqlPool = mysql.createPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

export { sequelize, mysqlPool };
