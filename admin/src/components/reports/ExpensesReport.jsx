import {
  ChartContainer,
  LineChart,
  LinePlot,
  MarkPlot,
  ResponsiveChartContainer,
  lineElementClasses,
  markElementClasses,
} from "@mui/x-charts";
import React from "react";
import styled from "styled-components";
import MyPieChart from "../pie/trial";
import PieGraph from "../charts/PieGraph";

const pData = [2400, 1398, 2800, 3908];
const xLabels = ["Jan", "Feb", "Mar", "Apr"];
const data = [20, 30, 40, 50];

const ExpensesReport = () => {
  return (
    <Wrapper>
      <GraphWrapper>
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
      </GraphWrapper>
      <Earning>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <h4>Expenses</h4>
          <p>This Month</p>
          <p>$563,445</p>
          <p style={{ color: "#808080" }}>80% less eraning than last month</p>
        </div>
        <div style={{ width: "100%", height: "100%" }}>
          <PieGraph />
        </div>
      </Earning>
      <Quarter>
        <div style={{}}>
          <h5>Quarters</h5>
          <p>45,345,876</p>
        </div>
        <div style={{ height: "90px", backgroundColor: "red", width: "100%" }}>
          <ChartContainer
            height={100}
            series={[{ type: "line", data: pData }]}
            xAxis={[{ scaleType: "point", data: xLabels }]}
            sx={{
              [`& .${lineElementClasses.root}`]: {
                stroke: "#8884d8",
                strokeWidth: 2,
              },
              [`& .${markElementClasses.root}`]: {
                stroke: "#8884d8",
                scale: "0.6",
                fill: "#fff",
                strokeWidth: 2,
              },
            }}
            disableAxisListener
          >
            <LinePlot />
            <MarkPlot />
          </ChartContainer>
        </div>
      </Quarter>
      <Actions>
        <Button>Export Range</Button>
        <Button>Export All</Button>
        <Button>Export Document (Excel)</Button>
      </Actions>
      <TableWrapper>
        <Table>
          <thead>
            <TableHeaderRow>
              <TableHeaderCell>Jan</TableHeaderCell>
              <TableHeaderCell>Feb</TableHeaderCell>
              <TableHeaderCell>Mar</TableHeaderCell>
              <TableHeaderCell>Apr</TableHeaderCell>
              <TableHeaderCell>May</TableHeaderCell>
              <TableHeaderCell>Jun</TableHeaderCell>
              <TableHeaderCell>Jul</TableHeaderCell>
              <TableHeaderCell>Aug</TableHeaderCell>
              <TableHeaderCell>Sep</TableHeaderCell>
              <TableHeaderCell>Oct</TableHeaderCell>
              <TableHeaderCell>Nov</TableHeaderCell>
              <TableHeaderCell>Dec</TableHeaderCell>
            </TableHeaderRow>
          </thead>
          <tbody>
            {["1"].map((item, index) => {
              return (
                <TableBodyRow key={index}>
                  <TableBodyCell>34,786,900</TableBodyCell>
                  <TableBodyCell>78,345,900</TableBodyCell>
                  <TableBodyCell>12,345,900</TableBodyCell>
                  <TableBodyCell>67,345,900</TableBodyCell>
                  <TableBodyCell>67,345,900</TableBodyCell>
                  <TableBodyCell>98,345,900</TableBodyCell>
                  <TableBodyCell>12,345,900</TableBodyCell>
                  <TableBodyCell>67,345,900</TableBodyCell>
                  <TableBodyCell>23,345,900</TableBodyCell>
                  <TableBodyCell>12,345,900</TableBodyCell>
                  <TableBodyCell>67,345,900</TableBodyCell>
                  <TableBodyCell>23,345,900</TableBodyCell>
                </TableBodyRow>
              );
            })}
          </tbody>
        </Table>
      </TableWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(320px, 500px));
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 20px;
`;
const Button = styled.button`
  background-color: hsl(243, 50%, 21%);
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #6662b2;
  }
  &:first-of-type {
    margin-left: auto;
  }
`;
const GraphWrapper = styled.div`
  grid-column: 1/3;
  grid-row: 1/5;
  background-color: #fff;
`;
const TableWrapper = styled.div`
  grid-column: 1/4;
  grid-row: 6/7;
  background-color: #fff;
`;
const Earning = styled.div`
  grid-column: 3/4;
  grid-row: 1/3;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  border-radius: 5px;
  padding: 0 20px;
`;
const Quarter = styled.div`
  grid-column: 3/4;
  grid-row: 3/5;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 5px;
`;
const Actions = styled.div`
  grid-column: 1/4;
  grid-row: 5/6;
  background-color: #fff;
  display: flex;
  align-items: center;
  gap: 50px;
  border-radius: 5px;
  padding: 20px;
`;

const Table = styled.table`
  width: 100%;
`;
const TableHeaderRow = styled.tr`
  background-color: #f2f2f2;
`;
const TableHeaderCell = styled.th`
  text-align: left;
  text-transform: uppercase;
  font-size: 14px;
  padding: 10px;
`;
const TableBodyRow = styled.tr``;
const TableBodyCell = styled.td`
  text-align: left;
  font-size: 12px;
  padding: 10px;
`;

export default ExpensesReport;
