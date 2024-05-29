import React, { useEffect, useState } from "react";
import "./expense.css";
import Search from "../../components/search/Search";
import CheckBox from "../../components/checkbox/CheckBox";
import ExpenseModal from "../../components/modals/expense/ExpenseModal";
import ModalView from "../../components/modals/Modal";

function Expense() {
  const [query, setQuery] = useState("");
  const [clients, setClients] = useState(null);
  const [clientId, setClientId] = useState("");
  const [expenses, setExpenses] = useState(null);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);

  const updatePayment = async (selected, status) => {
    for (let item in selected) {
      const response = await fetch(
        `http://localhost:5001/api/expenses/${selected[item]._id}`,
        {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(status),
        }
      );
      const json = await response.json();
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
      setSelected(expenses);
    } else {
      setSelected([]);
    }
  };

  useEffect(() => {
    fetch("http://localhost:5001/api/expenses")
      .then((response) => response.json())
      .then((data) => setExpenses(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5001/api/customers")
      .then((response) => response.json())
      .then((data) => setClients(data))
      .catch((error) => console.log(error));
  }, []);

  if (!clients) {
    return;
  }

  if (!expenses) {
    return <div>Loading...</div>;
  }
  const filtered = expenses?.filter((expense) =>
    expense.payee.toLowerCase().includes(query.toLowerCase())
  );
  const data = query ? filtered : expenses;
  return (
    <div className="expense">
      <div className="expense-header">
        <button onClick={() => setOpen(true)}>New Expense</button>
        <div className="expense-header-right">
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
      <div className="expense-actions">
        <Search setQuery={setQuery} />
        <div
          className="expense-actions_hiden"
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
      <div className="expense-table">
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th style={{ width: 70 }}>
                <CheckBox
                  name="all"
                  value={selected.length === expenses.length}
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
                <td>{expense.date}</td>
                <td>{expense.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalView
        title="New Expense"
        open={open}
        setOpen={setOpen}
        body={<ExpenseModal />}
        height={560}
      />
    </div>
  );
}

export default Expense;
