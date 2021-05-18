import React from "react";
import { MemoryRouter } from "react-router-dom";

import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../store";
import { CardDetail } from "./cardDetail";

function renderWithRedux(component) {
  return {
    ...render(
      <MemoryRouter initialEntries={["/cards/1"]}>
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

  it("should update card details", () => {
  });

  it("should render html content", () => {
    const { getByText } = renderWithRedux(<CardDetail />);

    expect(getByText("Card Details")).toBeInTheDocument();
    expect(getByText("Number Hash")).toBeInTheDocument();
    expect(getByText("Account ID")).toBeInTheDocument();
    expect(getByText("Expiration Date")).toBeInTheDocument();
    expect(getByText("Active Since")).toBeInTheDocument();
    expect(getByText("Card Type")).toBeInTheDocument();
    expect(getByText("ID")).toBeInTheDocument();
    expect(getByText("Created")).toBeInTheDocument();
    expect(getByText("PIN")).toBeInTheDocument();
    expect(getByText("CVV")).toBeInTheDocument();
    expect(getByText("Confirmed")).toBeInTheDocument();
    expect(getByText("Active")).toBeInTheDocument();
    expect(getByText("Stolen")).toBeInTheDocument();
    expect(getByText("Edit")).toBeInTheDocument();
  });

  it("should render save button after click", () => {
    const { getByText } = renderWithRedux(<CardDetail />);

    fireEvent.click(getByText("Edit"));
    expect(getByText("Save")).toBeInTheDocument();
  });
});
