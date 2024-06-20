import React from "react";
import "./dashboard.css";
import { FiShoppingBag } from "react-icons/fi";
import { VscServerProcess } from "react-icons/vsc";
import { IoCheckmarkDoneCircleOutline, IoTimerOutline } from "react-icons/io5";
import { TiCancelOutline } from "react-icons/ti";
//import Card from "../../components/card/Card";
import { lineData } from "../../lineData";
import EmployeeTable from "../../components/employeeTable/EmployeeTable";
import styled from "styled-components";
import PieGraph from "../../components/charts/PieGraph";
import { LineChart } from "@mui/x-charts";
import MapChart from "../../components/charts/MapChart";
import data from "../../utils/data.json";

// const data = [
//   {
//     name: "Jan",
//     Expenses: 1500,
//     Income: 2400,
//     Purchases: 2700,
//     amt: 2400,
//   },
//   {
//     name: "Feb",
//     Expenses: 3000,
//     Income: 2000,
//     Purchases: 1700,
//     amt: 2400,
//   },
//   {
//     name: "Mar",
//     Expenses: 4000,
//     Income: 2400,
//     Purchases: 3700,
//     amt: 2400,
//   },
//   {
//     name: "Apr",
//     Expenses: 3000,
//     Income: 1400,
//     Purchases: 2700,
//     amt: 2400,
//   },
//   {
//     name: "May",
//     Expenses: 1000,
//     Income: 2400,
//     Purchases: 700,
//     amt: 2400,
//   },
//   {
//     name: "Jun",
//     Expenses: 4000,
//     Income: 2400,
//     Purchases: 3700,
//     amt: 2400,
//   },
//   {
//     name: "Jul",
//     Expenses: 4000,
//     Income: 2400,
//     Purchases: 3700,
//     amt: 2400,
//   },
//   {
//     name: "Aug",
//     Expenses: 4000,
//     Income: 2400,
//     Purchases: 3700,
//     amt: 2400,
//   },
//   {
//     name: "Sep",
//     Expenses: 4000,
//     Income: 2400,
//     Purchases: 3700,
//     amt: 2400,
//   },
//   {
//     name: "Oct",
//     Expenses: 1000,
//     Income: 2400,
//     Purchases: 3700,
//     amt: 2400,
//   },
//   {
//     name: "Nov",
//     Expenses: 4000,
//     Income: 2400,
//     Purchases: 3000,
//     amt: 2400,
//   },
//   {
//     name: "Dec",
//     Expenses: 2000,
//     Income: 2400,
//     Purchases: 3700,
//     amt: 2400,
//   },
// ];

const pieData = [
  [
    {
      id: "April",
      label: "April",
      value: 402,
      color: "hsl(354, 70%, 50%)",
    },
    {
      id: "May",
      label: "May",
      value: 100,
      color: "hsl(306, 70%, 50%)",
    },
  ],
  [
    {
      id: "April",
      label: "April",
      value: 202,
      color: "hsl(354, 70%, 50%)",
    },
    {
      id: "May",
      label: "May",
      value: 180,
      color: "hsl(306, 70%, 50%)",
    },
  ],
  [
    {
      id: "April",
      label: "April",
      value: 300,
      color: "hsl(354, 70%, 50%)",
    },
    {
      id: "May",
      label: "May",
      value: 200,
      color: "hsl(306, 70%, 50%)",
    },
  ],
];
const summary = [
  {
    name: "Receivable",
    total: 0,
    icon: <IoCheckmarkDoneCircleOutline style={{ "font-size": "1.8rem" }} />,
    percent: 0,
  },
  {
    name: "Revenue",
    total: "76,800,432.85",
    icon: <VscServerProcess style={{ "font-size": "1.8rem" }} />,
    percent: 7,
  },
  {
    name: "Expenses",
    total: "50,780,589.87",
    icon: <TiCancelOutline style={{ "font-size": "1.8rem" }} />,
    percent: 22,
  },
  {
    name: "Profit",
    total: "14,490,500.43",
    icon: <FiShoppingBag style={{ "font-size": "1.8rem" }} />,
    percent: 3,
  },
];

const names = ["Earnings", "Expenses", "Quaters"];

