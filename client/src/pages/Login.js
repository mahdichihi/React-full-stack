import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = () => {
    const data = { userName: userName, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
        localStorage.setItem("accessToken", response.data.error);
        console.log(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data);
        navigate("/");
      }
    });
  };
  return (
    <div className="loginPage">
      <div className="formContainer">
        <label htmlFor="userNameLogin">Your username:</label>
        <input
          className="inputCreatePost"
          id="userNameLogin"
          type="text"
          onChange={(event) => {
            const value = event.target.value.trim(); // remove white spaces before and after the input value
            setUserName(value);
          }}
        ></input>
        <label htmlFor="passwordLogin">Your password:</label>

        <input
          className="inputCreatePost"
          id="passwordLogin"
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        ></input>
        <button onClick={login}>Login</button>
      </div>
    </div>
  );
};

export default Login;
