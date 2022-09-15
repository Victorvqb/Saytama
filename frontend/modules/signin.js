import { API } from "../services/api.js";
import { redirectTo } from "./location.js";
import { saveFromStorage } from "./storage.js";

document.onreadystatechange = onReadyLogin;

const onHandleLogin = async (event) => {
  event.preventDefault();

  const data = Object.fromEntries(new FormData(form_login).entries());

  const { _login, _password } = data;

  if ([_login, _password].includes("")) return;

  const {
    data: { token, user },
    status,
  } = await API.post("/auth/signin", {
    login: _login,
    password: _password,
  });

  if (!(status === 200)) return;

  saveFromStorage({ token, user });

  setTimeout(redirectTo, 4000);
};

function onReadyLogin() {
  if (document.readyState === "complete") {
    _signin.onclick = onHandleLogin;
  }
}
