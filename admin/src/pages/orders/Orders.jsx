import React, { useCallback, useEffect, useState } from "react";
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
import { GrCalendar, GrOrderedList } from "react-icons/gr";
import ModalView from "../../components/modals/Modal";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import OrderForm from "../../components/forms/order/OrderForm";
import FilterButton from "../../components/fiterButton/FilterButton";

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
  const [orders, setOrders] = useState([]);
  const [activeFilter, setActiveFilter] = useState("today");
  const [clients, setClients] = useState([]);
  const [dateRange, setDateRange] = useState([]);
  const [open, setOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [filter, setFilter] = useState(null);
  const [searchParams] = useSearchParams();
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

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
        setOrders(ordersData);
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

  console.log(dateRange);

  const filterOrders = useCallback(() => {
    let filteredOrders = data ?? []; // Start with all data

    if (activeFilter === "today") {
      const today = dayjs();
      filteredOrders = filteredOrders.filter((order) =>
        dayjs(order.date).isSame(today, "day")
      );
    } else if (activeFilter === "weekly") {
      const startOfWeek = dayjs().startOf("week");
      const endOfWeek = dayjs().endOf("week");
      filteredOrders = filteredOrders.filter((order) => {
        const orderDate = dayjs(order.date);
        return orderDate.isAfter(startOfWeek) && orderDate.isBefore(endOfWeek);
      });
    } else if (activeFilter === "monthly") {
      const startOfMonth = dayjs().startOf("month");
      const endOfMonth = dayjs().endOf("month");
      filteredOrders = filteredOrders.filter((order) => {
        const orderDate = dayjs(order.date);
        return (
          orderDate.isAfter(startOfMonth) && orderDate.isBefore(endOfMonth)
        );
      });
    } else if (activeFilter === "annually") {
      const startOfYear = dayjs().startOf("year");
      const endOfYear = dayjs().endOf("year");
      filteredOrders = filteredOrders.filter((order) => {
        const orderDate = dayjs(order.date);
        return orderDate.isAfter(startOfYear) && orderDate.isBefore(endOfYear);
      });
    } else if (activeFilter === "custom" && dateRange) {
      const [startDate, endDate] = dateRange;
      return orders.filter((order) => {
        const orderDate = dayjs(order.date);
        return (
          orderDate.isSame(startDate, "day") ||
          (orderDate.isAfter(startDate) && orderDate.isBefore(endDate)) ||
          orderDate.isSame(endDate, "day")
        );
      });
    }
    if (filter) {
      filteredOrders = filteredOrders.filter(
        (order) => order.customer?.name === filter
      );
    }

    return filteredOrders;
  }, [data, filter, activeFilter, dateRange]);

  useEffect(() => {
    const filteredOrders = filterOrders();
    setOrders(filteredOrders);
  }, [filterOrders]);

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
  if (!data) {
    return <div>Loading</div>;
  }
  if (!clients) {
    return <div>Loading</div>;
  }

  const customers = clients.map((item) => ({
    label: item.name,
    value: item.name,
  }));
  const q = searchParams.get("q");
  let orderData = null;
  switch (q) {
    case "all":
      orderData = orders;
      break;
    case "pending":
      orderData = orders.filter((order) => order.status === "new");
      break;
    case "complete":
      orderData = orders.filter((order) => order.balance === 0);
      break;
  }

  return (
    <Wrapper>
      <TopFilters>
        <Breadcrumbs data={["Home", "CRM", "Orders"]} />
        <Filters>
          <FilterButton
            name="today"
            activeFilter={activeFilter}
            onClick={setActiveFilter}
          >
            Today
          </FilterButton>
          <FilterButton
            name="weekly"
            activeFilter={activeFilter}
            onClick={setActiveFilter}
          >
            Weekly
          </FilterButton>
          <FilterButton
            name="monthly"
            activeFilter={activeFilter}
            onClick={setActiveFilter}
          >
            Monthly
          </FilterButton>
          <FilterButton
            name="annually"
            activeFilter={activeFilter}
            onClick={setActiveFilter}
          >
            Annually
          </FilterButton>
          <FilterButton
            name="custom"
            activeFilter={activeFilter}
            onClick={setActiveFilter}
            setOpen={setOpen}
          >
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
          {orderData?.map((order, index) => (
            <TableDataRow key={index}>
              <TableDataCell>{order.orderId}</TableDataCell>
              <TableDataCell>
                {dayjs(order.date).format("DD-MM-YYYY")}
              </TableDataCell>
              <TableDataCell
                onClick={() => {
                  navigate(`/customers/${order.customer?._id}`, {
                    state: order.customer,
                  });
                }}
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
        dateRange={dateRange}
        setDateRange={setDateRange}
        open={open}
        setOpen={setOpen}
        size="xs"
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
  font-size: 0.75rem;
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
