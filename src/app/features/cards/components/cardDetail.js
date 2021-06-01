import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import ReactDatePicker from "react-datepicker";
import Table from "react-bootstrap/Table";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";

import { getCardDetail, saveCardDetail } from "../../services/cardService";
import { editCard, validForm, updateCard } from "../slices/cardDetailSlice";
import {
  validAccountId,
  validCvv,
  validNumberHash,
  validPin,
} from "../../../regex";

export const CardDetail = () => {
  const currentState = useSelector((state) => state.cardDetail);
  const { cardId } = useParams();
  const dispatch = useDispatch();
  const props = currentState.props;
  const card = Object.entries(currentState.card).map(([key, value]) => [
    key,
    value,
  ]);

  useEffect(() => {
    if (currentState.status === "init") {
      dispatch(getCardDetail(cardId));
    }
  });

  function handler(name, event, date) {
    let newCard = Object.fromEntries(card);
    if (event !== null) {
      newCard[name] = event.target.value;
    } else {
      newCard[name] = date;
    }

    let newProps = Object.entries(props).map(([key, value]) => {
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

    dispatch(validForm(Object.fromEntries(newProps)));
    dispatch(updateCard(newCard));
  }

  const onEdit = (e) => {
    e.preventDefault();
    if (props.isEditable === false) {
      dispatch(editCard(true));
    }
  };

  const onSave = (e) => {
    e.preventDefault();
    dispatch(saveCardDetail(Object.fromEntries(card)));
  };

  const renderDetails = card.map(([key, value]) => {
    switch (key) {
      case "created":
      case "activeSince":
      case "expirationDate":
        return <td key={key}>{new Date(value).toLocaleDateString()}</td>;
      default:
        return <td key={key}>{value.toString()}</td>;
    }
  });

  const editDetails = card.map(([key, value]) => {
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
    <div>
      <form onSubmit={onSave}>
        <Jumbotron className="p-3 m-2">
          <h4 className="pb-3">Card Details</h4>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>
                  Number Hash
                  <span
                    className="text-danger"
                    hidden={props.isValidNumberHash}
                  >
                    **
                  </span>
                </th>
                <th>
                  Account ID
                  <span className="text-danger" hidden={props.isValidAccountId}>
                    **
                  </span>
                </th>
                <th>Created</th>
                <th>Active Since</th>
                <th>Expiration Date</th>
                <th>
                  PIN
                  <span className="text-danger" hidden={props.isValidPin}>
                    **
                  </span>
                </th>
                <th>
                  CVV
                  <span className="text-danger" hidden={props.isValidCvv}>
                    **
                  </span>
                </th>
                <th>Confirmed</th>
                <th>Active</th>
                <th>Stolen</th>
                <th>Card Type</th>
              </tr>
            </thead>
            {!props.isEditable && (
              <tbody>
                <tr>{renderDetails}</tr>
              </tbody>
            )}
            {props.isEditable ? (
              <tbody>
                <tr>{editDetails}</tr>
              </tbody>
            ) : null}
          </Table>
        </Jumbotron>
        <div className="m-2">
          {!props.isEditable ? (
            <Button
              disabled={
                currentState.status === "pending" ||
                currentState.status === "Error"
              }
              onClick={onEdit}
            >
              Edit
            </Button>
          ) : null}
          {props.isEditable ? (
            <Button
              type="submit"
              disabled={!props.isSavable || currentState.status === "pending"}
            >
              Save
            </Button>
          ) : null}
          <span className="text-danger p-3" hidden={props.isSavable}>
            Invalid form: Inputs can only contain numbers. Number hash has a
            maximum of 64 characters. PINs require 4 numbers, and CVVs require 3
            numbers.
          </span>
          <span className="text-danger p-3">{currentState.error}</span>
        </div>
      </form>
    </div>
  );
};
