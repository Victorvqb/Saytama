import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ProfessionalModel } from "../models/ProfessionalModel.js";
import { StudentModel } from "../models/StudentModel.js";
import { UserModel } from "../models/UserModel.js";

const getIdFromTypeUser = async (user) => {
  switch (user.type) {
    case "ADMIN":
      return user.id;
    case "STUDENT":
      const student = await StudentModel.findOne({
        where: { user_id: user.id },
      });

      return student.id;
    case "PROFESSIONAL":
      const professional = await ProfessionalModel.findOne({
        where: { user_id: user.id },
      });

      return professional.id;
    default:
      return user;
  }
};

class AuthController {
  async singin(request, response) {
    try {
      const { login, password } = request.body;

      const user = await UserModel.findOne({
        where: { login },
      });

      if (!user) return response.sendStatus(401);

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) return response.sendStatus(401);

      const userId = await getIdFromTypeUser(user);

      const token = jwt.sign(
        { id: userId, userType: user.type },
        String(process.env.JWT_SECRET),
        {
          expiresIn: "1h",
        }
      );

      return response.status(200).json({
        user: {
          name: user.name,
          type: user.type,
          login: user.login,
        },
        token,
      });
    } catch (error) {
      return response.status(500).json({
        message: "Erro ao autenticar",
        error,
      });
    }
  }
}

export default new AuthController();
