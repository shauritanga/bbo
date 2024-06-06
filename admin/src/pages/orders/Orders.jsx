import React, { useEffect, useReducer, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SummaryCard from "../../components/summary-card/SummaryCard";
import dayjs from "dayjs";
import { IoTimerOutline } from "react-icons/io5";
import { VscServerProcess } from "react-icons/vsc";
import { BsExclamationOctagon } from "react-icons/bs";
import { FiShoppingBag } from "react-icons/fi";
import styled from "styled-components";
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Dropdown,
  Input,
  InputPicker,
  DateRangePicker,
  toaster,
  Notification,
  Pagination as RsuitePagination,
} from "rsuite";
import "rsuite/dist/rsuite.css";
import { GrCalendar } from "react-icons/gr";
import ModalView from "../../components/modals/Modal";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import OrderForm from "../../components/forms/order/OrderForm";

const summary = [
  {
    name: "New orders",
    total: 34,
    icon: <IoTimerOutline />,
  },
  {
    name: "Processing",
    total: 74,
    icon: <VscServerProcess />,
  },
  {
    name: "Completed",
    total: 12,
    icon: <BsExclamationOctagon />,
  },
  {
    name: "All orders",
    total: 349,
    icon: <FiShoppingBag />,
  },
];

const Orders = () => {
  const [data, setData] = useState(null);
  const [clients, setClients] = useState([]);
  const [active, setActive] = useState("today");

  const [dateRage, setDateRage] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [filter, setFilter] = useState(null);
  const [searchParams] = useSearchParams();
  // const [query, setQuery] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const handleSelect = (value, obj) => {
    setSelected((prevSelected) =>
      value
        ? [...prevSelected, obj]
        : prevSelected.filter((item) => item._id !== obj._id)
    );
  };

  const selectAll = (value) => {
    setSelected(value ? orders : []); // Use filteredOrders if you want to select only filtered orders
  };

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersResponse, clientsResponse] = await Promise.all([
          fetch("http://localhost:5001/api/orders"),
          fetch("http://localhost:5001/api/customers"),
        ]);

        if (!ordersResponse.ok) throw new Error("Error fetching orders");
        if (!clientsResponse.ok) throw new Error("Error fetching customers");

        const ordersData = await ordersResponse.json();
        const clientsData = await clientsResponse.json();

        setData(ordersData);
        setClients(clientsData);
      } catch (err) {
        setError(err.message);
        toaster.push(
          <Notification header="Error">
            Failed to fetch data: {err.message}
          </Notification>,
          { duration: 5000, placement: "topCenter" }
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading ...</div>;
  }
  const customers = clients?.map((item) => ({
    label: item.name,
    value: item.name,
  }));

  // const filterOrders = () => {
  //   let filteredOrders = data; // Start with all data

  //   // Apply client filter if selected
  //   if (filter) {
  //     filteredOrders = filteredOrders.filter(
  //       (order) => order.customer?.name === filter
  //     );
  //   }

  //   // Apply query filter if provided
  //   if (query) {
  //     filteredOrders = filteredOrders.filter((order) =>
  //       order.customer?.name.toLowerCase().includes(query.toLowerCase())
  //     );
  //   }

  //   // Apply date-based filters based on 'active'
  //   // ... (Implementation depends on your specific requirements)

  //   setOrders(filteredOrders);
  // };

  // useEffect(() => {
  //   filterOrders(); // Update orders whenever filters change
  // }, [filter, query, active, dateRage]); // Add dateRage dependency

  const renderButton = (props, ref) => {
    return (
      <Button
        {...props}
        ref={ref}
        style={{ color: "#fff", backgroundColor: "hsl(243deg, 50%, 50%)" }}
      >
        Export
      </Button>
    );
  };

  const q = searchParams.get("q");
  let orders = null;
  switch (q) {
    case "all":
      orders = data;
      break;
    case "pending":
      orders = data.filter((order) => order.status === "new");
      break;
    case "complete":
      orders = data.filter((order) => order.balance === 0);
      break;
  }

  return (
    <Wrapper>
      <TopFilters>
        <Breadcrumbs data={["Home", "CRM", "Orders"]} />
        <Filters>
          <FilterButton
            name="today"
            onClick={(e) => setActive(e.target.name)}
            style={
              active === "today"
                ? { backgroundColor: "hsl(243deg, 20%, 70%)" }
                : {}
            }
          >
            Today
          </FilterButton>
          <FilterButton
            name="weekly"
            onClick={(e) => setActive(e.target.name)}
            style={
              active === "weekly"
                ? { backgroundColor: "hsl(243deg, 20%, 70%)" }
                : {}
            }
          >
            Weekly
          </FilterButton>
          <FilterButton
            name="monthly"
            onClick={(e) => setActive(e.target.name)}
            style={
              active === "monthly"
                ? { backgroundColor: "hsl(243deg, 20%, 70%)" }
                : {}
            }
          >
            Monthly
          </FilterButton>
          <FilterButton
            name="annually"
            onClick={(e) => setActive(e.target.name)}
            style={
              active === "annually"
                ? { backgroundColor: "hsl(243deg, 20%, 70%)" }
                : {}
            }
          >
            Annually
          </FilterButton>
          <FilterButton onClick={() => setDateRage(true)}>
            <GrCalendar />
          </FilterButton>
        </Filters>
      </TopFilters>
      <SummaryWrapper>
        {summary.map((item, index) => (
          <SummaryCard
            key={index}
            info={item.name}
            icon={item.icon}
            total={item.total}
          />
        ))}
      </SummaryWrapper>
      <OrderAction>
        <InputPicker
          data={customers}
          style={{ width: 250 }}
          placeholder="Select Client"
          onChange={(value) => setFilter(value)}
        />
        <Input
          size="small"
          placeholder="ID Client"
          style={{ width: "300px" }}
          onChange={(value) => console.log(value)}
        />
        <Button
          style={{
            marginRight: "auto",
            color: "#fff",
            backgroundColor: "hsl(243deg, 50%, 50%)",
          }}
          onClick={() => console.log("Hello world")}
        >
          Filter
        </Button>
        <Dropdown renderToggle={renderButton}>
          <Dropdown.Item>Export PDF</Dropdown.Item>
          <Dropdown.Item>Export EXCELL</Dropdown.Item>
        </Dropdown>
        <Button
          style={{
            color: "#fff",
            backgroundColor: "hsl(243deg, 50%, 50%)",
          }}
          onClick={() => setIsOrderModalOpen(true)}
        >
          New Order
        </Button>
      </OrderAction>
      <TableWrapper>
        <Table>
          <TableHeaderRow>
            <TableHeaderCell>id</TableHeaderCell>
            <TableHeaderCell>date</TableHeaderCell>
            <TableHeaderCell>customer</TableHeaderCell>
            <TableHeaderCell>security</TableHeaderCell>
            <TableHeaderCell>type</TableHeaderCell>
            <TableHeaderCell>amount</TableHeaderCell>
            <TableHeaderCell>volume</TableHeaderCell>
            <TableHeaderCell>balance</TableHeaderCell>
            <TableHeaderCell>status</TableHeaderCell>
          </TableHeaderRow>
          {orders?.map((order, index) => (
            <TableDataRow key={index}>
              <TableDataCell>{order._id}</TableDataCell>
              <TableDataCell>
                {dayjs(order.date).format("DD-MM-YYYY")}
              </TableDataCell>
              <TableDataCell
                onClick={() =>
                  navigate(`/customers/${order.customer?._id}`, {
                    state: order.customer,
                  })
                }
              >
                {order.customer?.name}
              </TableDataCell>
              <TableDataCell>{order.security?.name}</TableDataCell>
              <TableDataCell>{order.type}</TableDataCell>
              <TableDataCell>{order.amount}</TableDataCell>
              <TableDataCell>{order.volume}</TableDataCell>
              <TableDataCell>{order.balance}</TableDataCell>
              <TableDataCell
                onClick={() =>
                  navigate(`/orders/${order.customer?._id}`, {
                    state: order,
                  })
                }
              >
                {order.status}
              </TableDataCell>
            </TableDataRow>
          ))}
        </Table>
        <Pagination>
          <Counter>{orders.length} total orders</Counter>
          <ButtonToolbar>
            <Button style={{ color: "hsl(243deg, 50%, 50%)" }}>Prev</Button>
            <ButtonGroup>
              <Button>1</Button>
              <Button>2</Button>
              <Button>3</Button>
              <Button>4</Button>
              <Button>5</Button>
            </ButtonGroup>
            <Button style={{ color: "hsl(243deg, 50%, 50%)" }}>Next</Button>
          </ButtonToolbar>
        </Pagination>
      </TableWrapper>
      <ModalView
        title="Select Date Range"
        open={dateRage}
        size="xs"
        setOpen={setDateRage}
        body={<DateRangePicker style={{ width: "100%" }} />}
      />
      <OrderForm
        title="New Order"
        open={isOrderModalOpen}
        size={750}
        setOpen={setIsOrderModalOpen}
      />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const TopFilters = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 20px;
`;
const Filters = styled.div`
  display: flex;
`;
const FilterButton = styled.button`
  display: flex;
  align-items: center;

  padding: 8px 20px;
  background-color: inherit;
  border: 1px solid hsl(243deg, 50%, 50%);
  &:not(:first-of-type) {
    border-left: 0;
  }
  &:first-of-type {
    border-radius: 5px 0 0 5px;
  }
  &:last-of-type {
    border-radius: 0 5px 5px 0;
    padding: 8px 10px;
  }
`;

const SummaryWrapper = styled.div`
  display: flex;
  gap: 30px;
`;
const OrderAction = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
  background-color: #fff;
  padding: 20px;
  border-radius: 7px;
`;

const TableWrapper = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 7px;
`;

const Table = styled.table`
  width: 100%;
`;
const TableHeaderRow = styled.tr`
  text-align: left;
  text-transform: uppercase;
  background-color: hsl(0deg 0% 80%);
`;
const TableHeaderCell = styled.th`
  padding: 10px;
`;
const TableDataRow = styled.tr`
  &:nth-of-type(odd) {
    background-color: hsl(250deg 50% 99%);
  }
`;
const TableDataCell = styled.td`
  padding: 15px;
  &:nth-of-type(3n),
  &:last-of-type {
    cursor: pointer;
  }
`;
const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
`;
const Counter = styled.p``;
const Pages = styled.div``;

export default Orders;
