import { API } from "../services/api.js";
import { getStorageData } from "./storage.js";

document.onreadystatechange = onReadyTrainingsheet;
const template = document.querySelector(".trainings");

const getUrlFromUserType = (userType) => {
  switch (userType) {
    case "STUDENT":
      return "/student/training-sheet";
    case "PROFESSIONAL":
      return "/professional/training-sheet";
    case "ADMIN":
      return "/admin/training-sheet";
    default:
      return userType;
  }
};

const getTrainingsheet = async () => {
  const { token, type } = getStorageData();

  const { data, status } = await API.get(getUrlFromUserType(type), {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!(status === 200)) return;

  return data;
};

const createDataSheet = (data) => {
  data.forEach((item) => {
    const row = template.cloneNode(true);

    const [frequency, student, professional, muscularGroup, exercises] =
      row.children;

    frequency.textContent = item.frequency;
    student.textContent = item.student.user.name;
    professional.textContent = item.professional.user.name;
    muscularGroup.textContent = item.musculargroup.description;
    exercises.textContent = item.exercise.description;

    row.style.display = "table-row";

    _trainings.append(row);
  });
};

async function onReadyTrainingsheet() {
  if (document.readyState === "complete") {
    const data = await getTrainingsheet();
    const rows = createDataSheet(data);
  }
}
