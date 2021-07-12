import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, Table } from "reactstrap";
import { fetchCardList } from "../../services/card-service";
import { changePage, setFilter, setKeyword, setLimit, setSortBy, toggleFilterDropdown } from "../slices/card-list-slice"
import { FaFilter } from "react-icons/fa";
import PaginationComponent from "../../shared/components/PaginationComponent";

export const CardListComponent = () => {
  const currentState = useSelector(state => state.cardList);
  const dispatch = useDispatch();
  const cardTypes = [
    "CARD_INVALID",
    "CARD_PLAIN",
    "CARD_GOLD",
    "CARD_PLATINUM"
  ];

  useEffect(() => {
    if (currentState.cardPage.status === "init")
      dispatch(fetchCardList());
  });

  const _convertDate = (datems) => {
    console.log(`Date MS: ${datems}`);
    if (datems === undefined)
      return "Invalid";
    const d = new Date(datems).toISOString();
    return d.substr(0, d.indexOf('T'));
  };

  const _convertExpiry = (datems) => {
    const date = new Date(datems);
    let month = '' + date.getMonth();
    const year = ('' + date.getFullYear()).substr(2);
    if (month.length < 2)
      month = '0' + month;

    return [month, year].join('/');
  };

  const _setSortBy = (sortBy) => {
    const {payload} = dispatch(setSortBy({sortBy}));
    dispatch(fetchCardList({...currentState.cardPage.options, ...payload}));
  }

  const _setKeyword = (event) => {
    const keyword = event.target.value;
    const {payload} = dispatch(setKeyword({keyword}));
    dispatch(fetchCardList({...currentState.cardPage.options, ...payload}))
  }

  const _setFilter = (filter) => {
    if (filter === cardTypes[0] || !cardTypes.includes(filter))
      filter = "";
    const {payload} = dispatch(setFilter({filter}));
    dispatch(fetchCardList({...currentState.cardPage.options, ...payload}))
  }

  const _setLimit = (limit) => {
    const {payload} = dispatch(setLimit({limit, offset:0}));
    dispatch(fetchCardList({...currentState.cardPage.options, ...payload}))
  }

  const _changePage = (newPage) => {
    newPage = newPage % currentState.cardPage.pages;
    const {payload} = dispatch(changePage({offset: newPage}));
    dispatch(fetchCardList({...currentState.cardPage.options, ...payload}))
  }

  const toggleDropdown = () => {
    dispatch(toggleFilterDropdown());
  }

  const formatType = (unformattedType) => {
    if (unformattedType === cardTypes[0] || !cardTypes.includes(unformattedType))
      return "Filter";
    let type = unformattedType?.toLowerCase().replace("card_", "");
    type = type.charAt(0).toUpperCase() + type.slice(1);
    return type;
  }

  const renderCards = () => {
    if (currentState.cardPage.status === "init")
      return;
    return currentState.cardPage.cards.map(card => (
      <tr key={card.id}>
        <td><a href={`/cards/${card.id}`}>{ card.id }</a></td>
        <td>{ card.type }</td>
        <td>{ card.lastFour }</td>
        <td>{ _convertDate(card.created) }</td>
        <td>{ _convertDate(card.activeSince) }</td>
        <td>{ _convertExpiry(card.expirationDate) }</td>
        <td>{ card.confirmed ? "yes" : "no" }</td>
        <td>{ card.active ? "yes" : "no" }</td>
        <td>{ card.stolen ? "yes" : "no" }</td>
      </tr>
    ));
  };

  return (
    <>
      <div className='form-group form-inline search-filter'>
        <input
          className='form-control'
          type='text'
          placeholder='Enter card number...'
          onChange={(val) => _setKeyword(val)}
        />
        <ButtonDropdown isOpen={currentState.cardPage.isFilterDropdownOpen} toggle={toggleDropdown}>
          <DropdownToggle className='dropdown' caret>
            {formatType(currentState.cardPage.filter)}
            <FaFilter className='mx-1 align-middle'/>
          </DropdownToggle>
          <DropdownMenu right>
            {cardTypes.map((type) => (
              <DropdownItem
                key={cardTypes.indexOf(type)}
                onClick={() => _setFilter(type)}>
                {type === cardTypes[0]
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
          <th onClick={() => _setSortBy("type")}>Type</th>
          <th onClick={() => _setSortBy("lastFour")}>Last Four</th>
          <th onClick={() => _setSortBy("created")}>Created</th>
          <th onClick={() => _setSortBy("activeSince")}>Active Since</th>
          <th onClick={() => _setSortBy("expires")}>Expires</th>
          <th onClick={() => _setSortBy("confirmed")}>Confirmed</th>
          <th onClick={() => _setSortBy("active")}>Active</th>
          <th onClick={() => _setSortBy("stolen")}>Stolen</th>
        </tr>
        </thead>
        <tbody>
          { renderCards() }
        </tbody>
      </Table>
      <div className="d-flex flex-row flex-wrap pagination-limit">
        <PaginationComponent
          totalPages={currentState.cardPage.pages}
          currentPage={currentState.cardPage.options.offset}
          maxSize={10}
          onPageChanged={(i) => {
            _changePage(currentState.cardPage.options.offset + i);
          }}
        />
        <select
          className='custom-select w-auto'
          value={currentState.cardPage.options.limit}
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
  );
};