import React from "react";
import styled from "styled-components";

const Contract = () => {
  return (
    <Wrapper>
      <p>Contract Note</p>
      <Table>
        <TableHeaderRow>
          <TableHeaderCell>Date</TableHeaderCell>
          <TableHeaderCell>Slip No</TableHeaderCell>
          <TableHeaderCell>Price</TableHeaderCell>
          <TableHeaderCell>executed</TableHeaderCell>
          <TableHeaderCell>amount</TableHeaderCell>
          <TableHeaderCell>Action</TableHeaderCell>
        </TableHeaderRow>
        <TableDataRow>
          <TableDataCell>2024-05-25</TableDataCell>
          <TableDataCell>69078665</TableDataCell>
          <TableDataCell>500</TableDataCell>
          <TableDataCell>5</TableDataCell>
          <TableDataCell>5000</TableDataCell>
          <TableDataCell>view</TableDataCell>
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
  width: 100%;
`;
const TableHeaderCell = styled.th`
  text-transform: uppercase;
  font-weight: normal;
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

export default Contract;
