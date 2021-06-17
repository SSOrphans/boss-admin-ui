import React from "react";

export const CardTableHeaders = ({ currentState }) => {
  return (
    <thead>
      <tr>
        <th hidden={!currentState.card.id}>ID</th>
        <th>
          Number Hash
          <span className="text-danger" hidden={currentState.isValidNumberHash}>
            **
          </span>
        </th>
        <th>
          Account ID
          <span className="text-danger" hidden={currentState.isValidAccountId}>
            **
          </span>
        </th>
        <th hidden={!currentState.card.created}>Created</th>
        <th>Active Since</th>
        <th>Expiration Date</th>
        <th>
          PIN
          <span className="text-danger" hidden={currentState.isValidPin}>
            **
          </span>
        </th>
        <th>
          CVV
          <span className="text-danger" hidden={currentState.isValidCvv}>
            **
          </span>
        </th>
        <th>Confirmed</th>
        <th>Active</th>
        <th>Stolen</th>
        <th>Card Type</th>
      </tr>
    </thead>
  );
};
