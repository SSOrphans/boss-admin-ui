import React, {useState} from "react";
import "./ViewAccountListComponent.css";
import {DeleteAccountComponent} from "./DeleteAccountComponent";

export const ViewAccountListItemComponent = ({account, colLength}) => {
  const [expanded, setExpanded] = useState(false);
  
  const _toggleExpand = () => {
    if (!expanded) {
      setExpanded(true);
    } else {
      setExpanded(false);
    }
  }
  
  return [
    <tr key={account.id} onClick={_toggleExpand}>
      <td>{account.id}</td>
      <td>{account.name}</td>
      <td>{account.balance}</td>
      <td>{account.accountType.replace("ACCOUNT_", "")}</td>
      <td>{account.opened}</td>
      <td>{account.closed ? account.closed : "-"}</td>
      <td>{account.confirmed ? "yes" : "no"}</td>
      <td>{account.active ? "yes" : "no"}</td>
      <td>{account.users.map(user => user.username)}</td>
    </tr>,
    
    expanded && (
      <tr key={"exp" + account.id}>
        <td colSpan={colLength}>
          <div>
            <DeleteAccountComponent accountId={account.id}/>
          </div>
        </td>
      </tr>
    )
  ]
}
