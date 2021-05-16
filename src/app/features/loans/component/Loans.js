import React, { useEffect, useState } from "react";
import {
	Table,
	Container,
	ButtonDropdown,
	DropdownToggle,
	DropdownItem,
	DropdownMenu,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { FaSortUp, FaSortDown, FaSort, FaFilter } from "react-icons/fa";
import { fetchAllLoans, fetchAllLoansTypes } from "../../services/loanService";
import PaginationComponent from "../../shared/components/PaginationComponent";

export default function LoansTable() {
	const [currentPage, setCurrentPage] = useState(0);
	const [sort, setSort] = useState({ dir: "", sortBy: "" });
	const [limit, setLimit] = useState(5);
	const [searchBar, setSearchBar] = useState("");
	const { loans, pagination, loanTypes } = useSelector(
		(state) => state.loans
	);
	const [dropdownOpen, setOpen] = useState(false);
	const [dropdownValue, setDropdownValue] = useState("LOAN_UNKNOWN");

	const dispatch = useDispatch();
	const toggle = () => setOpen(!dropdownOpen);

	useEffect(() => {
		dispatch(fetchAllLoansTypes());
		dispatch(
			fetchAllLoans({
				page: currentPage,
				limit,
				filter: dropdownValue,
				keyword: searchBar,
				...sort,
			})
		);
	}, [currentPage, sort, limit, dropdownValue, searchBar]);

	function selectSort(sortName) {
		if (sort.sortBy === sortName) {
			switch (sort.dir) {
				case "asc":
					return <FaSortUp />;
				case "desc":
					return <FaSortDown />;
				default:
					break;
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

	function onDropdownChanged(value) {
		setDropdownValue(value);
	}

	function onSearchBarChanged(event) {
		setSearchBar(event.target.value);
	}

	function formatLoanType(type) {
		let loanType = type?.toLowerCase().replace("loan_", "");
		loanType = loanType[0]?.toUpperCase() + loanType?.substring(1);
		return loanType;
	}
	return (
		<div className='container-fluid mt-2'>
			<div className='form-group form-inline justify-content-between'>
				<input
					className='form-control'
					type='text'
					placeholder='Enter loan number..'
					onChange={(val) => onSearchBarChanged(val)}
				/>
				<ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
					<DropdownToggle className='dropdown' caret>
						{dropdownValue === "LOAN_UNKNOWN"
							? ""
							: formatLoanType(dropdownValue)}
						<FaFilter className='mx-1 align-middle' />
					</DropdownToggle>
					<DropdownMenu right>
						{loanTypes.map((type) => (
							<DropdownItem
								key={type.id}
								onClick={() => onDropdownChanged(type.name)}>
								{type.name === "LOAN_UNKNOWN"
									? "None"
									: formatLoanType(type.name)}
							</DropdownItem>
						))}
					</DropdownMenu>
				</ButtonDropdown>
			</div>

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
						return (
							<tr key={loan.loanNumber.toString()}>
								<td>{loan.loanNumber}</td>
								<td>{loan.userId}</td>
								<td>{loan.branchId}</td>
								<td>{formatLoanType(loan.loanType)}</td>
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
			<div className='form-inline justify-content-between'>
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
				<select
					className='custom-select'
					value={limit}
					onChange={(event) => {
						setLimit(event.target.value);
						let newMaxPages = Math.floor(
							pagination.totalElements / event.target.value
						);
						if (currentPage > newMaxPages) {
							setCurrentPage(0);
						}
					}}>
					<option value='5'>5 items per page</option>
					<option value='10'>10 items per page</option>
					<option value='20'>20 items per page</option>
				</select>
			</div>
		</div>
	);
}
