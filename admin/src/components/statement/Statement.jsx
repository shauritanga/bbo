import React from "react";
import styled from "styled-components";

const Statement = () => {
  return (
    <Wrapper>
      <p>Statement</p>
      <Table>
        <TableHeaderRow>
          <TableHeaderCell>Date</TableHeaderCell>
          <TableHeaderCell>type</TableHeaderCell>
          <TableHeaderCell>reference</TableHeaderCell>
          <TableHeaderCell>particulars</TableHeaderCell>
          <TableHeaderCell>quantity</TableHeaderCell>
          <TableHeaderCell>price</TableHeaderCell>
          <TableHeaderCell>debit</TableHeaderCell>
          <TableHeaderCell>credit</TableHeaderCell>
          <TableHeaderCell>balance</TableHeaderCell>
        </TableHeaderRow>
        <TableDataRow>
          <TableDataCell>2024-05-25</TableDataCell>
          <TableDataCell>buy</TableDataCell>
          <TableDataCell>610098</TableDataCell>
          <TableDataCell>hello there!</TableDataCell>
          <TableDataCell>59</TableDataCell>
          <TableDataCell>500</TableDataCell>
          <TableDataCell>0</TableDataCell>
          <TableDataCell>5500</TableDataCell>
          <TableDataCell>5644</TableDataCell>
        </TableDataRow>
      </Table>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: var(--color-white);
  border-radius: 7px;
  padding: 20px;
`;

const Table = styled.div`
  margin-top: 20px;
  width: 100%;
`;
const TableHeaderRow = styled.tr`
  display: flex;
  align-items: center;
  background-color: hsl(0deg 0% 80%);
  width: 100%;
`;
const TableHeaderCell = styled.th`
  text-transform: uppercase;
  font-weight: normal;
  text-align: left;
  padding: 8px 10px;
  width: 100%;
`;

const TableDataRow = styled.tr`
  display: flex;
  width: 100%;
`;
const TableDataCell = styled.td`
  width: 100%;
  border: none;
  vertical-align: bottom;
  padding: 8px 10px;
  border-bottom: 0.1px solid hsl(0deg 0% 70%);
`;

export default Statement;
