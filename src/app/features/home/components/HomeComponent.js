import React from "react";
import {LoginComponent} from "./LoginComponent";
import {useSelector} from "react-redux";

export const HomeComponent = () => {
  
  const currentState = useSelector((state) => state.login);
  
  return (
    <div>
      {currentState.loginState ?
        ""
        :
        <LoginComponent/>
      }
    </div>
  )
}
