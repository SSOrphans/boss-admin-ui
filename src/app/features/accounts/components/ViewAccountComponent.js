import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchAccount} from "../../services/accountService";

export const ViewAccountComponent = () => {
  const {account} = useSelector((state) => state.account);
  const dispatch = useDispatch();
  
  let {id} = useParams()
  
  useEffect(() => {
    dispatch(fetchAccount({id: id}));
  }, []);
  
  return (
    <>
      <h1>Account Details</h1>
      <h3>Account ID: <span>{account?.id}</span></h3>
      <h3>Name: <span>{account?.name}</span></h3>
      <h3>Balance: <span>{account?.balance}</span></h3>
      <h3>Opened: <span>{account?.opened}</span></h3>
      <h3>Closed: <span>{account?.closed}</span></h3>
      <h3>Confirmed: <span>{account?.confirmed}</span></h3>
      <h3>Active: <span>{account?.active}</span></h3>
      <h3>Branch ID: <span>{account?.branchId}</span></h3>
      <h3>Account Type : <span>{account?.accountType}</span></h3>
    </>
  )
}
