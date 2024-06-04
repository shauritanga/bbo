import React from "react";
import "./dashboard.css";
import { FiShoppingBag } from "react-icons/fi";
import { VscServerProcess } from "react-icons/vsc";
import { IoCheckmarkDoneCircleOutline, IoTimerOutline } from "react-icons/io5";
import { TiCancelOutline } from "react-icons/ti";
import Card from "../../components/card/Card";
import PieCard from "../../components/pie/PieCard";
import { lineData } from "../../lineData";
import { ResponsiveLine } from "@nivo/line";
import EmployeeTable from "../../components/employeeTable/EmployeeTable";

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
    <div className="dashboard">
      {/* <div className="dashboard-summary"> */}
      <div className="dashboard-card-summary">
        <Card
          title={summary[0].name}
          percent={summary[0].percent}
          size={summary[0].total}
        />
        <Card
          title={summary[1].name}
          percent={summary[1].percent}
          size={summary[1].total}
        />
        <Card
          title={summary[2].name}
          percent={summary[2].percent}
          size={summary[2].total}
        />
        <Card
          title={summary[3].name}
          percent={summary[3].percent}
          size={summary[3].total}
        />
      </div>
      <div className="dashboard-graph-summary">
        <ResponsiveLine
          data={lineData}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: true,
            reverse: false,
          }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Months",
            legendOffset: 36,
            legendPosition: "middle",
            truncateTickAt: 0,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Amount (thousands)",
            legendOffset: -40,
            legendPosition: "middle",
            truncateTickAt: 0,
          }}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabel="data.yFormatted"
          pointLabelYOffset={-12}
          enableTouchCrosshair={true}
          useMesh={true}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </div>
      {/* </div> */}
      {/* <div className="dashboard-table-pie"> */}
      <div className="dashboard-table">
        <EmployeeTable
          style={{ width: "100%", borderCollapse: "collapse" }}
          columns={columns}
          rows={rows}
        />
      </div>
      <div className="dashboard-pie">
        {pieData.map((data, index) => {
          const title = names[index];
          return <PieCard title={title} percent={23} data={data} />;
        })}
      </div>
      {/* </div> */}
    </div>
  );
};

export default Dashboard;
