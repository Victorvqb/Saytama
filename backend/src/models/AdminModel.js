import { DataTypes } from "sequelize";
import { sequelize as connection } from "../database/config.js";
import { UserModel } from "./UserModel.js";

const AdminModel = connection.define("administrators", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
});

export { AdminModel };
