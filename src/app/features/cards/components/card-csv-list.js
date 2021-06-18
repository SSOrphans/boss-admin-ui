import React from "react";
import { useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

export const CardCsvList = () => {
  const currentState = useSelector((state) => state.cardCsv);

  const rows = currentState.cardList.map((element) => {
    const card = Object.entries(element).map(([key, value]) => [key, value]);

    const fields = card.map(([key, value]) => {
      switch (key) {
        case "activeSince":
        case "expirationDate":
          return <td key={key}>{new Date(value).toLocaleDateString()}</td>;
        default:
          return <td key={key}>{value.toString()}</td>;
      }
    });

    return <tr>{fields}</tr>;
  });

  return (
    <div>
      <Table className="table table-dark table-striped table-sm">
        <thead>
          <tr>
            <th>Number Hash</th>
            <th>Account ID</th>
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
        <tbody>{rows}</tbody>
      </Table>
      <Button>Add list</Button>
    </div>
  );
};
