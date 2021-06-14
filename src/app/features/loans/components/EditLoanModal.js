import React, { useState, useEffect } from "react";

import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Form,
	Row,
	Label,
	Input,
	Col,
	FormGroup,
	FormFeedback,
	InputGroup,
	InputGroupText,
	InputGroupAddon,
} from "reactstrap";

export default function EditLoanModal({
	isModalOpen,
	setModalIsOpen,
	loan,
	loanTypes,
	formatLoanType,
	onSubmit,
}) {
	const toggle = () => setModalIsOpen(!isModalOpen);
	const [branchId, setbranchId] = useState(0);
	const [loanNumber, setLoanNumber] = useState(0);
	const [userId, setUserId] = useState(0);
	const [loanType, setLoanType] = useState(0);
	const [amount, setAmount] = useState(0);
	const [amountDue, setAmountDue] = useState(0);
	const [interestRate, setInterestRate] = useState(0);
	const [dueDate, setDueDate] = useState("");
	const [takenAt, setakenAt] = useState("");

	const [validators, setValidators] = useState({
		branchIdIsValid: true,
		userIdIsValid: true,
		amountIsValid: true,
		amountDueIsValid: true,
		interestRateIsValid: true,
		dueDateIsValid: true,
		dateTakenIsValid: true,
		loanNumberIsValid: true,
	});

	useEffect(() => {
		setLoanNumber(loan.loanNumber);
		setbranchId(loan.branchId);
		setUserId(loan.userId);
		setAmount(loan.amount);
		setAmountDue(loan.amountDue);
		setInterestRate(loan.interestRate);
		setDueDate(loan.dueBy);
		setakenAt(loan.takenAt);
		setLoanType(
			loanTypes.find((type) => {
				return type.name === loan.loanType;
			})?.id - 1
		);
	}, [
		loan.branchId,
		loan.userId,
		loan.amount,
		loan.amountDue,
		loan.interestRate,
		loan.dueDate,
		loan.dueBy,
		loan.takenAt,
		loan.loanNumber,
		loan.loanType,
		loanTypes,
	]);

	const submit = (e) => {
		e.preventDefault();
		const newLoan = {
			id: loan?.id,
			loanNumber: loanNumber,
			branchId: branchId,
			userId: userId,
			loanType: loanType,
			amount: amount,
			amountDue: amountDue,
			interestRate: interestRate,
			takenAt: takenAt,
			dueBy: dueDate,
		};
		onSubmit(newLoan);
		toggle();
	};
	return (
		<div>
			<Modal
				isOpen={isModalOpen}
				toggle={toggle}
				backdrop={"static"}
				keyboard={false}
				centered>
				<ModalHeader toggle={toggle}>Edit Loan</ModalHeader>
				<ModalBody>
					<Form>
						<Label for='loanNumber'>Loan Number</Label>
						<Input
							type='number'
							name='loanNumber'
							id='loanNumber'
							onChange={(value) => {
								if (value.target.value > -1) {
									setValidators({
										...validators,
										loanNumberIsValid: true,
									});

									setLoanNumber(value.target.value);
								} else {
									setValidators({
										...validators,
										loanNumberIsValid: false,
									});
									console.log(validators);
								}
							}}
							placeholder='10000000'
							value={loanNumber}
							invalid={!validators.loanNumberIsValid}
						/>
						<Row form style={{ paddingTop: 10 }}>
							<Col md={6}>
								<FormGroup>
									<Label for='branchId'>Branch Id</Label>
									<InputGroup>
										<Input
											type='number'
											min='0'
											name='branchId'
											id='branchId'
											onChange={(value) => {
												if (value.target.value > -1) {
													setValidators({
														...validators,
														branchIdIsValid: true,
													});

													setbranchId(
														value.target.value
													);
												} else {
													setValidators({
														...validators,
														branchIdIsValid: false,
													});
													console.log(validators);
												}
											}}
											placeholder='ie. 4324'
											value={branchId}
											invalid={
												!validators.branchIdIsValid
											}
										/>
										<FormFeedback tooltip>
											Branch Id must be greater than or
											equal to 0!
										</FormFeedback>
										<InputGroupAddon addonType='append'>
											<InputGroupText>#</InputGroupText>
										</InputGroupAddon>
									</InputGroup>
								</FormGroup>
							</Col>
							<Col md={6}>
								<FormGroup>
									<Label for='userId'>User Id</Label>
									<InputGroup>
										<Input
											type='number'
											min='0'
											name='userId'
											id='userId'
											onChange={(value) => {
												if (value.target.value > -1) {
													setValidators({
														...validators,
														userIdIsValid: true,
													});
													setUserId(
														value.target.value
													);
												} else {
													setValidators({
														...validators,
														userIdIsValid: false,
													});
												}
											}}
											value={userId}
											placeholder='ie. 4324'
											invalid={!validators.userIdIsValid}
										/>
										<FormFeedback tooltip>
											Branch Id must be greater than or
											equal to 0!
										</FormFeedback>
										<InputGroupAddon addonType='append'>
											<InputGroupText>#</InputGroupText>
										</InputGroupAddon>
									</InputGroup>
								</FormGroup>
							</Col>
						</Row>
						<Label for='loanType'>Loan Type</Label>
						<Input
							type='select'
							name='loanType'
							id='loanType'
							onChange={(value) =>
								setLoanType(value.target.selectedIndex)
							}
							value={loanType}>
							{loanTypes.map((type, idx) => (
								<option key={type.id} value={idx}>
									{type.name === "LOAN_UNKNOWN"
										? "None"
										: formatLoanType(type.name)}
								</option>
							))}
						</Input>
						<Row form style={{ paddingTop: 20 }}>
							<Col md={4}>
								<FormGroup>
									<Label for='amountDue'>
										Current Amount Due
									</Label>
									<InputGroup>
										<InputGroupAddon addonType='prepend'>
											<InputGroupText>$</InputGroupText>
										</InputGroupAddon>
										<Input
											type='number'
											min='0'
											name='amountDue'
											id='amountDue'
											onChange={(value) => {
												if (
													value.target.value > -1 &&
													value.target.value <= amount
												) {
													setValidators({
														...validators,
														amountDueIsValid: true,
													});
													setAmountDue(
														value.target.value
													);
												} else {
													setValidators({
														...validators,
														amountDueIsValid: false,
													});
												}
											}}
											placeholder='0'
											value={amountDue}
											invalid={
												!validators.amountDueIsValid
											}
										/>
										<FormFeedback tooltip>
											Current amount must be greater than
											or equal to 0 and less than total
											amount!
										</FormFeedback>
									</InputGroup>
								</FormGroup>
							</Col>
							<Col md={4}>
								<FormGroup>
									<Label for='amount'>Total Amount Due</Label>
									<InputGroup>
										<InputGroupAddon addonType='prepend'>
											<InputGroupText>$</InputGroupText>
										</InputGroupAddon>
										<Input
											type='number'
											min='0'
											name='amount'
											id='amount'
											onChange={(value) => {
												if (value.target.value > -1) {
													setValidators({
														...validators,
														amountIsValid: true,
													});
													setAmount(
														value.target.value
													);
												} else {
													setValidators({
														...validators,
														amountIsValid: false,
													});
												}
											}}
											placeholder='0'
											value={amount}
											invalid={!validators.amountIsValid}
										/>
										<FormFeedback tooltip>
											Total amount must be greater than or
											equal to 0!
										</FormFeedback>
									</InputGroup>
								</FormGroup>
							</Col>
							<Col md={4}>
								<FormGroup>
									<Label for='interestRate'>
										Interest Rate
									</Label>
									<InputGroup>
										<Input
											type='number'
											min='0'
											name='interestRate'
											id='interestRate'
											placeholder='0'
											onChange={(value) => {
												if (value.target.value > -1) {
													setValidators({
														...validators,
														interestRateIsValid: true,
													});
													setInterestRate(
														value.target.value
													);
												} else {
													setValidators({
														...validators,
														interestRateIsValid: false,
													});
												}
											}}
											value={interestRate}
											invalid={
												!validators.interestRateIsValid
											}
										/>
										<FormFeedback tooltip>
											Interest Rate must be greater than
											or equal to 0!
										</FormFeedback>
										<InputGroupAddon addonType='append'>
											<InputGroupText>%</InputGroupText>
										</InputGroupAddon>
									</InputGroup>
									<FormFeedback tooltip>
										Total amount must be greater than
										current amount due!
									</FormFeedback>
								</FormGroup>
							</Col>
						</Row>
						<Label for='takenAt'>Date taken</Label>
						<Row form>
							<Col>
								<Input
									type='date'
									name='dateTaken'
									id='dateTaken'
									onChange={(value) => {
										if (
											+value.target.valueAsDate <=
											+Date.now()
										) {
											setValidators({
												...validators,
												dateTakenIsValid: true,
											});
											let time = new Date(takenAt);
											let newTime = new Date(
												value.target.value
											);
											newTime.setHours(time.getHours());
											newTime.setMinutes(
												time.getMinutes()
											);
											newTime.setSeconds(
												time.getSeconds()
											);
											newTime.setMilliseconds(
												time.getMilliseconds()
											);
											console.log(newTime);
											setakenAt(newTime);
										} else {
											setValidators({
												...validators,
												dateTakenIsValid: false,
											});
										}
									}}
									value={(takenAt
										? new Date(takenAt)
										: new Date()
									)
										.toISOString()
										.slice(0, 10)}
									invalid={!validators.dateTakenIsValid}
								/>
							</Col>
							<Col>
								<Input
									type='time'
									name='timeTaken'
									id='timeTaken'
									onChange={(value) => {
										console.log(value.target.valueAsDate);
										let time = new Date(takenAt);
										let newTime = value.target.valueAsDate;

										newTime.setUTCFullYear(
											time.getUTCFullYear()
										);
										newTime.setUTCMonth(time.getUTCMonth());
										newTime.setUTCDate(time.getUTCDate());

										setakenAt(newTime);
									}}
									value={new Date(takenAt).toLocaleTimeString(
										"en-US",
										{
											hour: "2-digit",
											minute: "2-digit",
											hour12: false,
										}
									)}
								/>
							</Col>
						</Row>
						<Label for='dueDate'>Due Date</Label>
						<Input
							type='date'
							name='dueDate'
							id='dueDate'
							onChange={(value) => {
								if (value.target.valueAsDate >= +Date.now()) {
									setValidators({
										...validators,
										dueDateIsValid: true,
									});
									setDueDate(value.target.valueAsDate);
								} else {
									setValidators({
										...validators,
										dueDateIsValid: false,
									});
								}
							}}
							value={dueDate}
							invalid={!validators.dueDateIsValid}
						/>
						<FormFeedback>
							Due date needs to be in the future!
						</FormFeedback>
					</Form>
				</ModalBody>
				<ModalFooter>
					<Button color='secondary' onClick={toggle}>
						Cancel
					</Button>
					<Button
						color='primary'
						onClick={submit}
						disabled={
							!(
								validators.branchIdIsValid &&
								validators.branchIdIsValid &&
								validators.amountDueIsValid &&
								validators.amountIsValid &&
								validators.interestRateIsValid &&
								validators.interestRateIsValid &&
								validators.dueDateIsValid
							)
						}>
						Submit
					</Button>{" "}
				</ModalFooter>
			</Modal>
		</div>
	);
}
