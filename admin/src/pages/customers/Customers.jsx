import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { DateRangePicker } from "rsuite";
import useSWR from "swr";
import format from "date-fns/format";
import "rsuite/DateRangePicker/styles/index.css";
import styled from "styled-components";
import Select from "../../components/select";
import Spacer from "../../components/spacer/Spacer";
const fetcher = (url) => fetch(url).then((res) => res.json());

function Customers() {
  const [customers, setCustomers] = useState(null);
  const [customerFilter, setCustomerFilter] = useState("all");
  const [dateSelected, setDateSelected] = useState(() => {
    return { startDate: Date.now(), endDate: Date.now() };
  });
  const navigate = useNavigate();

  const { data, error, loading } = useSWR(
    `http://localhost:5001/api/statements?startDate=${new Date(
      dateSelected.startDate
    ).toISOString()}&endDate=${new Date(dateSelected.endDate).toISOString()}`,
    fetcher
  );
  if (error) {
    console.log(error);
  }

  if (!error && !loading) {
    console.log(data);
  }

  useEffect(() => {
    fetch("http://localhost:5001/api/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data))
      .catch((error) => console.log(error));
  }, []);

  if (!customers) {
    return <div>Loading ...</div>;
  }
  return (
    <Wrapper>
      <Actions>
        <DateRangePicker
          placeholder="Select Date Range"
          renderValue={([start, end]) => {
            return (
              format(start, "EEE, d MMM") + " - " + format(end, "EEE, d MMM")
            );
          }}
          onChange={(range) =>
            setDateSelected({ startDate: range[0], endDate: range[1] })
          }
        />
        <Select
          value={customerFilter}
          onChange={(e) => e.target.value}
          width={350}
        >
          <option value="all">All customers</option>
          <option value="New">New Customers</option>
          <option value="pending">Pending</option>
          <option value="cancel">Cancel request</option>
        </Select>
        <Button>Export</Button>
        <Spacer />
        <Button>Filter Customer</Button>
        <Button>Create Customer</Button>
      </Actions>
      <TableWrapper>
        <Table>
          <thead>
            <TableHeaderRow>
              <TableHeaderCell>name</TableHeaderCell>
              <TableHeaderCell>contact</TableHeaderCell>
              <TableHeaderCell>category</TableHeaderCell>
              <TableHeaderCell>status</TableHeaderCell>
              <TableHeaderCell>action</TableHeaderCell>
            </TableHeaderRow>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr>
                <TableDataCell>
                  <p>{customer.name}</p>
                </TableDataCell>
                <TableDataCell>
                  <p>{customer.email}</p>
                  <p>{customer.phone}</p>
                </TableDataCell>
                <TableDataCell>{customer.country}</TableDataCell>
                <TableDataCell>{customer.status}</TableDataCell>
                <TableDataCell>
                  <ViewButton
                    onClick={() =>
                      navigate(`/customers/${customer._id}`, {
                        state: customer,
                      })
                    }
                  >
                    view
                  </ViewButton>
                </TableDataCell>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
const Actions = styled.div`
  display: flex;
  gap: 30px;
  padding: 20px;
  border-radius: 7px;
  background-color: var(--color-white);
`;
const Button = styled.button`
  background-color: hsl(243deg, 50%, 21%);
  color: #fff;
  border-radius: 5px;
  min-width: 180px;
  padding: 10px 20px;
`;
const TableWrapper = styled.div`
  padding: 20px;
  border-radius: 7px;
  background-color: var(--color-white);
`;
const Table = styled.table`
  width: 100%;
`;
const TableHeaderRow = styled.tr``;
const TableHeaderCell = styled.th`
  padding: 14px 20px;
  text-transform: uppercase;
  background-color: hsl(250deg 10% 90%);
  text-align: left;
  border: none;
`;
const TableDataCell = styled.td`
  padding: 14px 20px;
`;
const ViewButton = styled.button`
  background-color: hsl(243deg 20% 90%);
  border-radius: 12px;
  padding: 4px 9px;
  cursor: pointer;
`;
export default Customers;
