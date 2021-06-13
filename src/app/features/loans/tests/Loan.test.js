import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../store";
import LoansTable from "../components/LoansTable";

test("renders app", () => {
	render(
		<Provider store={store}>
			<LoansTable />
		</Provider>
	);
});
