import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {Card, CardBody, CardTitle} from "reactstrap";
import ReactDatePicker from "react-datepicker";
import {createAccount} from "../../services/accountService";

export const CreateAccountComponent = () => {
  const [form, setForm] = useState({
    name: "",
    balance: "",
    opened: null,
    confirmed: false,
    active: false,
    closed: null,
    branch_id: "",
    account_type: 0,
    user_ids: []
  });
  
  const dispatch = useDispatch();
  
  const onCreateAccount = () => {
    const payload = {
      ...form,
      opened: form.opened ? formatDate(form.opened) : null,
      closed: form.closed ? formatDate(form.closed) : null
    }
    dispatch(createAccount(payload));
  }
  
  const formatDate = (date) => {
    let month = '' + (date.getMonth() + 1),
      day = '' + date.getDate(),
      year = date.getFullYear();
    
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    
    return [month, day, year].join('/');
  }
  
  return (
    <>
      <Card>
        <CardBody>
          <CardTitle>
            <h1>Create Account </h1>
          </CardTitle>
          <div>
            <div className="form-group row">
              <label htmlFor="inputAccountName" className="col-sm-2 col-form-label">Account Name:</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="inputAccountName" placeholder="Account Name"
                       name="name" value={form.name} onChange={e => setForm({...form, name: e.target.value})}/>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="inputAccountOwners" className="col-sm-2 col-form-label">Account Owner Id(s):</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="inputAccountOwners" placeholder="Account Owner Id(s)"
                       name="user_ids" value={form.user_ids.join(",")}
                       onChange={e => setForm({...form, user_ids: e.target.value.split(',')})}/>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="inputAccountBalance" className="col-sm-2 col-form-label">Account Balance:</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="inputAccountBalance" placeholder="Account Balance"
                       name="balance" value={form.balance} onChange={e => setForm({...form, balance: e.target.value})}/>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-2">Opened</div>
              <div className="col-sm-10">
                <div className="form-check">
                  <ReactDatePicker selected={form.opened} onChange={(date) => setForm({...form, opened: date})}/>
                </div>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-2">Closed</div>
              <div className="col-sm-10">
                <div className="form-check">
                  <ReactDatePicker selected={form.closed} onChange={(date) => setForm({...form, closed: date})}/>
                </div>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-2">Confirmed</div>
              <div className="col-sm-10">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="inputAccountConfirmed" name="confirmed"
                         defaultChecked={form.confirmed}
                         onChange={e => setForm({...form, confirmed: e.target.checked})}/>
                </div>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-2">Active</div>
              <div className="col-sm-10">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="inputAccountActive" name="active"
                         defaultChecked={form.active} onChange={e => setForm({...form, active: e.target.checked})}/>
                </div>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="inputAccountName" className="col-sm-2 col-form-label">Account Branch Id :</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="inputAccountBranchId" placeholder="Account Branch Id"
                       name="branch_id" value={form.branch_id}
                       onChange={e => setForm({...form, branch_id: e.target.value})}/>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="inputAccountType" className="col-sm-2 col-form-label">AccountType</label>
              <div className="col-sm-10">
                <select className="custom-select my-1 mr-sm-2" id="inputAccountType" name="account_type"
                        defaultValue={form.account_type}
                        onChange={e => setForm({...form, account_type: e.target.value})}>
                  <option value="0">Choose...</option>
                  <option value="1">Checking</option>
                  <option value="2">Savings</option>
                  <option value="3">Credit</option>
                </select>
              </div>
            </div>
            <button type="button" className="btn btn-primary" color="primary" onClick={onCreateAccount}>Create</button>
          </div>
        </CardBody>
      </Card>
    </>
  )
}
