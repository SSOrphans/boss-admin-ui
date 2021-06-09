import React from "react";
import { useDispatch } from "react-redux";

import { confirmDelete } from "../slices/card-detail-slice";
import { deleteCard } from "../../services/card-service";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export const CardConfirmModal = ({ currentState }) => {
  const dispatch = useDispatch();
  const props = currentState.props;

  const onCancel = () => {
    dispatch(confirmDelete(false));
  };

  const onDelete = () => {
    dispatch(deleteCard(currentState.card.id));
    dispatch(confirmDelete(false));
  };

  return (
    <Modal centered animation={false} show={props.showConfirmModal}>
      <Modal.Body>
        <Modal.Title>Confirm delete?</Modal.Title>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onDelete}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
