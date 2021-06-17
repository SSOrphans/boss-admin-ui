import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "react-bootstrap/Table";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";

import { getCardDetail, saveCardDetail } from "../../services/card-service";
import {
  editCard,
  validForm,
  updateCard,
  confirmDelete,
  setStatus,
} from "../slices/card-detail-slice";
import { viewCardList, viewCardDetail } from "../slices/card-main-slice";

import { CardFormInput } from "./card-form-inputs";
import { CardTableHeaders } from "./card-table-headers";
import { CardDetailFields } from "./card-detail-fields";
import { CardConfirmModal } from "./card-confirm-modal";

export const CardDetail = ({ cardId }) => {
  const currentState = useSelector((state) => state.cardDetail);
  const dispatch = useDispatch();
  const card = Object.entries(currentState.card).map(([key, value]) => [
    key,
    value,
  ]);

  useEffect(() => {
    switch (currentState.status) {
      case "init":
        dispatch(getCardDetail(currentState.card.id));
        break;
      case "cards/deleteCard/fulfilled":
        dispatch(viewCardDetail(false));
        dispatch(viewCardList(true));
        dispatch(setStatus("init"));
        break;
      default:
        break;
    }
  });

  const onEdit = (e) => {
    e.preventDefault();
    dispatch(editCard(true));
  };

  const onDelete = (e) => {
    e.preventDefault();
    dispatch(confirmDelete(true));
  };

  const onSave = (e) => {
    e.preventDefault();
    dispatch(saveCardDetail(Object.fromEntries(card)));
  };

  return (
    <div>
      <form onSubmit={onSave}>
        <Jumbotron className="p-3 m-2">
          <h4 className="pb-3">Card Details</h4>
          <Table className="table-sm">
            <CardTableHeaders currentState={currentState} />
            {!currentState.isClickable && <CardDetailFields />}
            {currentState.isClickable ? (
              <CardFormInput
                currentState={currentState}
                validForm={validForm}
                updateCard={updateCard}
              />
            ) : null}
          </Table>
        </Jumbotron>
        <div className="m-2">
          {!currentState.isClickable ? (
            <>
              <Button
                disabled={
                  currentState.status === "pending" ||
                  currentState.status === "Error"
                }
                onClick={onEdit}
              >
                Edit
              </Button>
              <Button
                className="ml-1"
                disabled={
                  currentState.status === "pending" ||
                  currentState.status === "Error"
                }
                onClick={onDelete}
              >
                Delete
              </Button>
              <CardConfirmModal currentState={currentState} />
            </>
          ) : null}
          {currentState.isClickable ? (
            <Button
              type="submit"
              disabled={
                !currentState.isSavable || currentState.status === "pending"
              }
            >
              Save
            </Button>
          ) : null}
          <span className="text-danger p-3" hidden={currentState.isSavable}>
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
