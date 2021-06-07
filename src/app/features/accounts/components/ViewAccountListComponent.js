import React, {useEffect} from "react";
import {Table} from "reactstrap"
import {useDispatch, useSelector} from "react-redux";
import {fetchAccountList} from "../../services/accountService";
import {setSort} from "../slices/accountListSlice"

export const ViewAccountListComponent = () => {
  const currentState = useSelector((state) => state.accountList);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (currentState.accountPage.status === "init") {
      dispatch(fetchAccountList());
    }
  });
  
  const renderAccounts = () => {
    if (currentState.accountPage.status === "init")
      return;
    return currentState.accountPage.accounts.map(
      account => (
        <tr key={account.id}>
          <td><a href={`/accounts/${account.id}`}>{account.id}</a></td>
          <td>{account.name}</td>
          <td>{account.balance}</td>
          <td>{account.accountType}</td>
          <td>{account.opened}</td>
          <td>{account.closed ? account.closed : "-"}</td>
          <td>{account.confirmed ? "yes" : "no"}</td>
          <td>{account.active ? "yes" : "no"}</td>
          <td>{account.users.map(user => user.username)}</td>
        </tr>
      )
    )
  };
  
  const setSortBy = (sortBy) => {
    const {payload} = dispatch(setSort({sortBy}));
    dispatch(fetchAccountList(payload));
  }
  
  return (
    <Table striped bordered>
      <thead>
      <tr>
        <th onClick={() => setSortBy("id")}>ID</th>
        <th onClick={() => setSortBy("name")}>Name</th>
        <th onClick={() => setSortBy("balance")}>Balance</th>
        <th onClick={() => setSortBy("accountType")}>Type</th>
        <th onClick={() => setSortBy("opened")}>Open Date</th>
        <th onClick={() => setSortBy("closed")}>Close Date</th>
        <th onClick={() => setSortBy("confirmed")}>Confirmed</th>
        <th onClick={() => setSortBy("active")}>Active</th>
        <th onClick={() => setSortBy("id")}>Users</th>
      </tr>
      </thead>
      <tbody>
      {renderAccounts()}
      </tbody>
    </Table>
  )
}
