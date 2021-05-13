import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { test } from "../slicers/cardSlice";

export const CardDetail = () => {
  const cardDetail = useSelector((state) => state.card);

  const dispatch = useDispatch();

  const testBtn = () => {
    dispatch(test("hi world!"));
  };

  return (
    <div>
      <p>{cardDetail.something}</p>
      <button type="button" onClick={testBtn}>
        click me!
      </button>
    </div>
  );

  // const renderCard = cardDetail.map(detail => (
  //   <div>
  //     <p>{detail.something}</p>
  //     <button type="button" onClick={testBtn}>click me!</button>
  //   </div>
  // ));

  // return <div>{renderCard}</div>;
};
