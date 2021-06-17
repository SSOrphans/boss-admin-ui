import React from "react";
import ReactDatePicker from "react-datepicker";

import { useDispatch } from "react-redux";
import {
  validAccountId,
  validCvv,
  validNumberHash,
  validPin,
} from "../../../regex";

export const CardFormInput = ({currentState, validForm, updateCard}) => {
  const dispatch = useDispatch();
  const card = Object.entries(currentState.card).map(([key, value]) => [
    key,
    value,
  ]);

  function handler(name, event, date) {
    let newCard = Object.fromEntries(card);
    if (event !== null) {
      newCard[name] = event.target.value;
    } else {
      newCard[name] = date;
    }

    let newState = Object.entries(currentState).map(([key, value]) => {
      switch (key) {
        case "isValidNumberHash":
          return [key, validNumberHash.test(newCard.numberHash)];
        case "isValidAccountId":
          return [key, validAccountId.test(newCard.accountId)];
        case "isValidCvv":
          return [key, validCvv.test(newCard.cvv)];
        case "isValidPin":
          return [key, validPin.test(newCard.pin)];
        case "isSavable":
          if (
            validNumberHash.test(newCard.numberHash) &&
            validAccountId.test(newCard.accountId) &&
            validCvv.test(newCard.cvv) &&
            validPin.test(newCard.pin)
          ) {
            return [key, true];
          }
          return [key, false];
        default:
          return [key, value];
      }
    });

    dispatch(validForm(Object.fromEntries(newState)));
    dispatch(updateCard(newCard));
  }

  const formInputs = card.map(([key, value]) => {
    switch (key) {
      case "created":
      case "activeSince":
      case "expirationDate":
        return (
          <td key={key}>
            <ReactDatePicker
              className="col"
              selected={new Date(value)}
              onChange={(date) => handler(key, null, date)}
              disabled={currentState.status === "pending"}
            />
          </td>
        );
      case "numberHash":
      case "accountId":
      case "pin":
      case "cvv":
        return (
          <td key={key}>
            <input
              className="col"
              placeholder={value.toString()}
              onChange={(event) => handler(key, event, null)}
              disabled={currentState.status === "pending"}
            />
          </td>
        );
      case "confirmed":
      case "stolen":
      case "active":
        return (
          <td key={key}>
            <select
              className="col"
              defaultValue={value.toString()}
              onChange={(event) => handler(key, event, null)}
              disabled={currentState.status === "pending"}
            >
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
          </td>
        );
      case "cardType":
        return (
          <td key={key}>
            <select
              className="col"
              defaultValue={value.toString()}
              onChange={(event) => handler(key, event, null)}
              disabled={currentState.status === "pending"}
            >
              <option value="CARD_PLAIN">CARD_PLAIN</option>
              <option value="CARD_GOLD">CARD_GOLD</option>
              <option value="CARD_PLATINUM">CARD_PLATINUM</option>
            </select>
          </td>
        );
      default:
        return <td key={key}>{value.toString()}</td>;
    }
  });

  return (
    <tbody>
      <tr>{formInputs}</tr>
    </tbody>
  );
};