const columns = [
  { id: "1", name: "#" },
  { id: "2", name: "Account" },
  { id: "3", name: "Balance" },
];
const rows = [
  {
    id: 1,
    name: "Purchases",
    amount: "18,570,000",
  },
  {
    id: 2,
    name: "Salary",
    amount: "97,400,000",
  },
  {
    id: 3,
    name: "Salary",
    amount: "40,000,000",
  },
];
const Dashboard = () => {
  return (
    <Wrapper>
      <Card
        style={{
          backgroundColor: "#000",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontSize: "1.2rem" }}>Current Income</span>
        <span style={{ fontSize: "2.2rem" }}>TZS 67,800,560</span>
      </Card>
      <Card
        style={{
          backgroundColor: "#323365",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontSize: "1.2rem" }}>Current Customers</span>
        <span style={{ fontSize: "2.5rem" }}>650</span>
      </Card>
      <Card
        style={{
          backgroundColor: "#e71f27",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontSize: "1.2rem" }}>Active Customers</span>
        <span style={{ fontSize: "2.5rem" }}>43%</span>
      </Card>
      <Card
        style={{
          backgroundColor: "#656281",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontSize: "1.2rem" }}>Total Orders</span>
        <span style={{ fontSize: "2.5rem" }}>870</span>
      </Card>
      <Graph>
        <h6>Income Trends</h6>
        <LineChart
          series={[
            {
              data: [
                2400, 1398, 9800, 3908, 4800, 3800, 4300, 3800, 4300, 3800,
                4300, 3800,
              ],
            },
          ]}
          xAxis={[
            {
              scaleType: "band",
              data: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
            },
          ]}
          height={400}
          grid={{ vertical: true, horizontal: true }}
        />
      </Graph>
      <Pie>
        <h4>Expenses</h4>
        <h6>34,890,900</h6>
        <p>80% more than last month</p>
        <PieGraph outer={90} inner={60} />
      </Pie>
      <Transaction>
        <h5>Transactions</h5>
      </Transaction>
      <Summary>
        <h6>Account Balance</h6>
        <TableWrapper style={{ width: "100%", marginTop: "20px" }}>
          <thead>
            <TableHeaderRow>
              <TableHeaderCell>SN</TableHeaderCell>
              <TableHeaderCell>Account</TableHeaderCell>
              <TableHeaderCell>Balance</TableHeaderCell>
            </TableHeaderRow>
          </thead>
          <tbody>
            <TableBodyRow>
              <TableBodyCell>1</TableBodyCell>
              <TableBodyCell>Income </TableBodyCell>
              <TableBodyCell>46,585,556</TableBodyCell>
            </TableBodyRow>
            <TableBodyRow>
              <TableBodyCell>1</TableBodyCell>
              <TableBodyCell>Purchase </TableBodyCell>
              <TableBodyCell>46,585,556</TableBodyCell>
            </TableBodyRow>
          </tbody>
        </TableWrapper>
      </Summary>
      <Table>
        <h6>Customer Demographic</h6>
        {/* <div style={{ width: "300px", height: "300px" }}>
          <MapChart data={data} />
        </div> */}
      </Table>
    </Wrapper>
  );
};

const TableWrapper = styled.table``;
const TableHeaderCell = styled.th`
  padding: 10px;
  color: #fff;
  text-align: left;
`;
const TableBodyCell = styled.td`
  padding: 10px;
`;
const TableHeaderRow = styled.tr`
  background-color: #656281;
`;
const TableBodyRow = styled.tr`
  border-bottom: 1px solid #ccc;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(300px, 500px));
  grid-template-rows: repeat(6, minmax(80px, 140px));
  gap: 20px;
  margin-bottom: 30px;
`;

const Card = styled.div`
  background-color: #fff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
  padding: 20px;
`;

const Graph = styled.div`
  background-color: #fff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
  padding: 20px;
  grid-column: 1/3;
  grid-row: 2/5;
`;
const Pie = styled.div`
  background-color: #fff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
  padding: 20px;
  grid-column: 3/4;
  grid-row: 2/5;
`;
const Transaction = styled.div`
  background-color: #fff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
  grid-column: 4/5;
  grid-row: 2/5;
  padding: 20px;
`;
const Summary = styled.div`
  background-color: #fff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
  grid-column: 1/3;
  grid-row: 5/7;
  padding: 20px;
`;
const Table = styled.div`
  background-color: #fff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
  padding: 20px;
  grid-column: 3/5;
  grid-row: 5/7;
`;

export default Dashboard;
