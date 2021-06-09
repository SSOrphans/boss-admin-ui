import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { useHistory } from "react-router";
import Table from "react-bootstrap/Table";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";

import { getCardDetail, saveCardDetail } from "../../services/card-service";
import {
  editCard,
  validForm,
  updateCard,
  confirmDelete,
} from "../slices/card-detail-slice";

import { CardFormInput } from "./card-form-inputs";
import { CardTableHeaders } from "./card-table-headers";
import { CardDetailFields } from "./card-detail-fields";
import { CardConfirmModal } from "./card-confirm-modal";

export const CardDetail = () => {
  const currentState = useSelector((state) => state.cardDetail);
  const { cardId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const props = currentState.props;
  const card = Object.entries(currentState.card).map(([key, value]) => [
    key,
    value,
  ]);

  useEffect(() => {
    switch (currentState.status) {
      case "init":
        dispatch(getCardDetail(cardId));
        break;
      case "cards/deleteCard/fulfilled":
        history.push(`/cards/`);
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
          <Table>
            <CardTableHeaders currentState={currentState} />
            {!props.isClickable && <CardDetailFields />}
            {props.isClickable ? (
              <CardFormInput
                currentState={currentState}
                validForm={validForm}
                updateCard={updateCard}
              />
            ) : null}
          </Table>
        </Jumbotron>
        <div className="m-2">
          {!props.isClickable ? (
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
          {props.isClickable ? (
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
