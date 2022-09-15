export const getStorageData = () =>
  JSON.parse(localStorage.getItem("auth")) || [];

export const saveFromStorage = ({ token, user: { name, type } }) => {
  const storage = getStorageData();

  if (storage) clearStorage();

  localStorage.setItem("auth", JSON.stringify({ token, name, type }));
};

export const clearStorage = () => localStorage.clear();
