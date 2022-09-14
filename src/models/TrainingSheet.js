import { DataTypes } from "sequelize";
import { sequelize as connection } from "../database/config.js";
import { ExercisesModel } from "./ExercisesModel.js";
import { MuscularGroupModel } from "./MuscularGroupModel.js";
import { ProfessionalModel } from "./ProfessionalModel.js";

const TrainingSheetModel = connection.define("trainingsheets", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  frequency: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

TrainingSheetModel.belongsTo(MuscularGroupModel, {
  foreignKey: "muscular_group_id",
  constraints: true,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

MuscularGroupModel.hasOne(TrainingSheetModel, {
  foreignKey: "muscular_group_id",
  constraints: true,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

TrainingSheetModel.belongsTo(ExercisesModel, {
  foreignKey: "exercise_id",
  constraints: true,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

ExercisesModel.hasOne(TrainingSheetModel, {
  foreignKey: "exercise_id",
  constraints: true,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});


TrainingSheetModel.belongsTo(ProfessionalModel, {
  foreignKey: "professional_id",
  constraints: true,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

ProfessionalModel.hasMany(TrainingSheetModel, {
  foreignKey: "professional_id",
  constraints: true,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export { TrainingSheetModel };
