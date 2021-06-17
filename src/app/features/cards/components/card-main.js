import React from "react";
import { useSelector } from "react-redux";
import { CardListComponent } from "./card-list";
import { CardDetail } from "./card-detail";
import { CardCreate } from "./card-create";
import { CardCsvList } from "./card-csv-list";

export const CardMain = () => {
  const currentState = useSelector((state) => state.cardMain);

  return (
    <div>
      {currentState.isCardListViewable ? <CardListComponent /> : null}
      {currentState.isCardDetailViewable ? <CardDetail /> : null}
      {currentState.isCardCreateViewable ? <CardCreate /> : null}
      {currentState.isCardCsvViewable ? <CardCsvList /> : null}
    </div>
  );
};
