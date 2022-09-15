import { UserModel } from "../models/UserModel.js";

import {
  createUserAddress,
  createUserType,
  findAllOptions,
} from "../Utils/UserUtil.js";

class UserController {

  async signUp(request, response) {
    try {
      const { name, phone, login, type, password, address } = request.body;

      if ([name, phone, login, type, password].includes(""))
        throw new Error("There are empty fields");

      const user = await UserModel.create({
        name,
        phone,
        type,
        login,
        password,
      });

      await createUserType(type, user);

      if (user && address)
        await createUserAddress({
          user,
          address,
        });

      user["password"] = undefined;

      return response.status(201).json(user);
    } catch (error) {
      return response.status(500).json({
        message: "Erro ao criar usuário",
        error: error.message,
      });
    }
  }
}

export default new UserController();
