import React from "react";
import { useSelector } from "react-redux";

export const CardDetailFields = () => {
  const currentState = useSelector((state) => state.cardDetail);
  const card = Object.entries(currentState.card).map(([key, value]) => [
    key,
    value,
  ]);

  const fields = card.map(([key, value]) => {
    switch (key) {
      case "created":
      case "activeSince":
      case "expirationDate":
        return <td key={key}>{new Date(value).toLocaleDateString()}</td>;
      default:
        return <td key={key}>{value.toString()}</td>;
    }
  });

  return (
    <tbody>
      <tr>{fields}</tr>
    </tbody>
  );
};
