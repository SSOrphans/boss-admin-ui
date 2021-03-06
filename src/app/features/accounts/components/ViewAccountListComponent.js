import React, {useEffect} from "react";
import "./ViewAccountListComponent.css";
import {ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, Table} from "reactstrap"
import {useDispatch, useSelector} from "react-redux";
import {fetchAccountList} from "../../services/accountService";
import {changePage, setFilter, setKeyword, setLimit, setSortBy, toggleFilterDropdown} from "../slices/accountListSlice"
import {FaFilter} from "react-icons/fa";
import PaginationComponent from "../../shared/components/PaginationComponent";

export const ViewAccountListComponent = () => {
  const currentState = useSelector((state) => state.accountList);
  const dispatch = useDispatch();
  const accountTypes = [
    "ACCOUNT_INVALID",
    "ACCOUNT_SAVING",
    "ACCOUNT_CHECKING",
    "ACCOUNT_CREDIT"
  ]
  
  useEffect(() => {
    if (currentState.accountPage.status === "init") {
      dispatch(fetchAccountList());
    }
  });
  
  const _setSortBy = (sortBy) => {
    const {payload} = dispatch(setSortBy({sortBy}));
    dispatch(fetchAccountList({...currentState.accountPage.options, ...payload}));
  }
  
  const _setKeyword = (event) => {
    const keyword = event.target.value;
    const {payload} = dispatch(setKeyword({keyword}));
    dispatch(fetchAccountList({...currentState.accountPage.options, ...payload}))
  }
  
  const _setFilter = (filter) => {
    if (filter === accountTypes[0] || !accountTypes.includes(filter))
      filter = "";
    const {payload} = dispatch(setFilter({filter}));
    dispatch(fetchAccountList({...currentState.accountPage.options, ...payload}))
  }
  
  const _setLimit = (limit) => {
    const {payload} = dispatch(setLimit({limit, offset:0}));
    dispatch(fetchAccountList({...currentState.accountPage.options, ...payload}))
  }
  
  const _changePage = (newPage) => {
    newPage = newPage % currentState.accountPage.pages;
    const {payload} = dispatch(changePage({offset: newPage}))
    dispatch(fetchAccountList({...currentState.accountPage.options, ...payload}))
  
  }
  
  const toggleDropdown = () => {
    dispatch(toggleFilterDropdown());
  }
  
  const formatType = (unformattedType) => {
    if (unformattedType === accountTypes[0] || !accountTypes.includes(unformattedType))
      return "Filter";
    let type = unformattedType?.toLowerCase().replace("account_", "");
    type = type.charAt(0).toUpperCase() + type.slice(1);
    return type;
  }
  
  const renderAccounts = () => {
    if (currentState.accountPage.status === "init")
      return;
    return currentState.accountPage.accounts.map(
      account => (
        <tr key={account.id}>
          <td><a href={`/accounts/${account.id}`}>{account.id}</a></td>
          <td>{account.name}</td>
          <td>{account.balance}</td>
          <td>{account.accountType.replace("ACCOUNT_", "")}</td>
          <td>{account.opened}</td>
          <td>{account.closed ? account.closed : "-"}</td>
          <td>{account.confirmed ? "yes" : "no"}</td>
          <td>{account.active ? "yes" : "no"}</td>
          <td>{account.users.map(user => user.username)}</td>
        </tr>
      )
    )
  };
  
  return (
    <>
      <div className='form-group form-inline search-filter'>
        <input
          className='form-control'
          type='text'
          placeholder='Enter account   number..'
          onChange={(val) => _setKeyword(val)}
        />
        <ButtonDropdown isOpen={currentState.accountPage.isFilterDropdownOpen} toggle={toggleDropdown}>
          <DropdownToggle className='dropdown' caret>
            {formatType(currentState.accountPage.filter)}
            <FaFilter className='mx-1 align-middle'/>
          </DropdownToggle>
          <DropdownMenu right>
            {accountTypes.map((type) => (
              <DropdownItem
                key={accountTypes.indexOf(type)}
                onClick={() => _setFilter(type)}>
                {type === accountTypes[0]
                  ? "None"
                  : formatType(type)}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </ButtonDropdown>
      </div>
      <Table striped bordered dark>
        <thead>
        <tr>
          <th onClick={() => _setSortBy("id")}>ID</th>
          <th onClick={() => _setSortBy("name")}>Name</th>
          <th onClick={() => _setSortBy("balance")}>Balance</th>
          <th onClick={() => _setSortBy("accountType")}>Type</th>
          <th onClick={() => _setSortBy("opened")}>Open Date</th>
          <th onClick={() => _setSortBy("closed")}>Close Date</th>
          <th onClick={() => _setSortBy("confirmed")}>Confirmed</th>
          <th onClick={() => _setSortBy("active")}>Active</th>
          <th onClick={() => _setSortBy("id")}>Users</th>
        </tr>
        </thead>
        <tbody>
        {renderAccounts()}
        </tbody>
      </Table>
      <div className="d-flex flex-row flex-wrap pagination-limit">
        <PaginationComponent
          totalPages={currentState.accountPage.pages}
          currentPage={currentState.accountPage.options.offset}
          maxSize={10}
          onPageChanged={(i) => {
            _changePage(currentState.accountPage.options.offset + i);
          }}
        />
        <select
          className='custom-select w-auto'
          value={currentState.accountPage.options.limit}
          onChange={(event) => {
            _setLimit(event.target.value);
          }}>
          <option value='1'>1 item per page</option>
          <option value='5'>5 items per page</option>
          <option value='10'>10 items per page</option>
          <option value='20'>20 items per page</option>
        </select>
      </div>
    </>
  )
}
