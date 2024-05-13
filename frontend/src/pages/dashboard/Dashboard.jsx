import React from "react";
import "./dashboard.css";
import SummaryCard from "../../components/summary-card/SummaryCard";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { FiShoppingBag } from "react-icons/fi";
import { BsExclamationOctagon } from "react-icons/bs";
import { VscServerProcess } from "react-icons/vsc";
import { IoCheckmarkDoneCircleOutline, IoTimerOutline } from "react-icons/io5";
import { TiCancelOutline } from "react-icons/ti";
import Card from "../../components/card/Card";
import PieCard from "../../components/pie/PieCard";

const data = [
  {
    name: "Jan",
    Expenses: 1500,
    Income: 2400,
    Purchases: 2700,
    amt: 2400,
  },
  {
    name: "Feb",
    Expenses: 3000,
    Income: 2000,
    Purchases: 1700,
    amt: 2400,
  },
  {
    name: "Mar",
    Expenses: 4000,
    Income: 2400,
    Purchases: 3700,
    amt: 2400,
  },
  {
    name: "Apr",
    Expenses: 3000,
    Income: 1400,
    Purchases: 2700,
    amt: 2400,
  },
  {
    name: "May",
    Expenses: 1000,
    Income: 2400,
    Purchases: 700,
    amt: 2400,
  },
  {
    name: "Jun",
    Expenses: 4000,
    Income: 2400,
    Purchases: 3700,
    amt: 2400,
  },
  {
    name: "Jul",
    Expenses: 4000,
    Income: 2400,
    Purchases: 3700,
    amt: 2400,
  },
  {
    name: "Aug",
    Expenses: 4000,
    Income: 2400,
    Purchases: 3700,
    amt: 2400,
  },
  {
    name: "Sep",
    Expenses: 4000,
    Income: 2400,
    Purchases: 3700,
    amt: 2400,
  },
  {
    name: "Oct",
    Expenses: 1000,
    Income: 2400,
    Purchases: 3700,
    amt: 2400,
  },
  {
    name: "Nov",
    Expenses: 4000,
    Income: 2400,
    Purchases: 3000,
    amt: 2400,
  },
  {
    name: "Dec",
    Expenses: 2000,
    Income: 2400,
    Purchases: 3700,
    amt: 2400,
  },
];

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
    total: "150,780,589.87",
    icon: <TiCancelOutline style={{ "font-size": "1.8rem" }} />,
    percent: 22,
  },
  {
    name: "Profit",
    total: "34,490,500.43",
    icon: <FiShoppingBag style={{ "font-size": "1.8rem" }} />,
    percent: 3,
  },
];

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-summary">
        <div className="dashboard-card-summary">
          {summary.map((item) => (
            <Card title={item.name} percent={item.percent} size={item.total} />
          ))}
        </div>
        <div className="dashboard-graph-summary">ttt</div>
      </div>
      <div className="dashboard-table-pie">
        <div className="dashboard-table"></div>
        <div className="dashboard-pie">
          {pieData.map((data) => (
            <PieCard title="Earnings" percent={23} data={data} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
