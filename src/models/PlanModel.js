import { DataTypes } from "sequelize";
import { sequelize as connection } from "../database/config.js";

const PlanModel = connection.define("plans", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  type: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

export { PlanModel };
