import React, { useEffect, useState } from "react";
import {
	Table,
	ButtonDropdown,
	DropdownToggle,
	DropdownItem,
	DropdownMenu,
	Button,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { FaSortUp, FaSortDown, FaSort, FaFilter } from "react-icons/fa";
import {
	addLoan,
	fetchAllLoans,
	fetchAllLoansTypes,
	editLoan,
	deleteLoan,
} from "../../services/loanService";
import PaginationComponent from "../../shared/components/PaginationComponent";
import CreateLoanModal from "./CreateLoanModal";
import LoanTableRow from "./LoanTableRow";
import EditLoanModal from "./EditLoanModal";

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
	const [isCreateModalOpen, setCreateModalIsOpen] = useState(false);
	const [isEditModalOpen, setEditModalIsOpen] = useState(false);
	const [loanToEdit, setloanToEdit] = useState({});
	const dispatch = useDispatch();
	const toggleDropdown = () => setOpen(!dropdownOpen);

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
	}, [
		currentPage,
		sort,
		limit,
		dropdownValue,
		searchBar,
		dispatch,
		isCreateModalOpen,
		isEditModalOpen,
	]);

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

	function onCreateLoanSubmit(loan) {
		dispatch(addLoan(loan));
	}

	function onEdit(e) {
		setloanToEdit(e);
		setEditModalIsOpen(true);
	}

	function onDelete(e) {
		dispatch(deleteLoan(e.id));
	}

	function formatLoanType(type) {
		let loanType = type?.toLowerCase().replace("loan_", "");
		loanType = loanType[0]?.toUpperCase() + loanType?.substring(1);
		return loanType;
	}

	return (
		<div
			className='container-fluid mt-2'
			style={{
				backgroundColor: "whitesmoke",
				borderRadius: 5,
				padding: 20,
			}}>
			<CreateLoanModal
				isModalOpen={isCreateModalOpen}
				setModalIsOpen={() => setCreateModalIsOpen()}
				loanTypes={loanTypes}
				formatLoanType={(type) => formatLoanType(type)}
				onSubmit={(loan) => onCreateLoanSubmit(loan)}
			/>
			<EditLoanModal
				isModalOpen={isEditModalOpen}
				setModalIsOpen={() => setEditModalIsOpen()}
				loanTypes={loanTypes}
				loan={loanToEdit}
				formatLoanType={(type) => formatLoanType(type)}
				onSubmit={(loan) => {
					console.log(loan);
					dispatch(editLoan(loan));
				}}
			/>
			<div className='form-group form-inline justify-content-between'>
				<div>
					<input
						className='form-control'
						style={{ borderColor: "grey" }}
						type='text'
						placeholder='Enter loan number..'
						onChange={(val) => onSearchBarChanged(val)}
					/>
					<Button
						type='button'
						color='primary'
						onClick={() => setCreateModalIsOpen(true)}>
						Add new loan
					</Button>
				</div>
				<ButtonDropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
					<DropdownToggle className='dropdown' caret color='primary'>
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
							<div
								style={{
									cursor: "pointer",
								}}>
								Total
								{selectSort("amount")}
							</div>
						</th>
					</tr>
				</thead>
				<tbody>
					{loans.map((loan, idx) => (
						<LoanTableRow
							key={idx}
							loan={loan}
							onDelete={onDelete}
							onEdit={onEdit}
							formatLoanType={(type) =>
								formatLoanType(type)
							}></LoanTableRow>
					))}
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
