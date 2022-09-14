import { DataTypes } from "sequelize";
import { sequelize as connection } from "../database/config.js";

const ProfessionalModel = connection.define("professionals", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
});

export { ProfessionalModel };
