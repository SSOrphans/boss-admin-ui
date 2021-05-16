import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, withRouter } from "react-router";

import { getCardDetail } from "../../services/cardService";
import { editCard, validForm } from "../slicers/cardSlice";

import Table from "react-bootstrap/Table";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";

export const CardDetail = () => {
  const currentState = useSelector((state) => state.cardDetail);
  const dispatch = useDispatch();
  const { cardId } = useParams();
  const card = currentState.card;
  const props = currentState.props;

  useEffect(() => {
    if (currentState.status === "init") {
      dispatch(getCardDetail(cardId));
    }
  });

  const onEdit = () => {
    if (props.isEditable === false) {
      dispatch(editCard(true));
    }
  };

  const onSave = (event) => {
    event.preventDefault();
    // dispatch(validForm({}))
    if (props.isEditable === true) {
      dispatch(editCard(false));
    }
  };

  const renderDetails = Object.entries(card).map(([key, value]) => (
    <td key={key}>{value.toString()}</td>
  ));

  const editDetails = Object.entries(card).map(([key, value]) => {
    switch (key) {
      case "numberHash":
      case "accountId":
      case "pin":
      case "cvv":
        return (
          <td key={key}>
            <input placeholder={value.toString()} />
          </td>
        );
      case "confirmed":
      case "stolen":
      case "active":
        return (
          <td key={key}>
            <select defaultValue={value.toString()}>
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
          </td>
        );
      case "cardType":
        return (
          <td key={key}>
            <select defaultValue={value.toString()}>
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
                <th>Number Hash</th>
                <th>Account ID</th>
                <th>Created</th>
                <th>Active Since</th>
                <th>Expiration Date</th>
                <th>PIN</th>
                <th>CVV</th>
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
        {props.isEditable && (
          <Button className="m-2" type="submit">
            Save
          </Button>
        )}
      </form>
      {!props.isEditable && (
        <Button className="m-2" onClick={onEdit}>
          Edit
        </Button>
      )}
    </div>
  );
};

export default withRouter(CardDetail);
