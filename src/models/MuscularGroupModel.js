import { DataTypes } from "sequelize";
import { sequelize as connection } from "../database/config.js";
import { TrainingSheetModel } from "./TrainingSheet.js";

const MuscularGroupModel = connection.define("musculargroups", {
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



export { MuscularGroupModel };
