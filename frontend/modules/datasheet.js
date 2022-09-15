import { API } from "../services/api.js";
import { getStorageData } from "./storage.js";

document.onreadystatechange = onReadyDatasheet;
const template = document.querySelector(".datasheets");

const getUrlFromUserType = (userType) => {
  switch (userType) {
    case "STUDENT":
      return "/student/data-sheet";
    case "PROFESSIONAL":
      return "/professional/data-sheet";
    case "ADMIN":
      return "/admin/data-sheet";
    default:
      return userType;
  }
};

const getDatasheet = async () => {
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

    const [weight, height, student, professional] = row.children;

    weight.textContent = item.weight;
    height.textContent = item.height;
    student.textContent = item.student.user.name;
    professional.textContent = item.professional.user.name;

    row.style.display = "table-row";

    _datasheets.append(row);
  });
};

async function onReadyDatasheet() {
  if (document.readyState === "complete") {
    const data = await getDatasheet();
    const rows = createDataSheet(data);
  }
}
