import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchAccount} from "../../services/accountService";
import {DeleteAccountComponent} from "./DeleteAccountComponent";
import {Card, CardBody, CardText, CardTitle} from "reactstrap";

export const ViewAccountComponent = () => {
  const currentState = useSelector((state) => state.account);
  const dispatch = useDispatch();
  
  let {id} = useParams();
  
  useEffect(() => {
    if (currentState.account.status === "init") {
      dispatch(fetchAccount({id}));
    }
  });
  
  return (
    <>
      <Card>
        <CardBody>
          <CardTitle>
            <h1>Account Details</h1>
          </CardTitle>
          <CardText>
            <h3>Account ID: <span>{currentState.account?.id}</span></h3>
            <h3>Name: <span>{currentState.account?.name}</span></h3>
            <h3>Balance: <span>{currentState.account?.balance}</span></h3>
            <h3>Opened: <span>{currentState.account?.opened}</span></h3>
            <h3>Closed: <span>{currentState.account?.closed}</span></h3>
            <h3>Confirmed: <span>{currentState.account?.confirmed}</span></h3>
            <h3>Active: <span>{currentState.account?.active}</span></h3>
            <h3>Branch ID: <span>{currentState.account?.branchId}</span></h3>
            <h3>Account Type : <span>{currentState.account?.accountType}</span></h3>
          </CardText>
          <div className="mt-5">
            <DeleteAccountComponent/>
          </div>
        </CardBody>
      </Card>
    </>
  )
}
