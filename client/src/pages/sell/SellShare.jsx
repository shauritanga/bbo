import Card from "components/card/Card";
import React, { useEffect, useState } from "react";
import { MdOutlinePendingActions, MdOutlineSell } from "react-icons/md";
import { ImSpinner3 } from "react-icons/im";
import { AiOutlineFileDone } from "react-icons/ai";
import styled from "styled-components";
import Select from "components/select/Select";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "provider/AuthProvider";
import { fetchOrders, setCounter, setSearchTerm } from "reducers/orderSlice";
import dayjs from "dayjs";

const SellShare = () => {
  const { orders, status, error, filters } = useSelector(
    (state) => state.orders
  );
  const dispatch = useDispatch();

  const { user, token } = useAuth();
  const userObjcet = JSON.parse(user);

  useEffect(() => {
    dispatch(fetchOrders({ sort: "sell", id: userObjcet._id }));
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (status === "error") {
    return <div>Error: {error}</div>;
  }

  const filteredOrders = orders?.slice(0, filters.counter).filter((order) => {
    const matchesQuery =
      !filters.searchTerm ||
      order.security?.name
        .toLowerCase()
        .includes(filters.searchTerm.toLowerCase());
    return matchesQuery;
  });

  //
  const all = orders.length;
  const newOrder = orders.filter(
    (order) => order.status.toLowerCase() === "new"
  ).length;
  const underprocess = orders.filter(
    (order) => order.status.toLowerCase() === "processing"
  ).length;
  const complete = orders.filter(
    (order) => order.status.toLowerCase() === "completed"
  ).length;

  return (
    <>
      <Wrapper>
        <Card
          style={{ backgroundColor: "#323365", color: "#ffffff" }}
          title="All Orders"
          subtitle="Total Orders"
          quantity={all}
          icon={<MdOutlineSell size={25} />}
        />
        <Card
          style={{ backgroundColor: "#e71f27", color: "#ffffff" }}
          title="Pending"
          subtitle="Pending Orders"
          quantity={newOrder}
          icon={<MdOutlinePendingActions size={25} />}
        />
        <Card
          style={{ backgroundColor: "#33336a", color: "#ffffff" }}
          title="Under prosess"
          subtitle="Orders under processing"
          quantity={underprocess}
          icon={<ImSpinner3 size={25} />}
        />
        <Card
          style={{ backgroundColor: "#656281", color: "#ffffff" }}
          title="Complete"
          subtitle="Completed Orders"
          quantity={complete}
          icon={<AiOutlineFileDone size={25} />}
        />
      </Wrapper>
      <TableWrapper>
        <p>Sell Shares</p>
        <Actions>
          <Select
            value={filters.counter}
            width={80}
            onChange={(e) => dispatch(setCounter(e.target.value))}
            backgroundColor="inherit"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </Select>
          <TextInput
            value={filters.searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            placeholder="Search..."
          />
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
            {filteredOrders.length === 0 ? (
              <tr>
                <TableData colSpan={9}>
                  No any order found
                </TableData>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order._id}>
                  <TableData>{order.orderId}</TableData>
                  <TableData>
                    {dayjs(order.date).format("DD-MM-YYYY")}
                  </TableData>
                  <TableData>{order.security?.name}</TableData>
                  <TableData>{order.total}</TableData>
                  <TableData>{order.volume}</TableData>
                  <TableData>{order.price}</TableData>
                  <TableData>{order.balance}</TableData>
                  <TableData>{order.status}</TableData>
                  <TableData></TableData>
                </tr>
              ))
            )}
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
  color: #333;
  border-radius: 4px;
  background-color: #fff;
  color: #000;
  filter: drop-shadow(0px 2px 8px rgba(74, 70, 132, 0.4));
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
const TextInput = styled.input`
  border: 1px solid #ccc;
  background-color: inherit;
  color: inherit;
  margin-left: auto;
  height: 43px;
  padding: 10px 20px;
  border-radius: 7px;
  outline: none;
`;
const Button = styled.button`
  background-color: #323365;
  color: #ffffff;
  padding: 12px 20px;
  border-radius: 7px;
  cursor: pointer;
  border: none;
`;

const Table = styled.table`
  border-collapse: collapse;
`;

const TableHaeader = styled.th`
  padding: 10px 20px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
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
  border-bottom: 0.2px solid #ccc;
  color: #333;
`;

export default SellShare;
