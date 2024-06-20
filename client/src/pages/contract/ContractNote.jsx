import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "provider/AuthProvider";
import { fetchOrders, setCounter, setSearchTerm } from "reducers/orderSlice";
import dayjs from "dayjs";
import Select from "components/select/Select";

const ContractNote = () => {
  const [open, setOpen] = useState(false);
  const { orders, status, error, filters } = useSelector(
    (state) => state.orders
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const userObjcet = JSON.parse(user);

  useEffect(() => {
    dispatch(fetchOrders({ sort: "all", id: userObjcet._id }));
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
    <Wrapper>
      <h3>Contract Notes</h3>
      <Orders>
        <Action>
          <Select
            value={filters.counter}
            width={80}
            onChange={(e) => dispatch(setCounter(e.target.value))}
            border={"ccc"}
          >
            <option value="10">10</option>
            <option value="20">25</option>
            <option value="25">50</option>
          </Select>
          <TextInput
            value={filters.searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            placeholder="Search"
          />
        </Action>
        <Table>
          <TableHead>
            <TableHeaderRow>
              <TableHeader>Date</TableHeader>
              <TableHeader>Security</TableHeader>
              <TableHeader>order id</TableHeader>
              <TableHeader>slip no.</TableHeader>
              <TableHeader>type</TableHeader>
              <TableHeader>price</TableHeader>
              <TableHeader>executed</TableHeader>
              <TableHeader>amount</TableHeader>
              <TableHeader>actions</TableHeader>
            </TableHeaderRow>
          </TableHead>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableBodyRow>
                <TableData colSpan={9}>Not found</TableData>
              </TableBodyRow>
            ) : (
              filteredOrders.map((order) => (
                <TableBodyRow key={order._id}>
                  <TableData>
                    {dayjs(order.date).format("DD-MM-YYYY")}
                  </TableData>
                  <TableData>{order.security?.name}</TableData>
                  <TableData>{order.orderId}</TableData>
                  <TableData>{"6534667"}</TableData>
                  <TableData>{order.type}</TableData>
                  <TableData>{order.price}</TableData>
                  <TableData>{""}</TableData>
                  <TableData>{`TZS ${order.total}`}</TableData>
                  <TableData>
                    <Button onClick={() => navigate("/view", { state: order })}>
                      Download
                    </Button>
                  </TableData>
                </TableBodyRow>
              ))
            )}
          </TableBody>
        </Table>
      </Orders>
      <Pagination>
        <span>{orders.length} total orders</span>
      </Pagination>
    </Wrapper>
  );
};

const Pagination = styled.div`
  display: flex;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 80%;
  background-color: #fff;
  padding: 20px;
  color: #333;
  margin: 0 auto;
  border-radius: 5px;
  filter: drop-shadow(0px 2px 8px rgba(74, 70, 132, 0.4));
`;

const Orders = styled.div`
  @media (max-width: 600px) {
    grid-column: 1/2;
  }
  background-color: #fff;
  grid-column: 2/5;
  grid-row: 2/5;
  border-radius: 5px;
`;

const Action = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  margin-bottom: 10px;
`;
const TextInput = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #f5f5f5;
  outline: none;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;
const TableHead = styled.thead``;

const TableHeader = styled.th`
  padding: 10px;
  text-align: left;
  text-transform: uppercase;
  color: #555;
`;
const TableBody = styled.tbody``;
const TableHeaderRow = styled.tr`
  border: 1px solid #ccc;
`;
const TableBodyRow = styled.tr`
  border: 1px solid #ccc;
`;
const TableData = styled.td`
  padding: 10px;
  text-align: left;
  color: #555;
`;

const Button = styled.button`
  background-color: inherit;
  color: inherit;
  padding: 8px 20px;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

export default ContractNote;
