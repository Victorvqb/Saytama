import { DataTypes } from "sequelize";
import { sequelize as connection } from "../database/config.js";
import { TrainingSheetModel } from "./TrainingSheet.js";

const ExercisesModel = connection.define("exercises", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});



export { ExercisesModel };
