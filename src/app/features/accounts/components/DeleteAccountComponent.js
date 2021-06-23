import React from "react";
import {useDispatch} from "react-redux";
import {deleteAccount} from "../../services/accountService";

export const DeleteAccountComponent = ({accountId}) => {
  const dispatch = useDispatch();
  
  const onDeleteAccount = () => {
    const id = accountId;
    dispatch(deleteAccount({id}));
  }
  
  return (
    <a className="btn btn-danger" href={"/accounts"} color="danger" onClick={onDeleteAccount}>Delete</a>
  )
}
