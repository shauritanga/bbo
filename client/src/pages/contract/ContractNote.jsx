import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ContractNote = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <h3>Contract Notes</h3>
      <TextInput placeholder="Search by slip number..." />
      <Table width="100%" style={{ marginTop: 50 }}>
        <thead>
          <TableRowHeader>
            <TableHaeader>Date</TableHaeader>
            <TableHaeader>Security</TableHaeader>
            <TableHaeader>Order id</TableHaeader>
            <TableHaeader>Slip number</TableHaeader>
            <TableHaeader>Type</TableHaeader>
            <TableHaeader>Price</TableHaeader>
            <TableHaeader>Executed</TableHaeader>
            <TableHaeader>Amount</TableHaeader>
            <TableHaeader>Actions</TableHaeader>
          </TableRowHeader>
        </thead>
        <tbody>
          <tr>
            <TableData>2024-02-20</TableData>
            <TableData>CRDB</TableData>
            <TableData>AOR2319</TableData>
            <TableData>6198465</TableData>
            <TableData>BUY</TableData>
            <TableData>500</TableData>
            <TableData>TZS 100.00</TableData>
            <TableData>TZS 51,183.00</TableData>
            <TableData>
              <Button onClick={() => window.open("/view", "_blank")}>
                Download
              </Button>
            </TableData>
          </tr>
          <tr>
            <TableData>2024-02-20</TableData>
            <TableData>CRDB</TableData>
            <TableData>AOR2319</TableData>
            <TableData>6098465</TableData>
            <TableData>BUY</TableData>
            <TableData>500</TableData>
            <TableData>TZS 100.00</TableData>
            <TableData>TZS 51,183.00</TableData>
            <TableData>
              <Button onClick={() => window.open("/view", "_blank")}>
                Download
              </Button>
            </TableData>
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
  background-color: hsl(205 50% 15%);
  padding: 20px;
  color: hsl(205 50% 60%);
  border-radius: 4px;
  margin: 0 auto;
`;

const TextInput = styled.input`
  background-color: inherit;
  height: 32px;
  border-radius: 4px;
  border: 1px solid hsl(205 50% 50%);
  padding: 10px;
  color: inherit;
  &:focus {
    border: none;
  }
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
  &:last-of-type {
    text-align: center;
  }
`;

const Button = styled.button`
  background-color: inherit;
  color: inherit;
  padding: 8px 20px;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid hsl(205 50% 50%);
`;

export default ContractNote;
