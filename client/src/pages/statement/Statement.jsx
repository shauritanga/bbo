import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Statement = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <h3>Statement</h3>
      <TextInput placeholder="Search reference..." />
      <Table width="100%" style={{ marginTop: 50 }}>
        <thead>
          <TableRowHeader>
            <TableHaeader>id</TableHaeader>
            <TableHaeader>date</TableHaeader>
            <TableHaeader>type</TableHaeader>
            <TableHaeader>reference</TableHaeader>
            <TableHaeader>particulars</TableHaeader>
            <TableHaeader>quantity</TableHaeader>
            <TableHaeader>price</TableHaeader>
            <TableHaeader>Amount</TableHaeader>
            <TableHaeader>balance</TableHaeader>
          </TableRowHeader>
        </thead>
        <tbody>
          <tr>
            <TableData>ATR1372</TableData>
            <TableData>2022-08-26</TableData>
            <TableData>Debit</TableData>
            <TableData>6198465</TableData>
            <TableData>Buying of Shares CRDB</TableData>
            <TableData>50</TableData>
            <TableData>TZS 415.00</TableData>
            <TableData>TZS 8,496.38</TableData>
            <TableData>TZS 8,496.38 Dr</TableData>
          </tr>
          <tr>
            <TableData>ATR51230</TableData>
            <TableData>2024-02-29</TableData>
            <TableData>Credit</TableData>
            <TableData>6098465</TableData>
            <TableData>Purchase of shares</TableData>
            <TableData>1</TableData>
            <TableData>TZS 52,000.00</TableData>
            <TableData>TZS 52,000.00</TableData>
            <TableData>TZS 818.43 Cr</TableData>
          </tr>
        </tbody>
      </Table>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 80%;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 4px;
  margin: 0 auto;
  filter: drop-shadow(0px 2px 8px rgba(74, 70, 132, 0.4));
`;

const TextInput = styled.input`
  border-radius: 4px;
  border: 1px solid #999;
  padding: 10px;
  width: 100%;
  outline: none;
`;

const Table = styled.table`
  //border: 1px solid hsl(205 50% 50%);
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
  color: #212121;
  font-size: 14px;
  font-weight: 400;
`;

const Button = styled.button`
  background-color: inherit;
  color: inherit;
  padding: 8px 20px;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid hsl(205 50% 50%);
`;

export default Statement;
