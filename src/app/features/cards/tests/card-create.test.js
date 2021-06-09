import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { store } from "../../../store";
import { CardCreate } from "../components/card-create";

jest.mock("axios");

function renderWithRedux(component) {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
  };
}

test("should have init state", () => {
  expect(store.getState()).toBeTruthy();
});

test("should render add-card button", () => {
  const { getByText } = renderWithRedux(<CardCreate />);

  expect(getByText("Add card")).toBeInTheDocument();
});

test("should render table headers", () => {
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
});
