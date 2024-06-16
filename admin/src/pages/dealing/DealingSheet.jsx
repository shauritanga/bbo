import React from "react";
import { DateRangePicker } from "rsuite";
import { fetchDealings, setSearchFilter } from "../../reducers/dealingSlice";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import dayjs from "dayjs";

const DealingSheet = () => {
  const { dealings, status, error, filters } = useSelector(
    (state) => state.dealings
  );
  const [sort, setSort] = React.useState("all");
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchDealings());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }
  const filteredDealings = dealings.filter((dealing) => {
    if (filters.search) {
      return dealing.customer?.name
        .toLowerCase()
        .includes(filters.search.toLowerCase());
    }
    return true;
  });

  return (
    <Wrapper>
      <Actions>
        <TextInput
          value={filters.search}
          onChange={(e) => dispatch(setSearchFilter(e.target.value))}
          placeholder="Search..."
        />
        <DateRangePicker />
        <select
          style={{
            width: "200px",
            marginLeft: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "16px",
            color: "#666",
            backgroundColor: "#fff",
            padding: "10px",
          }}
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="all">All</option>
          <option value="buy">New Order</option>
          <option value="pending">Pending</option>
          <option value="canceled">Canceled</option>
        </select>
        <Button>Export</Button>
      </Actions>
      <Sheet>
        <SheetHeader></SheetHeader>
        <SheetBody>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>id</TableHeader>
                <TableHeader>date</TableHeader>
                <TableHeader>customer</TableHeader>
                <TableHeader>security</TableHeader>
                <TableHeader>type</TableHeader>
                <TableHeader>price</TableHeader>
                <TableHeader>volume</TableHeader>
                <TableHeader>executed</TableHeader>
                <TableHeader>balance</TableHeader>
                <TableHeader>actions</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDealings.map((dealing) => (
                <TableRow key={dealing._id}>
                  <TableData>{dealing._id}</TableData>
                  <TableData>
                    {dayjs(dealing.date).format("DD-MM-YYYY")}
                  </TableData>
                  <TableData>{dealing.customer?.name}</TableData>
                  <TableData>{dealing.security?.name}</TableData>
                  <TableData>{dealing.type}</TableData>
                  <TableData>{dealing.price}</TableData>
                  <TableData>{dealing.volume}</TableData>
                  <TableData>{dealing.executed}</TableData>
                  <TableData>{dealing.balance}</TableData>
                  <TableData></TableData>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </SheetBody>
        <SheetFooter></SheetFooter>
      </Sheet>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #ccc;
`;
const Sheet = styled.div`
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  background-color: #fff;
`;
const SheetHeader = styled.div``;
const SheetBody = styled.div``;
const SheetFooter = styled.div``;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;
const TableHead = styled.thead`
  background-color: #f2f2f2;
`;
const TableHeader = styled.th`
  text-align: left;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: bold;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;
const TableBody = styled.tbody``;
const TableRow = styled.tr``;
const TableData = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;
const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 7px 20px;
  font-size: 16px;
  cursor: pointer;
`;
const TextInput = styled.input`
  width: 300px;
  padding: 10px;
  margin-right: auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

export default DealingSheet;
