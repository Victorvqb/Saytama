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

  async deleteMuscularGroup(request, response) {
    try {
      const { userType } = request;

      if (!(userType === "ADMIN")) return response.status(401).json();

      const { id } = request.params;

      await MuscularGroupModel.destroy({ where: { id } });
      return response.status(201).json();
    } catch (error) {
      return response.status(500).json({
        message: "Erro ao deletar ficha",
        error: error.message,
      });
    }
  }

  async updateMuscularGroup(request, response) {
    try {
      const { userType } = request;

      if (!(userType === "ADMIN")) return response.status(401).json();

      const { id } = request.params;
      const { description } = request.body;

      if ([description].includes("")) throw new Error("There are empty fields");

      await MuscularGroupModel.update({ description }, { where: { id } });

      return response.status(201).json();
    } catch (error) {
      return response.status(500).json({
        message: "Erro ao atualizar ficha",
        error: error.message,
      });
    }
  }

  async findOneMuscularGroup(request, response) {
    try {
      const { userType } = request;

      if (!(userType === "ADMIN")) return response.status(401).json();

      const { id } = request.params;

      const muscularGroup = await MuscularGroupModel.findOne({ where: { id } });

      return response.status(201).json(muscularGroup);
    } catch (error) {
      return response.status(500).json({
        message: "Erro ao atualizar ficha",
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
        message: "Erro ao buscar Exercicios",
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
        message: "Erro ao criar Exercicio",
        error: error.message,
      });
    }
  }

  async updateExercises(request, response) {
    try {
      const { userType } = request;

      if (!(userType === "ADMIN")) return response.status(401).json();

      const { id } = request.params;
      const { description } = request.body;

      if ([description].includes("")) throw new Error("There are empty fields");

      await ExercisesModel.update({ description }, { where: { id } });

      return response.status(201).json();
    } catch (error) {
      return response.status(500).json({
        message: "Erro ao atualizar Exercicio",
        error: error.message,
      });
    }
  }

  async deleteExercises(request, response) {
    try {
      const { userType } = request;

      if (!(userType === "ADMIN")) return response.status(401).json();

      const { id } = request.params;

      await ExercisesModel.destroy({ where: { id } });
      return response.status(201).json();
    } catch (error) {
      return response.status(500).json({
        message: "Erro ao deletar Exercicio",
        error: error.message,
      });
    }
  }

  async findOneExercises(request, response) {
    try {
      const { userType } = request;

      if (!(userType === "ADMIN")) return response.status(401).json();

      const { id } = request.params;

      const exercise = await ExercisesModel.findOne({ where: { id } });

      return response.status(201).json(exercise);
    } catch (error) {
      return response.status(500).json({
        message: "Erro ao buscar Exercicio",
        error: error.message,
      });
    }
  }

  async findTrainingSheets(request, response) {
    try {
      const { userType } = request;

      if (!(userType === "ADMIN")) return response.status(401).json();

      const trainingSheets = await TrainingSheetModel.findAll({
        include: [
          {
            model: StudentModel,
            include: [
              {
                model: UserModel,
                attributes: {
                  exclude: [
                    "createdAt",
                    "updatedAt",
                    "password",
                    "phone",
                    "login",
                  ],
                },
              },
            ],
            attributes: {
              exclude: ["user_id", "createdAt", "updatedAt"],
            },
          },

          {
            model: ProfessionalModel,
            include: [
              {
                model: UserModel,
                attributes: {
                  exclude: [
                    "createdAt",
                    "updatedAt",
                    "password",
                    "phone",
                    "login",
                  ],
                },
              },
            ],
            attributes: {
              exclude: ["user_id", "createdAt", "updatedAt"],
            },
          },

          {
            model: MuscularGroupModel,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },

          {
            model: ExercisesModel,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],

        attributes: {
          exclude: [
            "muscular_group_id",
            "exercise_id",
            "professional_id",
            "student_id",
          ],
        },
      });

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

      const dataSheets = await DatasheetModel.findAll({
        include: [
          {
            model: StudentModel,
            include: [
              {
                model: UserModel,
                attributes: {
                  exclude: [
                    "createdAt",
                    "updatedAt",
                    "password",
                    "phone",
                    "login",
                  ],
                },
              },
            ],
            attributes: {
              exclude: ["user_id", "createdAt", "updatedAt"],
            },
          },

          {
            model: ProfessionalModel,
            include: [
              {
                model: UserModel,
                attributes: {
                  exclude: [
                    "createdAt",
                    "updatedAt",
                    "password",
                    "phone",
                    "login",
                  ],
                },
              },
            ],
            attributes: {
              exclude: ["user_id", "createdAt", "updatedAt"],
            },
          },
        ],

        attributes: {
          exclude: ["professional_id", "student_id"],
        },
      });

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

  async registerPlan(request, response) {
    try {
      const { userType, userId } = request;
      const { price, type } = request.body;

      if (!(userType === "ADMIN")) return response.status(401).json();

      if ([price, type].includes("")) throw new Error("There are empty fields");

      const plan = await PlanModel.create({
        price,
        type,
      });

      return response.status(201).json(plan);
    } catch (error) {
      return response.status(500).json({
        message: "Erro ao criar plano",
        error: error.message,
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

  async updatePlan(request, response) {
    try {
      const { userType } = request;

      if (!(userType === "ADMIN")) return response.status(401).json();

      const { id } = request.params;
      const { price, type } = request.body;

      if ([price, type].includes("")) throw new Error("There are empty fields");

      await PlanModel.update({ price, type }, { where: { id } });

      return response.status(201).json();
    } catch (error) {
      return response.status(500).json({
        message: "Erro ao atualizar Plano",
        error: error.message,
      });
    }
  }

  async deletePlan(request, response) {
    try {
      const { userType } = request;

      if (!(userType === "ADMIN")) return response.status(401).json();

      const { id } = request.params;

      await PlanModel.destroy({ where: { id } });
      return response.status(201).json();
    } catch (error) {
      return response.status(500).json({
        message: "Erro ao deletar Plano",
        error: error.message,
      });
    }
  }

  async findOnePlan(request, response) {
    try {
      const { userType } = request;

      if (!(userType === "ADMIN")) return response.status(401).json();

      const { id } = request.params;

      const plan = await PlanModel.findOne({ where: { id } });

      return response.status(201).json(plan);
    } catch (error) {
      return response.status(500).json({
        message: "Erro ao buscar Plano",
        error: error.message,
      });
    }
  }
}

export default new AdminController();
