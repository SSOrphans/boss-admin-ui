import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllLoans } from "../../services/loanService";
import PaginationComponent from "../../shared/components/PaginationComponent";

export default function Loans() {
	const [currentPage, setCurrentPage] = useState(0);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchAllLoans({ page: currentPage }));
	}, [currentPage]);

	const { loans, pagination } = useSelector((state) => state.loans);

	return (
		<div className='container-fluid mt-2'>
			<form>
				<div className='form-group form-inline'>
					<input
						className='form-control'
						type='text'
						placeholder='Enter loan number..'
					/>
				</div>
			</form>
			<Table striped bordered responsive='lg'>
				<thead>
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
				</thead>
				<tbody>
					{loans.map((loan) => {
						let loanType = loan.loanType
							.toLowerCase()
							.replace("loan_", "");

						loanType =
							loanType[0].toUpperCase() + loanType.substring(1);
						return (
							<tr key={loan.loanNumber.toString()}>
								<td>{loan.loanNumber}</td>
								<td>{loan.userId}</td>
								<td>{loan.branchId}</td>
								<td>{loanType}</td>
								<td>
									{new Intl.NumberFormat("en-us", {
										style: "currency",
										currency: "USD",
									}).format(loan.amountDue)}
								</td>
								<td>
									{new Intl.NumberFormat("en-us", {
										style: "percent",
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									}).format(loan.interestRate)}
								</td>
								<td>
									{new Intl.DateTimeFormat("en-US").format(
										new Date(loan.dueBy)
									)}
								</td>
								<td>
									{new Intl.DateTimeFormat("en-US", {
										dateStyle: "short",
										timeStyle: "short",
									}).format(new Date(loan.takenAt))}
								</td>
								<td>
									{new Intl.NumberFormat("en-us", {
										style: "currency",
										currency: "USD",
									}).format(loan.amount)}
								</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
			<PaginationComponent
				totalPages={pagination.totalPages}
				currentPage={currentPage}
				maxSize={5}
				onPageChanged={(i) => {
					setCurrentPage(
						Math.max(
							Math.min(
								currentPage + i,
								pagination.totalPages - 1
							),
							0
						)
					);
				}}
			/>
		</div>
	);
}
