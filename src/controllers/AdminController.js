import { AddressModel } from "../models/AddressModel.js";
import { DatasheetModel } from "../models/DatasheetModel.js";
import { ExercisesModel } from "../models/ExercisesModel.js";
import { MuscularGroupModel } from "../models/MuscularGroupModel.js";
import { PlanModel } from "../models/PlanModel.js";
import { ProfessionalModel } from "../models/ProfessionalModel.js";
import { StudentModel } from "../models/StudentModel.js";
import { TrainingSheetModel } from "../models/TrainingSheet.js";
import { UserModel } from "../models/UserModel.js";

class AdminController {
  async findMuscularGroup(request, response) {
    try {
      const { userType } = request;

      if (!(userType === "ADMIN")) return response.status(401).json();

      const muscularGroups = await MuscularGroupModel.findAll();

      return response.status(200).json(muscularGroups);
    } catch (error) {
      return response.status(500).json({
        message: "Erro ao buscar fichas",
        error,
      });
    }
  }

  async registerMuscularGroup(request, response) {
    try {
      const { userType } = request;

      console.log(userType)

      if (!(userType === "ADMIN")) return response.status(401).json();

      const { description } = request.body;

      if ([description].includes("")) throw new Error("There are empty fields");

      const muscularGroup = await MuscularGroupModel.create({ description });

      return response.status(201).json(muscularGroup);
    } catch (error) {
      return response.status(500).json({
        message: "Erro ao criar ficha",
        error: error.message,
      });
    }
  }

  async findExercises(request, response) {
    try {
      const { userType } = request;

      if (!(userType === "ADMIN")) return response.status(401).json();

      const exercises = await ExercisesModel.findAll();

      return response.status(200).json(exercises);
    } catch (error) {
      return response.status(500).json({
        message: "Erro ao buscar fichas",
        error,
      });
    }
  }

  async registerExercises(request, response) {
    try {
      const { userType } = request;

      if (!(userType === "ADMIN")) return response.status(401).json();

      const { description } = request.body;

      if ([description].includes("")) throw new Error("There are empty fields");

      const exercise = await ExercisesModel.create({ description });

      return response.status(201).json(exercise);
    } catch (error) {
      return response.status(500).json({
        message: "Erro ao criar ficha",
        error: error.message,
      });
    }
  }

  async findTrainingSheets(request, response) {
    try {
      const { userType } = request;

      if (!(userType === "ADMIN")) return response.status(401).json();

      const trainingSheets = await TrainingSheetModel.findAll();

      return response.status(200).json(trainingSheets);
    } catch (error) {
      return response.status(500).json({
        message: "Erro ao buscar fichas",
        error,
      });
    }
  }

  async findDataSheets(request, response) {
    try {
      const { userType } = request;

      if (!(userType === "ADMIN")) return response.status(401).json();

      const dataSheets = await DatasheetModel.findAll();

      return response.status(200).json(dataSheets);
    } catch (error) {
      return response.status(500).json({
        message: "Erro ao buscar fichas",
        error,
      });
    }
  }

  async findStudents(request, response) {
    try {
      const { userType } = request;

      if (!(userType === "ADMIN")) return response.status(401).json();

      const students = await StudentModel.findAll();

      return response.status(200).json(students);
    } catch (error) {
      return response.status(500).json({
        message: "Erro ao buscar fichas",
        error,
      });
    }
  }

  async findProfessionals(request, response) {
    try {
      const { userType } = request;

      if (!(userType === "ADMIN")) return response.status(401).json();

      const professionals = await ProfessionalModel.findAll();

      return response.status(200).json(professionals);
    } catch (error) {
      return response.status(500).json({
        message: "Erro ao buscar fichas",
        error,
      });
    }
  }

  async findUsers(request, response) {
    try {
      const { userType } = request;

      if (!(userType === "ADMIN")) return response.status(401).json();

      const users = await UserModel.findAll({
        include: [
          {
            model: AddressModel,
            attributes: {
              exclude: ["createdAt", "updatedAt", "user_id"],
            },
          },
        ],
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"],
        },
      });

      return response.status(200).json(users);
    } catch (error) {
      return response.status(500).json({
        message: "Erro ao buscar fichas",
        error,
      });
    }
  }

  async findPlans(request, response) {
    try {
      const { userType } = request;

      if (!(userType === "ADMIN")) return response.status(401).json();

      const plans = await PlanModel.findAll();

      return response.status(200).json(plans);
    } catch (error) {
      return response.status(500).json({
        message: "Erro ao buscar fichas",
        error,
      });
    }
  }
}

export default new AdminController();
