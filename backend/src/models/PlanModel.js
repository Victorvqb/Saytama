import { DataTypes } from "sequelize";
import { sequelize as connection } from "../database/config.js";

const PlanModel = connection.define("plans", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export { PlanModel };
