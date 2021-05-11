import React, { useEffect } from "react";
import { InputGroup, Table, Input, Container } from "reactstrap";
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
		<Container class='container-fluid mt-2'>
			<form>
				<div class='form-group form-inline'>
					<input
						class='form-control'
						type='text'
						placeholder='Enter loan number..'
					/>
				</div>
			</form>
			<Table striped bordered responsive='lg'>
				<tr>
					<th>Loan Number</th>
					<th>User Id</th>
					<th>Branch Id</th>
					<th>Type</th>
					<th>Amount Due</th>
					<th>Interest Rate</th>
					<th>Due By</th>
					<th>Taken At</th>
					<th>Total</th>
				</tr>
				<tbody>
					{loans.content.map((loan) => {
						return (
							<tr>
								<td>{loan.loanNumber}</td>
								<td>{loan.userId}</td>
								<td>{loan.branchId}</td>
								<td>{loan.loanType}</td>
								<td>{loan.amountDue}</td>
								<td>{loan.interestRate}</td>
								<td>{loan.dueBy}</td>
								<td>{loan.takenAt}</td>
								<td>{loan.amount}</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		</Container>
	);
}
