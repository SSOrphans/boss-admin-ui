import React, { useState } from "react";
import { Collapse, Button } from "reactstrap";

export default function LoanTableRow({
	key,
	loan,
	formatLoanType,
	onEdit,
	onDelete,
}) {
	const [collapse, setCollapse] = useState(false);
	const toggle = () => setCollapse(!collapse);
	const [status, setStatus] = useState("Closed");

	const onEntering = () => setStatus("Opening...");

	const onEntered = () => setStatus("Opened");

	const onExiting = () => setStatus("Closing...");

	const onExited = () => setStatus("Closed");
	return [
		<tr key={loan.loanNumber.toString()} onClick={() => toggle()}>
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
				{new Intl.DateTimeFormat("en-US", {
					dateStyle: "short",
				}).format(new Date(loan.dueBy))}
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
		</tr>,
		collapse && (
			<tr key={loan.loanNumber ^ 2}>
				<td colSpan='1.5' style={{ backgroundColor: "whitesmoke" }}>
					<Collapse
						isOpen={collapse}
						onEntering={onEntering}
						onEntered={onEntered}
						onExiting={onExiting}
						onExited={onExited}>
						<div
							style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-between",
								paddingInline: 10,
							}}>
							<Button
								color='primary'
								onClick={(e) => onEdit(loan)}>
								Edit
							</Button>
							<Button
								color='danger'
								onClick={(e) => onDelete(loan)}>
								Delete
							</Button>
						</div>
					</Collapse>
				</td>
			</tr>
		),
	];
}
