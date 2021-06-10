import React from "react";
import {LoginComponent} from "./LoginComponent";
import {HomeComponent} from "./HomeComponent";
import {useSelector} from "react-redux";

export const LandingComponent = () => {
  
  const currentState = useSelector((state) => state.login);
  
  return (
    <div>
      {currentState.loginState ?
        <HomeComponent/>
        :
        <LoginComponent/>
      }
    </div>
  )
}
