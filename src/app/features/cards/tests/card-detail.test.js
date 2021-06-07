import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import { store } from "../../../store";
import { CardDetail } from "../components/card-detail";
import { editCard } from "../slices/card-detail-slice";

jest.mock("axios");

function renderWithRedux(component) {
  return {
    ...render(
      <MemoryRouter initialEntries={["/cards/1"]}>
        <Provider store={store}>{component}</Provider>
      </MemoryRouter>
    ),
  };
}

test("should have init state", () => {
  expect(store.getState()).toBeTruthy();
});

test("should have edit and delete buttons", () => {
  const { getByText } = renderWithRedux(<CardDetail />);

  expect(getByText("Edit")).toBeInTheDocument();
  expect(getByText("Delete")).toBeInTheDocument();
});

test("should render save button", () => {
  const { getByText } = renderWithRedux(<CardDetail />);

  store.dispatch(editCard(true));
  expect(getByText("Save")).toBeInTheDocument();
});

test("should render table headers", () => {
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
});
