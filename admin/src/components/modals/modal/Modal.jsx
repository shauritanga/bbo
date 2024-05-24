import React, { useEffect, useState } from "react";
import "./modal.css";
import ComboBox from "../../combo/CustomerSelection";
import { Button, TextField } from "@mui/material";
import TypeSelection from "../../combo/TypeSelection";
import ActionSelection from "../../combo/ActionSelection";
import SecuritySelection from "../../combo/SecuritySelection";

const Modal = ({ close }) => {
  const [security, setSecurity] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [customerId, setCustomerId] = useState("");
  const [volume, setVolume] = useState(0);
  const [price, setPrice] = useState(0);
  const [fees, setFees] = useState(0);
  const [amount, setAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [type, setType] = useState("");
  const [action, setAction] = useState("");
  const [securityId, setSecurityId] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/customers", {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setCustomer(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/api/securities", {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setSecurity(data))
      .catch((error) => console.log(error));
  }, []);

  if (!security && !customer) {
    return;
  }

  const handleFormSubmit = (event) => {
    const postData = {
      customer: customerId,
      security: securityId,
      type: action,
      volume,
      price,
      fees,
      amount,
      total,
    };
    fetch("http://localhost:3000/api/orders", {
      mode: "cors",
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => setSecurity(data))
      .catch((error) => console.log(error));
    close(false);
  };

  const handleCancelFormSubmit = (event) => {
    close(false);
  };

  return (
    <div className="modal">
      <div className="form-container">
        <div className="header">
          <h3>New Order</h3>
          <span onClick={() => close(false)}>x</span>
        </div>
        <form className="form">
          <div className="row">
            <div className="form-group">
              <label htmlFor="customer">Customer</label>
              <ComboBox
                label="Select Customer"
                data={customer}
                setCustomerId={setCustomerId}
              />
            </div>
            <div className="form-group">
              <label htmlFor="customer">Volume</label>
              <TextField
                id="number"
                type="number"
                sx={{ width: 300 }}
                onChange={(event) => setVolume(event.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group">
              <label htmlFor="customer">Price</label>
              <TextField
                id="number"
                type="number"
                sx={{ width: 300 }}
                onChange={(event) => setPrice(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="customer">Amount(TZS)</label>
              <TextField
                id="number"
                type="number"
                sx={{ width: 300 }}
                onChange={(event) => setAmount(event.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group">
              <label htmlFor="customer">Total Fees(TZS)</label>
              <TextField
                id="number"
                type="number"
                sx={{ width: 300 }}
                onChange={(event) => setFees(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="customer">Total(TZS)</label>
              <TextField
                id="number"
                type="number"
                sx={{ width: 300 }}
                onChange={(event) => setTotal(event.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group">
              <label htmlFor="customer">Action</label>
              <ActionSelection
                label="Select Action"
                data={[{ name: "Buy" }, { name: "Sell" }]}
                setAction={setAction}
              />
            </div>
            <div className="form-group">
              <label htmlFor="customer">Order Type</label>
              <TypeSelection
                label="Select Security/Bond"
                data={[{ name: "Security" }, { name: "Bond" }]}
                setType={setType}
              />
            </div>
          </div>
          <div className="row">
            {type === "Security" && (
              <div className="form-group">
                <label htmlFor="customer">Security</label>
                <SecuritySelection
                  label="Select Security"
                  data={security}
                  setSecurityId={setSecurityId}
                />
              </div>
            )}
          </div>
        </form>
        <div className="actions">
          <Button variant="contained" onClick={handleFormSubmit}>
            Send
          </Button>
          <Button variant="outlined" onClick={handleCancelFormSubmit}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
