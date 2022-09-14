import { DataTypes } from "sequelize";
import { sequelize as connection } from "../database/config.js";
import { ProfessionalModel } from "./ProfessionalModel.js";
import { StudentModel } from "./StudentModel.js";

const DatasheetModel = connection.define("datasheets", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  weight: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  height: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

// Has Many Association

DatasheetModel.belongsTo(ProfessionalModel, {
  foreignKey: "professional_id",
  constraints: true,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

ProfessionalModel.hasMany(DatasheetModel, {
  foreignKey: "professional_id",
  constraints: true,
  onDelete: "CASCADE",     
  onUpdate: "CASCADE",
});

DatasheetModel.belongsTo(StudentModel, {
  foreignKey: "student_id",
  constraints: true,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export { DatasheetModel };
