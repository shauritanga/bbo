import React, { useEffect, useState } from "react";
import "./expenseModal.css";

function ExpenseModal() {
  const [transactionDate, settransactionDate] = useState("");
  const [amount, setAmount] = useState(0);
  const [reference, setReference] = useState("");
  const [description, setDescription] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [paymentMethodId, setPaymentMethodId] = useState("");
  const [payee, setPayee] = useState(null);
  const [category, setCategory] = useState(null);
  const [realAccount, setRealAccount] = useState(null);

  const payment = {
    transactionDate,
    amount,
    reference,
    description,
    method: paymentMethodId,
    payee,
    category,
    realAccount,
  };

  useEffect(() => {
    fetch("http://localhost:5001/api/paymethods", {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setPaymentMethod(data))
      .catch((error) => console.log(error));
  }, []);

  if (!paymentMethod) {
    return;
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:5001/api/expenses", {
      method: "post",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payment),
    });
    const res = await response.json();
    console.log(res);
    setOpenReceiptForm(false);
  };

  const handleCancelFormSubmit = async (event) => {
    event.preventDefault();
    setOpenReceiptForm(false);
  };
  return (
    <form action="" className="payment-modal-form">
      <div className="row">
        <div className="payment-modal-form-control">
          <label htmlFor="transaction-date">Transaction Date</label>
          <input
            type="text"
            placeholder="dd-mm-yyyy"
            id="transaction-date"
            value={transactionDate}
            onChange={(event) => settransactionDate(event.target.value)}
          />
        </div>
        <div className="payment-modal-form-control">
          <label htmlFor="amount">Amount</label>
          <input
            type="text"
            placeholder="Amount"
            id="amount"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
        </div>
      </div>
      <div className="row">
        <div className="payment-modal-form-control">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            required
            className="select"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="">Select Category</option>
            <optgroup label="Categories">
              <option value="sale">Sale</option>
              <option value="buy">Buy</option>
            </optgroup>
          </select>
        </div>
        <div className="payment-modal-form-control">
          <label htmlFor="real-account">Real Account</label>
          <select
            id="real-account"
            required
            className="select"
            value={realAccount}
            onChange={(event) => setRealAccount(event.target.value)}
          >
            <option value="">Real Account</option>
            <optgroup label="Accounts">
              <option value="purchases">purchase</option>
              <option value="expenses">expense</option>
            </optgroup>
          </select>
        </div>
      </div>
      <div className="row">
        <div className="payment-modal-form-control">
          <label htmlFor="payee">Payee</label>
          <select
            required
            className="select"
            value={payee}
            onChange={(event) => setPayee(event.target.value)}
          >
            <option value="">Select payee</option>
            <option value="Athanas">Athanas Shauritanga</option>
          </select>
        </div>
        <div className="payment-modal-form-control">
          <label htmlFor="pay-method">Payement Method</label>
          <select
            className="select"
            required
            value={paymentMethodId}
            onChange={(event) => setPaymentMethodId(event.target.value)}
          >
            <option value="">Select Payment Method</option>
            {paymentMethod.map((method) => (
              <option value={method._id}>{method.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="row">
        <div className="payment-modal-form-control">
          <label htmlFor="cheque">Cheque Number</label>
          <input
            type="text"
            placeholder="Chque Number"
            id="cheque"
            value={reference}
            onChange={(event) => setReference(event.target.value)}
          />
        </div>
      </div>
      <div className="row">
        <div className="payment-modal-form-control">
          <label htmlFor="Description">Description</label>
          <textarea
            name="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          >
            Description
          </textarea>
        </div>
      </div>
      <div className="payment-modal-actions">
        {/* <button onClick={handleFormSubmit}>Send</button>
            <button className="cancel" onClick={handleCancelFormSubmit}>
              Cancel
            </button> */}
      </div>
    </form>
  );
}

export default ExpenseModal;
