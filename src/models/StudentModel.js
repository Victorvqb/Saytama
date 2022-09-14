import { DataTypes } from "sequelize";
import { sequelize as connection } from "../database/config.js";
import { PlanModel } from "./PlanModel.js";
import { TrainingSheetModel } from "./TrainingSheet.js";
import { UserModel } from "./UserModel.js";

const StudentModel = connection.define("students", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
});

StudentModel.belongsTo(UserModel, {
  foreignKey: "user_id",
  constraints: true,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

PlanModel.belongsTo(StudentModel, {
  foreignKey: "student_id",
  constraints: true,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

StudentModel.hasOne(PlanModel, {
  foreignKey: "student_id",
  constraints: true,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

TrainingSheetModel.belongsTo(StudentModel, {
  foreignKey: "student_id",
  constraints: true,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

StudentModel.hasMany(TrainingSheetModel, {
  foreignKey: "student_id",
  constraints: true,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export { StudentModel };
