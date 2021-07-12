import React from "react";
import {LoginComponent} from "./LoginComponent";
import {HomeComponent} from "./HomeComponent";
import {useSelector} from "react-redux";

export const LandingComponent = () => {

  const currentState = useSelector((state) => state.login);
  console.log(currentState);

  return (
    <div>
      {currentState.isLoggedIn ?
        <HomeComponent/>
        :
        <LoginComponent/>
      }
    </div>
  )
}
