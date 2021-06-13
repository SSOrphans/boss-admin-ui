import React, { useState } from "react";

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

export default function LoanModal({
	isModalOpen,
	setModalIsOpen,
	loanTypes,
	formatLoanType,
	onSubmit,
}) {
	const toggle = () => setModalIsOpen(!isModalOpen);
	const [branchId, setbranchId] = useState(0);
	const [userId, setUserId] = useState(0);
	const [loanType, setLoanType] = useState(0);
	const [amount, setAmount] = useState(0);
	const [amountDue, setAmountDue] = useState(0);
	const [interestRate, setInterestRate] = useState(0);
	const [dueDate, setDueDate] = useState(Date.now());

	const [validators, setValidators] = useState({
		branchIdIsValid: true,
		userIdIsValid: true,
		amountIsValid: true,
		amountDueIsValid: true,
		interestRateIsValid: true,
		dueDateIsValid: true,
	});

	const submit = (e) => {
		e.preventDefault();
		const loan = {
			branchId: branchId,
			userId: userId,
			loanType: loanType,
			amount: amount,
			amountDue: amountDue,
			interestRate: interestRate,
			dueBy: dueDate,
		};
		onSubmit(loan);
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
				<ModalHeader toggle={toggle}>Create new Loan</ModalHeader>
				<ModalBody>
					<Form>
						<Row form>
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
							}>
							{loanTypes.map((type) => (
								<option key={type.id}>
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
						Add loan
					</Button>{" "}
				</ModalFooter>
			</Modal>
		</div>
	);
}
