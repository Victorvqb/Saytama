import { API } from "../services/api.js";

document.onreadystatechange = onReadySignUp;

const onHandleSignUp = async (event) => {
  event.preventDefault();

  const data = Object.fromEntries(new FormData(form_signup).entries());

  const { _login, _password, _district, _name, _number, _phone, _road, _type } =
    data;

  if (
    [
      _login,
      _password,
      _district,
      _name,
      _number,
      _phone,
      _road,
      _type,
    ].includes("")
  )
    return;

  const { status } = await API.post("/user", {
    name: _name,
    phone: _phone,
    login: _login,
    password: _password,
    type: _type,
    address: {
      district: _district,
      road: _road,
      number: _number,
    },
  });

  if (!(status === 201)) return;

  setTimeout(function () {
    form_signup.reset();
    window.location.href = "index.html";
  }, 4000);
};

function onReadySignUp() {
  if (document.readyState === "complete") {
    _signup.onclick = onHandleSignUp;
  }
}
