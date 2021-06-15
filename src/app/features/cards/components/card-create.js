import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSVReader } from "react-papaparse";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

import { addCard } from "../../services/card-service";
import { validForm, updateCard } from "../slices/card-create-slice";
import { useHistory } from "react-router";

import { CardFormInput } from "./card-form-inputs";
import { CardTableHeaders } from "./card-table-headers";
import {
  validAccountId,
  validCvv,
  validNumberHash,
  validPin,
} from "../../../regex";

export const CardCreate = () => {
  const currentState = useSelector((state) => state.cardCreate);
  const dispatch = useDispatch();
  const history = useHistory();
  const props = currentState.props;
  const card = Object.entries(currentState.card).map(([key, value]) => [
    key,
    value,
  ]);

  useEffect(() => {
    if (currentState.props.cardId) {
      history.push(`/cards/${currentState.props.cardId}`);
    }
  });

  const onSave = (e) => {
    e.preventDefault();
    dispatch(addCard(Object.fromEntries(card)));
  };

  const onUpload = (csv) => {
    const keys = csv[0].data;
    const values = csv[1].data;
    let newCard = Object.fromEntries(card);
    keys.forEach((key, i) => (newCard[key] = values[i]));

    newCard.activeSince = new Date();
    newCard.expirationDate = new Date();

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

  return (
    <div>
      <form onSubmit={onSave}>
        <Jumbotron className="p-3 m-2">
          <h4 className="pb-3">Manually Create Card</h4>
          <Table>
            <CardTableHeaders currentState={currentState} />
            <CardFormInput
              currentState={currentState}
              validForm={validForm}
              updateCard={updateCard}
            />
          </Table>
        <div className="m-2">
          <Button
            type="submit"
            disabled={!props.isSavable || currentState.status === "pending"}
          >
            Add card
          </Button>
          <span className="text-danger p-3" hidden={props.isSavable}>
            Invalid form: Inputs can only contain numbers. Number hash has a
            maximum of 64 characters. PINs require 4 numbers, and CVVs require 3
            numbers.
          </span>
          <span className="text-danger p-3">{currentState.error}</span>
        </div>
        </Jumbotron>
      </form>
      <div className="d-flex mx-2">
        <CSVReader onFileLoad={onUpload}>
          <span className="font-weight-bold">Upload CSV File</span>
        </CSVReader>
      </div>
    </div>
  );
};
