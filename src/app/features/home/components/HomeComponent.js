import React from "react";
import "./LoginComponent.css";
import {CardComponent} from "../../shared/components/CardComponent";

export const HomeComponent = () => {
  const stubbedText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  return (
    <div className="d-flex flex-row justify-content-around flex-wrap">
      <CardComponent title="User Directory" description={stubbedText} redirectTo={"#"}/>
      <CardComponent title="Account Directory" description={stubbedText} redirectTo={"/accounts"}/>
      <CardComponent title="Card Directory" description={stubbedText} redirectTo={"/cards"}/>
      <CardComponent title="Loan Directory" description={stubbedText} redirectTo={"/loans"}/>
      <CardComponent title="Transaction Directory" description={stubbedText} redirectTo={"#"}/>
    </div>
  )
}
