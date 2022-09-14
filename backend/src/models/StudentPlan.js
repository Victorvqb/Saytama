import { DataTypes } from "sequelize";
import { sequelize as connection } from "../database/config.js";

const StudentPlanModel = connection.define("student_plan", {
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
});

export { StudentPlanModel };
