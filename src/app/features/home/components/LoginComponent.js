import React from "react";
import "./LoginComponent.css";
import { useDispatch } from "react-redux";
import { login } from "../../services/login-service";

export const LoginComponent = () => {
  const dispatch = useDispatch();

  const handleLogin = (event) => {
    event.preventDefault();
    console.log(`${event.target.username.value}`);
    console.log(`${event.target.password.value}`);
    dispatch(login({
      username: event.target.username.value,
      password: event.target.password.value
    }));
  };

  return (
    <div className="login-component">
      <h1 className="login-title d-flex justify-content-center">Bank of Smoothstack</h1>
      <form className="d-flex flex-column" onSubmit={handleLogin} method="POST">
        <input type="text" id="login" className="fadeIn second" name="username" placeholder="username"/>
        <input type="password" id="password" className="fadeIn third" name="password" placeholder="password"/>
        <input type="submit" className="fadeIn fourth" value="Log In"/>
      </form>
    </div>
  )
}
