import Card from "components/card/Card";
import React, { useState } from "react";
import { MdOutlinePendingActions, MdOutlineSell } from "react-icons/md";
import { ImSpinner3 } from "react-icons/im";
import { AiOutlineFileDone } from "react-icons/ai";
import styled from "styled-components";
import Select from "components/select/Select";

const SellShare = () => {
  const [value, setValue] = useState("5");
  return (
    <>
      <Wrapper>
        <Card
          title="Orders"
          subtitle="Total Orders"
          quantity={20}
          icon={<MdOutlineSell size={25} />}
        />
        <Card
          title="Pending"
          subtitle="Pending Orders"
          quantity={1}
          icon={<MdOutlinePendingActions size={25} />}
        />
        <Card
          title="Processing"
          subtitle="Orders under processing"
          quantity={2}
          icon={<ImSpinner3 size={25} />}
        />
        <Card
          title="Complete"
          subtitle="Completed Orders"
          quantity={17}
          icon={<AiOutlineFileDone size={25} />}
        />
      </Wrapper>
      <TableWrapper>
        <p>Sell Shares</p>
        <Actions>
          <Select
            value={value}
            width={80}
            onChange={(e) => setValue(e.target.value)}
            backgroundColor="inherit"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </Select>
          <TextInput placeholder="Search..." />
          <Button>Export</Button>
          <Button>+ New Order</Button>
        </Actions>
        <Table width="100%" style={{ marginTop: 10 }}>
          <thead>
            <TableRowHeader>
              <TableHaeader>id</TableHaeader>
              <TableHaeader>date</TableHaeader>
              <TableHaeader>Security</TableHaeader>
              <TableHaeader>Amount</TableHaeader>
              <TableHaeader>Volume</TableHaeader>
              <TableHaeader>Price</TableHaeader>
              <TableHaeader>balance</TableHaeader>
              <TableHaeader>Status</TableHaeader>
              <TableHaeader>Actions</TableHaeader>
            </TableRowHeader>
          </thead>
          <tbody>
            <tr>
              <TableData>ATR1372</TableData>
              <TableData>2022-08-26</TableData>
              <TableData>CRDB</TableData>
              <TableData>5800</TableData>
              <TableData></TableData>
              <TableData>560</TableData>
              <TableData>TZS 415.00</TableData>
              <TableData></TableData>
              <TableData></TableData>
            </tr>
            <tr>
              <TableData>ATR51230</TableData>
              <TableData>2024-02-29</TableData>
              <TableData>NBC</TableData>
              <TableData>4800</TableData>
              <TableData></TableData>
              <TableData>415</TableData>
              <TableData>TZS 52,000.00</TableData>
              <TableData></TableData>
              <TableData></TableData>
            </tr>
          </tbody>
        </Table>
      </TableWrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  gap: 20px;
  color: hsl(205 50% 60%);
  border-radius: 4px;
`;

const TableWrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  gap: 20px;
  padding: 20px;
  color: hsl(205 50% 60%);
  color: hsl(205 50% 60%);
  border-radius: 4px;
  background-color: hsl(205 50% 15%);
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
const TextInput = styled.input`
  border: 1px solid hsl(205deg 50% 20%);
  background-color: inherit;
  color: inherit;
  margin-left: auto;
  height: 43px;
  padding: 20px;
  border-radius: 7px;
`;
const Button = styled.button`
  background-color: hsl(205 50% 60%);
  padding: 10px 20px;
  border-radius: 7px;
  cursor: pointer;
  border: none;
`;

const Table = styled.table`
  border-collapse: collapse;
`;

const TableHaeader = styled.th`
  padding: 10px 20px;
  border-top: 1px solid hsl(205 50% 50%);
  border-bottom: 1px solid hsl(205 50% 50%);
  text-align: left;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 600;
`;
const TableRowHeader = styled.tr`
  //border: 1px solid red;
`;

const TableData = styled.td`
  padding: 10px 20px;
  border-bottom: 0.2px solid hsl(205 50% 20%);
`;

export default SellShare;
