import React, { useEffect, useState } from "react";
import { Table, Container, Row, Col } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { FaSortUp, FaSortDown, FaSort } from "react-icons/fa";
import { fetchAllLoans } from "../../services/loanService";
import PaginationComponent from "../../shared/components/PaginationComponent";

export default function LoansTable() {
	const [currentPage, setCurrentPage] = useState(0);
	const [sort, setSort] = useState({ dir: "", sortBy: "" });
	const [limit, setLimit] = useState(5);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchAllLoans({ page: currentPage, limit, ...sort }));
	}, [currentPage, sort, limit]);

	const { loans, pagination } = useSelector((state) => state.loans);

	function selectSort(sortName) {
		if (sort.sortBy === sortName) {
			switch (sort.dir) {
				case "asc":
					return <FaSortUp />;
				case "desc":
					return <FaSortDown />;
			}
		}
		return <FaSort />;
	}

	function onSortChanged(sortName) {
		if (sortName === sort.sortBy) {
			switch (sort.dir) {
				case "asc":
					setSort({ dir: "desc", sortBy: sortName });
					break;
				case "desc":
					setSort({ dir: "", sortBy: sortName });
					break;
				default:
					setSort({ dir: "", sortBy: "" });
					break;
			}
		} else {
			setSort({ dir: "asc", sortBy: sortName });
		}
	}

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
						<th onClick={() => onSortChanged("loanNumber")}>
							<div
								style={{
									cursor: "pointer",
								}}>
								Loan Number
								{selectSort("loanNumber")}
							</div>
						</th>
						<th onClick={() => onSortChanged("userId")}>
							<div
								style={{
									cursor: "pointer",
								}}>
								User Id
								{selectSort("userId")}
							</div>
						</th>
						<th onClick={() => onSortChanged("branchId")}>
							<div
								style={{
									cursor: "pointer",
								}}>
								Branch Id
								{selectSort("branchId")}
							</div>
						</th>
						<th onClick={() => onSortChanged("loanType")}>
							<div
								style={{
									cursor: "pointer",
								}}>
								Loan Type
								{selectSort("loanType")}
							</div>
						</th>
						<th onClick={() => onSortChanged("amountDue")}>
							<div
								style={{
									cursor: "pointer",
								}}>
								Amount Due
								{selectSort("amountDue")}
							</div>
						</th>
						<th onClick={() => onSortChanged("interestRate")}>
							<div
								style={{
									cursor: "pointer",
								}}>
								Interest Rate
								{selectSort("interestRate")}
							</div>
						</th>
						<th onClick={() => onSortChanged("dueBy")}>
							<div
								style={{
									cursor: "pointer",
								}}>
								Due By
								{selectSort("dueBy")}
							</div>
						</th>
						<th onClick={() => onSortChanged("takenAt")}>
							<div
								style={{
									cursor: "pointer",
								}}>
								Taken At
								{selectSort("takenAt")}
							</div>
						</th>
						<th onClick={() => onSortChanged("amount")}>
							<Container
								style={{
									cursor: "pointer",
								}}>
								Total
								{selectSort("amount")}
							</Container>
						</th>
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
			<Container fluid>
				<Row>
					<Col>
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
					</Col>
					<Col sm='auto'>
						<select
							className='custom-select'
							value={limit}
							onChange={(event) => {
								setLimit(event.target.value);
								let newMaxPages = Math.floor(
									pagination.totalElements /
										event.target.value
								);
								if (currentPage > newMaxPages) {
									setCurrentPage(0);
								}
							}}>
							<option value='5'>5 items per page</option>
							<option value='10'>10 items per page</option>
							<option value='20'>20 items per page</option>
						</select>
					</Col>
				</Row>
			</Container>
		</div>
	);
}
