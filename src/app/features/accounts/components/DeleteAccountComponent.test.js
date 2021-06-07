import React from "react";

import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../store";
import {DeleteAccountComponent} from "./DeleteAccountComponent";

test("renders app", () => {
  render(
    <Provider store={store}>
      <DeleteAccountComponent />
    </Provider>
  );
});
