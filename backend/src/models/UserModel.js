import bcrypt from "bcrypt";
import { DataTypes } from "sequelize";
import { sequelize as connection } from "../database/config.js";
import { AddressModel } from "./AddressModel.js";
import { AdminModel } from "./AdminModel.js";
import { ProfessionalModel } from "./ProfessionalModel.js";
import { StudentModel } from "./StudentModel.js";

const hooks = {
  beforeCreate: (user) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
  },

  beforeUpdate: (user) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
  },
};

const UserModel = connection.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    phone: {
      type: DataTypes.STRING(17),
      allowNull: false,
    },

    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    login: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  {
    hooks,
  }
);

// Address

AddressModel.belongsTo(UserModel, {
  foreignKey: "user_id",
  constraints: true,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

UserModel.hasMany(AddressModel, {
  foreignKey: "user_id",
  constraints: true,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});


// Admin
AdminModel.belongsTo(UserModel, {
  foreignKey: "user_id",
  constraints: true,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// Professional
ProfessionalModel.belongsTo(UserModel, {
  foreignKey: "user_id",
  constraints: true,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export { UserModel };
