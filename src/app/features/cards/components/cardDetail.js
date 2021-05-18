import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";

import { getCardDetail, saveCardDetail } from "../../services/cardService";
import { editCard, validForm, updateCard } from "../slices/cardSlice";
import {
  validAccountId,
  validCvv,
  validNumberHash,
  validPin,
} from "../../../regex";

import Table from "react-bootstrap/Table";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";

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

  const handleChange = (e) => {
    let newCard = Object.fromEntries(card);
    newCard[e.target.name] = e.target.value;

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
  };

  const onEdit = (e) => {
    e.preventDefault();
    if (props.isEditable === false) {
      dispatch(editCard(true));
    } else {
      dispatch(editCard(false));
    }
  };

  const onSave = (e) => {
    e.preventDefault();
    dispatch(editCard(false));
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
        return <td key={key}>{new Date(value).toLocaleDateString()}</td>;
      case "numberHash":
      case "accountId":
      case "pin":
      case "cvv":
        return (
          <td key={key}>
            <input
              placeholder={value.toString()}
              name={key}
              onChange={handleChange}
            />
          </td>
        );
      case "confirmed":
      case "stolen":
      case "active":
        return (
          <td key={key}>
            <select
              defaultValue={value.toString()}
              name={key}
              onChange={handleChange}
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
              defaultValue={value.toString()}
              name={key}
              onChange={handleChange}
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
            {props.isEditable && (
              <tbody>
                <tr>{editDetails}</tr>
              </tbody>
            )}
          </Table>
        </Jumbotron>
        <div className="m-2">
          {!props.isEditable && <Button onClick={onEdit}>Edit</Button>}
          {props.isEditable && (
            <Button type="submit" disabled={!props.isSavable}>
              Save
            </Button>
          )}
          <span className="text-danger p-3" hidden={props.isSavable}>
            Invalid input
          </span>
        </div>
      </form>
    </div>
  );
};
