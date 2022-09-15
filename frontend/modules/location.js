import { getStorageData } from "./storage.js";

export const redirectTo = () => {
  const { type } = getStorageData();

  form_login.reset();

  switch (type) {
    case "STUDENT":
      return (window.location.href = "student/dashboard/datasheet.html");
    case "PROFESSIONAL":
      return (window.location.href = "professional/dashboard/datasheet.html");
    case "ADMIN":
      return (window.location.href = "admin/dashboard/datasheet.html");
    default:
      return userType;
  }
};
