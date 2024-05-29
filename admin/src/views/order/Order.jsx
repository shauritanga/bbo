import React, { useState } from "react";
import { useLocation } from "react-router";
import { DatePicker, Input, InputNumber, InputPicker, Stack } from "rsuite";
import styled from "styled-components";
import "rsuite/InputNumber/styles/index.css";
import Select from "../../components/select";

const data = ["Eugenia", "Bryan", "Linda", "Nancy", "Lloyd"].map((item) => ({
  label: item,
  value: item,
}));

const OrderView = () => {
  const { state } = useLocation();
  const [customer, setCustomer] = useState(state.customer?.name);
  const [volume, setVolume] = useState(state.volume);
  const [price, setPrice] = useState(state.price);
  const [amount, setAmount] = useState(state.price * state.volume);
  const [type, setType] = useState(state.type);
  const [security, setSecurity] = useState(state.security?.name);
  console.log(customer);
  console.log(state.date);

  return (
    <Wrapper>
      <Main>
        <Balance>
          Order Balance: 45,000,000
          <Form>
            <FormGroup>
              <FormController>
                <label htmlFor="customer">Customer</label>
                <Select
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                >
                  <option value="">Select Customer</option>
                  <option value="Salim Abu">Salim Abu</option>
                  <option value="Athanas Shauritanga">
                    Athanas Shauritanga
                  </option>
                  <option value="Daudi Ramadhani">Daudi Ramadhani</option>
                  <option value="Doreen Masaki">Doreen Masaki</option>
                  <option value="James Mwang'amba">James Mwang'amba</option>
                </Select>
              </FormController>
              <FormController>
                <label htmlFor="date">Order Date</label>
                <DatePicker
                  style={{ width: "100%" }}
                  id="date"
                  defaultValue={new Date(state.date)}
                />
              </FormController>
            </FormGroup>
            <FormGroup>
              <FormController>
                <label htmlFor="customer">Volume</label>
                <TextInput
                  value={volume}
                  type="number"
                  onChange={(e) => setVolume(e.target.value)}
                />
              </FormController>
              <FormController>
                <label htmlFor="date">Price</label>
                <TextInput
                  value={price}
                  type="number"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </FormController>
            </FormGroup>
            <FormGroup>
              <FormController>
                <label htmlFor="customer">Amount(TZS)</label>
                <TextInput
                  disabled
                  value={amount}
                  type="number"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </FormController>
              <FormController>
                <label htmlFor="date">Order Type</label>
                <Select value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="">Select Type</option>

                  <option value="Buy">Buy</option>
                  <option value="Sell">Sell</option>
                </Select>
              </FormController>
            </FormGroup>
            <FormGroup>
              <FormController>
                <label htmlFor="customer">Security/Bond</label>
                <InputPicker
                  data={data}
                  style={{ width: "100%" }}
                  id="customer"
                />
              </FormController>
              <FormController>
                <label htmlFor="date">Security</label>
                <Select
                  value={security}
                  onChange={(e) => setSecuritty(e.target.value)}
                >
                  <option value="">Select Security</option>

                  <option value="NICO">Buy</option>
                  <option value="CRDB">Sell</option>
                </Select>
              </FormController>
            </FormGroup>
            <Input as="textarea" rows={3} placeholder="Textarea" />
          </Form>
        </Balance>
        <Execution>new execution</Execution>
      </Main>
      <Aside>
        <Portfolio>
          <Avatar></Avatar>
          <Table>
            <tr>
              <TableDataCell colSpan={2} style={{ textAlign: "center" }}>
                Customer Portfolio
              </TableDataCell>
            </tr>
            <tr>
              <TableDataCell colSpan={2} style={{ textAlign: "center" }}>
                Athanas Shauritanga
              </TableDataCell>
            </tr>
            <tr>
              <TableDataCell>CDS</TableDataCell>
              <TableDataCell>6754009</TableDataCell>
            </tr>
            <tr>
              <TableDataCell>Balance</TableDataCell>
              <TableDataCell>69000</TableDataCell>
            </tr>
            <tr>
              <TableDataCell>Shares</TableDataCell>
              <TableDataCell>540</TableDataCell>
            </tr>
            <tr>
              <TableDataCell>Status</TableDataCell>
              <TableDataCell>Active</TableDataCell>
            </tr>
          </Table>
        </Portfolio>
        <Actions>
          <Button>aa</Button>
          <Button>bb</Button>
          <Button>cc</Button>
        </Actions>
      </Aside>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  gap: 30px;
`;
const Main = styled.div`
  display: flex;
  flex-direction: column;
  flex: 5;
  gap: 20px;
  background-color: transparent;
  border-radius: 7px;
`;
const Balance = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 7px;
  padding: 20px;
`;
const Form = styled.form`
  display: flex;
  margin-top: 30px;
  flex-direction: column;
  gap: 20px;
`;
const FormGroup = styled.div`
  display: flex;
  gap: 30px;
`;
const FormController = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 4px;
`;
const TextInput = styled.input`
  border: 0.2px solid;
  border-radius: 7px;
  padding: 8px 15px;
`;
const Execution = styled.div`
  display: flex;
  background-color: #fff;
  border-radius: 7px;
  padding: 20px;
`;
const Aside = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  border-radius: 7px;
  background-color: inherit;
  gap: 30px;
`;
const Portfolio = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 20px;
  border-radius: 7px;
  background-color: #fff;
`;
const Avatar = styled.div`
  height: 56px;
  width: 56px;
  background-color: red;
  border-radius: 50%;
`;
const Table = styled.table`
  width: 100%;
`;
const TableDataCell = styled.td`
  border: 1px solid;
  padding: 10px;
`;
const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border-radius: 7px;
  background-color: #fff;
`;
const Button = styled.button`
  padding: 10px;
  border-radius: 7px;
`;
export default OrderView;
