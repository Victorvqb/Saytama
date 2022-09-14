import { DataTypes } from "sequelize";
import { sequelize as connection } from "../database/config.js";
import { PlanModel } from "./PlanModel.js";
import { StudentPlanModel } from "./StudentPlan.js";
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

StudentModel.belongsToMany(PlanModel, {
  foreignKey: "student_id",
  through: {
    model: StudentPlanModel,
  },
  constraints: true,
});

PlanModel.belongsToMany(StudentModel, {
  foreignKey: "plan_id",
  through: {
    model: StudentPlanModel,
  },
  constraints: true,
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
