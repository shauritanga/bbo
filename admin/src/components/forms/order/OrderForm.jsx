import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Select from "../../select";
import { Button, Modal } from "rsuite";

const OrderForm = ({ open, setOpen, size, title }) => {
  const [security, setSecurity] = useState([]);
  const [holding, setHolding] = useState("");
  const [customer, setCustomer] = useState([]);
  const [client, setClient] = useState("");
  const [volume, setVolume] = useState(0);
  const [price, setPrice] = useState(0);
  const [fees, setFees] = useState(0);
  const [amount, setAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [type, setType] = useState("");
  const [action, setAction] = useState("");

  useEffect(() => {
    fetch("http://localhost:5001/api/customers")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error fetching customers: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setCustomer(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5001/api/securities")
      .then((response) => response.json())
      .then((data) => setSecurity(data))
      .catch((error) => console.log(error));
  }, []);

  if (!security && !customer) {
    return;
  }

  const handleFormSubmit = () => {
    const { _id: customerId } = customer.find((c) => c.name === client) || {};
    const { _id: securityId } = security.find((s) => s.name === holding) || {};
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
    console.log(postData);
    fetch("http://localhost:5001/api/orders", {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => setOpen(false))
      .catch((error) => console.log(error));
  };

  return (
    <Modal
      backdrop="static"
      open={open}
      onClose={() => setOpen(false)}
      size={size}
    >
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ width: "100%" }}>
        <Form>
          <FormRow>
            <FormGroup>
              <label htmlFor="customer">Customer</label>
              <Select
                width={340}
                value={client}
                onChange={(event) => setClient(event.target.value)}
              >
                <option value="" disabled>
                  Select Customer
                </option>
                {customer?.map((customer) => (
                  <option key={customer._id} value={customer.name}>
                    {customer.name}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <FormGroup>
              <label htmlFor="volume">Volume</label>
              <TextInput
                id="volume"
                type="number"
                onChange={(event) => setVolume(event.target.value)}
              />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <label htmlFor="price">Price</label>
              <TextInput
                id="price"
                type="number"
                onChange={(event) => setPrice(event.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="amount">Amount(TZS)</label>
              <TextInput
                id="amount"
                type="number"
                onChange={(event) => setAmount(event.target.value)}
              />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <label htmlFor="fees">Total Fees(TZS)</label>
              <TextInput
                id="fees"
                type="number"
                onChange={(event) => setFees(event.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="total">Total(TZS)</label>
              <TextInput
                id="total"
                type="number"
                onChange={(event) => setTotal(event.target.value)}
              />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <label htmlFor="action">Action</label>
              <Select
                width={340}
                value={action}
                onChange={(event) => setAction(event.target.value)}
              >
                <option value="" disabled>
                  Select Order Type
                </option>
                <option value="Buy">Buy</option>
                <option value="Sell">Sell</option>
              </Select>
            </FormGroup>
            <FormGroup>
              <label htmlFor="customer">Order Type</label>
              <Select
                width={340}
                value={type}
                onChange={(event) => setType(event.target.value)}
              >
                <option value="" disabled>
                  Select Holdings
                </option>
                <option value="Bond">Bond</option>
                <option value="Security">Security</option>
              </Select>
            </FormGroup>
          </FormRow>
          {type === "Security" && (
            <FormRow>
              <div>
                <label htmlFor="customer">Security</label>
                <Select
                  width={340}
                  value={holding}
                  onChange={(event) => setHolding(event.target.value)}
                >
                  <option value="" disabled>
                    Select Security
                  </option>
                  {Array.isArray(security) &&
                    security.map((item) => (
                      <option key={item._id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                </Select>
              </div>
            </FormRow>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            handleFormSubmit();
          }}
          appearance="primary"
        >
          Ok
        </Button>
        <Button
          onClick={() => {
            setOpen(false);
          }}
          appearance="subtle"
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const TextInput = styled.input`
  width: 340px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 7px;
  font-size: 16px;
`;

export default OrderForm;