import { AddressModel } from "../models/AddressModel.js";
import { AdminModel } from "../models/AdminModel.js";
import { ProfessionalModel } from "../models/ProfessionalModel.js";
import { StudentModel } from "../models/StudentModel.js";

const createUserType = async (type, user) => {
  switch (type) {
    case "ADMIN":
      return await AdminModel.create({ user_id: user.id });
    case "STUDENT":
      return await StudentModel.create({
        user_id: user.id,
      });
    case "PROFESSIONAL":
      return await ProfessionalModel.create({
        user_id: user.id,
      });
    default:
      throw new Error("User type not defined");
  }
};

const createUserAddress = async ({ user, address }) => {
  return await AddressModel.create({
    district: address.district,
    road: address.road,
    number: address.number,
    user_id: user.id,
  });
};

const findAllOptions = {
  include: [
    {
      model: AddressModel,
      attributes: {
        exclude: ["createdAt", "updatedAt", "user_id"],
      },
    },
    {
      model: StudentModel,
      attributes: {
        exclude: ["createdAt", "updatedAt", "user_id"],
      },
    },
  ],
  attributes: {
    exclude: ["createdAt", "updatedAt", "password"],
  },
};

export { createUserType, createUserAddress, findAllOptions };
