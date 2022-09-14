import { DataTypes } from "sequelize";
import { sequelize as connection } from "../database/config.js";

const AddressModel = connection.define("address", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  district: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  road: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export { AddressModel };
