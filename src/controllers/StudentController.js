import { DatasheetModel } from "../models/DatasheetModel.js";
import { ExercisesModel } from "../models/ExercisesModel.js";
import { MuscularGroupModel } from "../models/MuscularGroupModel.js";
import { ProfessionalModel } from "../models/ProfessionalModel.js";
import { StudentModel } from "../models/StudentModel.js";
import { StudentPlanModel } from "../models/StudentPlan.js";
import { TrainingSheetModel } from "../models/TrainingSheet.js";
import { UserModel } from "../models/UserModel.js";

class StudentController {
  async contractPlan(request, response) {
    try {
      const { userType, userId } = request;
      const { plan_id } = request.body;

      if (!(userType === "STUDENT")) return response.status(401).json();

      const plan = await StudentPlanModel.create({
        student_id: userId,
        status: "HIRED",
        plan_id,
      });

      return response.status(200).json(plan);
    } catch (error) {
      return response.status(500).json({
        message: "Erro ao buscar fichas",
        error,
      });
    }
  }

  async revokePlan(request, response) {
    try {
      const { userType, userId } = request;

      if (!(userType === "STUDENT")) return response.status(401).json();

      const plan = await StudentPlanModel.update(
        {
          status: "CANCELED",
        },
        {
          where: {
            student_id: userId,
          },
        }
      );

      return response.status(200).json(plan);
    } catch (error) {
      return response.status(500).json({
        message: "Erro ao buscar fichas",
        error,
      });
    }
  }

  async findDatasheet(request, response) {
    try {
      const { userType, userId } = request;

      if (!(userType === "STUDENT")) return response.status(401).json();

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

        where: {
          student_id: userId,
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

  async findTrainingSheet(request, response) {
    try {
      const { userType, userId } = request;

      if (!(userType === "STUDENT")) return response.status(401).json();

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

        where: {
          student_id: userId,
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
}

export default new StudentController();
