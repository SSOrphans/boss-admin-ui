import React from "react";
import "./LoginComponent.css";
import {useDispatch} from "react-redux";
import {login} from "../slices/home-login-slice"

export const LoginComponent = () => {
  const dispatch = useDispatch();
  
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login());
  }
  
  return (
    <div className="login-component">
      <h1 className="login-title d-flex justify-content-center">Bank of Smoothstack</h1>
      <form className="d-flex flex-column" onSubmit={handleLogin} method="POST">
        <input type="text" id="login" className="fadeIn second" name="username" placeholder="login"/>
        <input type="text" id="password" className="fadeIn third" name="password" placeholder="password"/>
        <input type="submit" className="fadeIn fourth" value="Log In"/>
      </form>
    </div>
  )
}
