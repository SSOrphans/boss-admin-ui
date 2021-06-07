import React from "react";
import { render } from "@testing-library/react";
import { CardConfirmModal } from "../components/card-confirm-modal";

jest.mock("axios");
jest.mock("react-redux")

test("should render modal", () => {
  const { getByText } = render(<CardConfirmModal currentState={{props: {showConfirmModal: true}}} />);

  expect(getByText("Confirm delete?")).toBeInTheDocument();
  expect(getByText("Cancel")).toBeInTheDocument();
  expect(getByText("Yes")).toBeInTheDocument();
});
