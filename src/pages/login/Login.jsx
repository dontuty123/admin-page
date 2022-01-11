import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../redux/apiCalls";
import "./login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  return (
    <div className="login">
      <input
        type="text"
        placeholder="username"
        className="loginUser"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        className="loginUser"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Link to="/" className="link">
        <button className="loginButton">Login</button>
      </Link>
    </div>
  );
}
