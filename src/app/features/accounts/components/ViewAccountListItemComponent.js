import React, {useState} from "react";
import styles from "./ViewAccountListComponent.module.css";
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
    <tr className={styles.tr} key={account.id} onClick={_toggleExpand}>
      <td className={styles.td} >{account.id}</td>
      <td className={styles.td}>{account.name}</td>
      <td className={styles.td}>{account.balance}</td>
      <td className={styles.td}>{account.accountType.replace("ACCOUNT_", "")}</td>
      <td className={styles.td}>{account.opened}</td>
      <td className={styles.td}>{account.closed ? account.closed : "-"}</td>
      <td className={styles.td}>{account.confirmed ? "yes" : "no"}</td>
      <td className={styles.td}>{account.active ? "yes" : "no"}</td>
      <td className={styles.td}>{account.users.map(user => user.username)}</td>
    </tr>,
    
    expanded && (
      <tr className={styles.tr} key={"exp" + account.id}>
        <td className={styles.td} colSpan={colLength}>
          <div>
            <DeleteAccountComponent accountId={account.id}/>
          </div>
        </td>
      </tr>
    )
  ]
}
