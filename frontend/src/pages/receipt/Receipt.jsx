import React, { useEffect, useState } from "react";
import "./receipt.css";
import Search from "../../components/search/Search";
import ReceiptModal from "../../components/modals/receipt/ReceiptModal";
import dayjs from "dayjs";
import CheckBox from "../../components/checkbox/CheckBox";

function Receipt() {
  const [checked, setChecked] = useState(false);
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(false);
  const [clients, setClients] = useState(null);
  const [clientId, setClientId] = useState("");
  const [receipts, setReceipts] = useState(null);
  const [openReceiptForm, setOpenReceiptForm] = useState(false);
  const [selected, setSelected] = useState([]);

  const updatePayment = async (selected, status) => {
    for (let item in selected) {
      console.log(selected[item]);
      const response = await fetch(
        `http://localhost:3000/api/receipts/${selected[item]._id}`,
        {
          mode: "cors",
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(status),
        }
      );
      const json = await response.json();
      console.log(json);
    }
  };

  const handleSelect = (value, obj) => {
    if (value) {
      setSelected([...selected, obj]);
    } else {
      setSelected(selected.filter((item) => item._id !== obj._id));
    }
  };

  const selectAll = (value) => {
    if (value) {
      setSelected(receipts);
    } else {
      setSelected([]);
    }
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/receipts", {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setReceipts(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/api/customers", {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setClients(data))
      .catch((error) => console.log(error));
  }, []);

  if (!clients) {
    return;
  }

  if (!receipts) {
    return <div>Loading...</div>;
  }

  const filtered = receipts.filter((expense) =>
    expense.payee.toLowerCase().includes(query.toLowerCase())
  );
  const data = query ? filtered : receipts;
  return (
    <div className="receipt">
      <div className="receipt-header">
        <button onClick={() => setOpenReceiptForm(true)}>New Receipt</button>
        <div className="receipt-header-right">
          <form>
            <select
              required
              value={clientId}
              onChange={(event) => setClientId(event.target.value)}
            >
              <option value="">--Select Client--</option>
              <optgroup label="Clients">
                {clients.map((client) => (
                  <option key={client._id} value={client._id}>
                    {client.name}
                  </option>
                ))}
              </optgroup>
            </select>
            <button>Filter</button>
          </form>
          <button>Export Excel</button>
        </div>
      </div>
      <div className="receipt-actions">
        <Search setQuery={setQuery} />
        <div
          className="receipt-actions_hiden"
          style={{ visibility: visible ? "visible" : "hidden" }}
        >
          <button
            onClick={() => updatePayment(selected, { status: "approved" })}
          >
            Approve
          </button>
          <button onClick={() => updatePayment(selected, { status: "" })}>
            Disapprove
          </button>
          <button>Reject</button>
          <button>Export(excel)</button>
        </div>
      </div>
      <div className="receipt-table">
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th style={{ width: "50px" }}>
                <CheckBox
                  name="all"
                  value={selected.length === receipts.length}
                  visible={visible}
                  setVisible={setVisible}
                  updateValue={selectAll}
                />
              </th>
              <th>id</th>
              <th>payee</th>
              <th>Description</th>
              <th>amount</th>
              <th>date</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((expense) => (
              <tr key={expense._id}>
                <td>
                  <CheckBox
                    name={expense}
                    value={selected.includes(expense)}
                    visible={visible}
                    setVisible={setVisible}
                    updateValue={handleSelect}
                  />
                </td>
                <td>{expense._id}</td>
                <td>{expense.payee}</td>
                <td>{expense.description}</td>
                <td>{expense.amount}</td>
                <td>{dayjs(expense.date).format("DD-MM-YYYY")}</td>
                <td>{expense.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {openReceiptForm && (
        <ReceiptModal setOpenReceiptForm={setOpenReceiptForm} />
      )}
    </div>
  );
}

export default Receipt;
