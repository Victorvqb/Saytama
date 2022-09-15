export const API = axios.create({
  baseURL: "http://localhost:3080/v1",
  timeout: 1000,
//   headers: { Authorization: `Bearer ${API_TOKEN}` },
});