import { PlanModel } from "../models/PlanModel";

class StudentController {
  async findAllRegister(request, response) {
    try {
      return response.status(200).json(registrations);
    } catch (error) {
      return response.status(500).json({
        message: "Erro ao buscar planos",
        error,
      });
    }
  }

  async registerPlan(request, response) {
    try {
      const { useId } = request;

      const plan = await PlanModel.create({});

      return response.status(201).json(register);
    } catch (error) {
      return response.status(500).json({
        message: "Erro ao criar plano",
        error: error.message,
      });
    }
  }
}

export default new StudentController();
