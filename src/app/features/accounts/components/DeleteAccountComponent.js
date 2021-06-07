import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "reactstrap";
import {deleteAccount} from "../../services/accountService";

export const DeleteAccountComponent = () => {
  const currentState = useSelector((state) => state.account);
  const dispatch = useDispatch();
  
  const onDeleteAccount = () => {
    const id = currentState.account.id;
    dispatch(deleteAccount({id}));
  }
  
  return (
    <Button color="danger" onClick={onDeleteAccount} hidden={currentState.account.status !== "fetched"}>Delete</Button>
  )
}
