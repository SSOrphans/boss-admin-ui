import React from "react";
import { MemoryRouter } from "react-router-dom";

import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../store";
import { CardCreate } from "./cardCreate";

function renderWithRedux(component) {
  return {
    ...render(
      <MemoryRouter initialEntries={["/cards/add"]}>
        <Provider store={store}>{component}</Provider>
      </MemoryRouter>
    ),
  };
}

describe("card detail component", () => {

  it("should have init state", () => {
    let initState = store.getState();

    expect(initState).toBeTruthy();
  });

  it("should render html content", () => {
    const { getByText } = renderWithRedux(<CardCreate />);

    expect(getByText("Manually Create Card")).toBeInTheDocument();
    expect(getByText("Number Hash")).toBeInTheDocument();
    expect(getByText("Account ID")).toBeInTheDocument();
    expect(getByText("Expiration Date")).toBeInTheDocument();
    expect(getByText("Active Since")).toBeInTheDocument();
    expect(getByText("Card Type")).toBeInTheDocument();
    expect(getByText("PIN")).toBeInTheDocument();
    expect(getByText("CVV")).toBeInTheDocument();
    expect(getByText("Confirmed")).toBeInTheDocument();
    expect(getByText("Active")).toBeInTheDocument();
    expect(getByText("Stolen")).toBeInTheDocument();
    expect(getByText("Add card")).toBeInTheDocument();
  });
});
