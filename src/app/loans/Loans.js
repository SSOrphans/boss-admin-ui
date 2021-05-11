import React, { useEffect } from "react";
import { InputGroup, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllLoans } from "./loanService";

export default function Loans() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchAllLoans());
	}, []);

	const { loans } = useSelector((state) => state.loans);

	console.log(loans);
	return (
		<div>
			<InputGroup></InputGroup>
			<Table></Table>
		</div>
	);
}
