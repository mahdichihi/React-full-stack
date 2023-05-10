import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

const Login = () => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  const navigate = useNavigate();

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
        // localStorage.setItem("accessToken", response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data);
        setAuthState(true);
        navigate("/");
      }
    });
  };
  return (
    <div className="loginPage">
      <div className="formContainer">
        <label htmlFor="usernameLogin">Your username:</label>
        <input
          className="inputCreatePost"
          id="usernameLogin"
          type="text"
          onChange={(event) => {
            const value = event.target.value.trim(); // remove white spaces before and after the input value
            setusername(value);
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
