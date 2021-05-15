import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCardDetail } from "../../services/cardService";
import Table from "react-bootstrap/Table";
import Jumbotron from "react-bootstrap/Jumbotron";
import { useParams } from "react-router";

export const CardDetail = () => {
  const currentState = useSelector((state) => state.cardDetail);
  const dispatch = useDispatch();
  const [card] = currentState.cards;
  const {id} = useParams();

  useEffect(() => {
    if (currentState.status === "init") {
      dispatch(getCardDetail(id));
    }
  });

  const renderDetails = Object.entries(card).map(([key, value]) => (
    <td key={key}>{value.toString()}</td>
  ));

  return (
    <Jumbotron className="p-3">
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
        <tbody>
          <tr>{renderDetails}</tr>
        </tbody>
      </Table>
    </Jumbotron>
  );
};
