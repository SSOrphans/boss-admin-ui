import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCardDetail } from "../../services/cardService";

export const CardDetail = () => {
  const currentState = useSelector((state) => state.cardDetail);
  const dispatch = useDispatch();

  const [card] = currentState.cards;

  useEffect(() => {
    if(currentState.status === "init"){
      dispatch(getCardDetail(2));
    }
  });

  return (
    <div style={{ margin: "25px" }}>
      <p>Card ID: {card.id}</p>
      <p>Card NumberHash: {card.numberHash}</p>
      <p>Card AccountID: {card.accountId}</p>
      <p>Card Created: {card.created}</p>
      <p>Card ActiveSince: {card.activeSince}</p>
      <p>Card ExpirationDate: {card.expirationDate}</p>
      <p>Card PIN: {card.pin}</p>
      <p>Card CVV: {card.cvv}</p>
      <p>Card isConfirmed: {card.confirmed.toString()}</p>
      <p>Card isActive: {card.active.toString()}</p>
      <p>Card isStolen: {card.stolen.toString()}</p>
      <p>Card CardType: {card.cardType}</p>
    </div>
  );
};
