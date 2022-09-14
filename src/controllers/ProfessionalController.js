import { ProfessionalModel } from "../models/ProfessionalModel.js";
import { DatasheetModel } from "../models/DatasheetModel.js";
import { StudentModel } from "../models/StudentModel.js";
import { UserModel } from "../models/UserModel.js";
import { TrainingSheetModel } from "../models/TrainingSheet.js";
import { ExercisesModel } from "../models/ExercisesModel.js";
import { MuscularGroupModel } from "../models/MuscularGroupModel.js";

class ProfessionalController {
  async registerDatasheet(request, response) {
    try {
      const { userType, userId } = request;

      if (!(userType === "PROFESSIONAL")) return response.status(401).json();

      const { weight, height, student_id } = request.body;

      if ([weight, height, student_id].includes(""))
        throw new Error("There are empty fields");

      const dataSheet = await DatasheetModel.create({
        weight,
        height,
        student_id,
        professional_id: userId,
      });

      return response.status(201).json(dataSheet);
    } catch (error) {
      return response.status(500).json({
        message: "Erro ao criar ficha",
        error: error.message,
      });
    }
  }

  async findDatasheet(request, response) {
    try {
      const { userType, userId } = request;

      if (!(userType === "PROFESSIONAL")) return response.status(401).json();

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
          professional_id: userId,
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

  async deleteDatasheet(request, response) {
    try {
      const { id } = request.params;
      const { userType, userId } = request;

      if (!(userType === "PROFESSIONAL")) return response.status(401).json();

      await DatasheetModel.destroy({ where: { id } });

      return response.status(200).json();
    } catch (error) {
      return response.status(500).json({
        message: "Erro ao deletar ficha",
        error: error.message,
      });
    }
  }

  async updateDatasheet(request, response) {
    try {
      const { id } = request.params;
      const { weight, height } = request.body;
      const { userType, userId } = request;

      if (!(userType === "PROFESSIONAL")) return response.status(401).json();

      await DatasheetModel.update({ weight, height }, { where: { id } });

      return response.status(200).json();
    } catch (error) {
      return response.status(500).json({
        message: "Erro ao atualizar ficha",
        error: error.message,
      });
    }
  }

  async findOneDatasheet(request, response) {
    try {
      const { id } = request.params;
      const { weight, height } = request.body;
      const { userType, userId } = request;

      if (!(userType === "PROFESSIONAL")) return response.status(401).json();

      const dataSheet = await DatasheetModel.findOne({
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
          professional_id: userId,
          id,
        },
      });

      return response.status(200).json(dataSheet);
    } catch (error) {
      return response.status(500).json({
        message: "Erro ao buscar ficha",
        error: error.message,
      });
    }
  }

  async registerTrainingSheet(request, response) {
    try {
      const { userType, userId } = request;

      if (!(userType === "PROFESSIONAL")) return response.status(401).json();

      const { frequency, muscular_group_id, exercise_id, student_id } =
        request.body;

      if ([frequency, muscular_group_id, exercise_id, student_id].includes(""))
        throw new Error("There are empty fields");

      const trainingSheet = await TrainingSheetModel.create({
        frequency: frequency.join("/"),
        muscular_group_id,
        exercise_id,
        student_id,
        professional_id: userId,
      });

      return response.status(201).json(trainingSheet);
    } catch (error) {
      return response.status(500).json({
        message: "Erro ao criar ficha",
        error: error.message,
      });
    }
  }

  async findTrainingSheet(request, response) {
    try {
      const { userType, userId } = request;

      if (!(userType === "PROFESSIONAL")) return response.status(401).json();

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
          professional_id: userId,
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

  async deleteTrainingSheet(request, response) {
    try {
      const { id } = request.params;
      const { userType, userId } = request;

      if (!(userType === "PROFESSIONAL")) return response.status(401).json();

      await TrainingSheetModel.destroy({ where: { id } });

      return response.status(200).json();
    } catch (error) {
      return response.status(500).json({
        message: "Erro ao deletar ficha",
        error: error.message,
      });
    }
  }

  async updateTrainingSheet(request, response) {
    try {
      const { id } = request.params;
      const { frequency, muscular_group_id, exercise_id } = request.body;
      const { userType, userId } = request;

      if (!(userType === "PROFESSIONAL")) return response.status(401).json();

      await TrainingSheetModel.update(
        { frequency: frequency.join("/"), muscular_group_id, exercise_id },
        { where: { id } }
      );

      return response.status(200).json();
    } catch (error) {
      return response.status(500).json({
        message: "Erro ao atualizar ficha",
        error: error.message,
      });
    }
  }

  async findOneTrainingSheet(request, response) {
    try {
      const { id } = request.params;
      const { weight, height } = request.body;
      const { userType, userId } = request;

      if (!(userType === "PROFESSIONAL")) return response.status(401).json();

      const dataSheet = await TrainingSheetModel.findOne({
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
          professional_id: userId,
        },
      });

      return response.status(200).json(dataSheet);
    } catch (error) {
      return response.status(500).json({
        message: "Erro ao buscar ficha",
        error: error.message,
      });
    }
  }
}

export default new ProfessionalController();
