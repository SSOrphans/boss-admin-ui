import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

import { addCard } from "../../services/card-service";
import { validForm, updateCard } from "../slices/card-create-slice";
import { setCardId } from "../slices/card-detail-slice";
import { viewCardCreate, viewCardDetail } from "../slices/card-main-slice";

import { CardFormInput } from "./card-form-inputs";
import { CardTableHeaders } from "./card-table-headers";

export const CardCreate = () => {
  const currentState = useSelector((state) => state.cardCreate);
  const dispatch = useDispatch();
  const card = Object.entries(currentState.card).map(([key, value]) => [
    key,
    value,
  ]);

  useEffect(() => {
    if (currentState.cardId) {
      dispatch(setCardId(currentState.cardId));
      dispatch(viewCardDetail(true));
      dispatch(viewCardCreate(false));
    }
  });

  const onSave = (e) => {
    e.preventDefault();
    dispatch(addCard(Object.fromEntries(card)));
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
              disabled={
                !currentState.isSavable || currentState.status === "pending"
              }
            >
              Add card
            </Button>
            <span className="text-danger p-3" hidden={currentState.isSavable}>
              Invalid form: Inputs can only contain numbers. Number hash has a
              maximum of 64 characters. PINs require 4 numbers, and CVVs require
              3 numbers.
            </span>
            <span className="text-danger p-3">{currentState.error}</span>
          </div>
        </Jumbotron>
      </form>
    </div>
  );
};
