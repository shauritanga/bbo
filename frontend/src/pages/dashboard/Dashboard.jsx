import React from 'react';
import './dashboard.css';
import SummaryCard from '../../components/summary-card/SummaryCard';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

const summary = [
  {"name":"Expenses"},
  {"name":"Salaries"},
  {"name":"Purchases"},
]
const data = [
  {
    "name": "Jan",
    "Expenses": 1500,
    "Income": 2400,
    "Purchases":2700,
    "amt": 2400
  },
  {
    "name": "Feb",
    "Expenses": 3000,
    "Income": 2000,
    "Purchases":1700,
    "amt": 2400
  },
  {
    "name": "Mar",
    "Expenses": 4000,
    "Income": 2400,
    "Purchases":3700,
    "amt": 2400
  },
  {
    "name": "Apr",
    "Expenses": 3000,
    "Income": 1400,
    "Purchases":2700,
    "amt": 2400
  },
  {
    "name": "May",
    "Expenses": 1000,
    "Income": 2400,
    "Purchases":700,
    "amt": 2400
  },
  {
    "name": "Jun",
    "Expenses": 4000,
    "Income": 2400,
    "Purchases":3700,
    "amt": 2400
  },
  {
    "name": "Jul",
    "Expenses": 4000,
    "Income": 2400,
    "Purchases":3700,
    "amt": 2400
  },
  {
    "name": "Aug",
    "Expenses": 4000,
    "Income": 2400,
    "Purchases":3700,
    "amt": 2400
  },
  {
    "name": "Sep",
    "Expenses": 4000,
    "Income": 2400,
    "Purchases":3700,
    "amt": 2400
  },
  {
    "name": "Oct",
    "Expenses": 4000,
    "Income": 2400,
    "Purchases":3700,
    "amt": 2400
  },
  {
    "name": "Nov",
    "Expenses": 4000,
    "Income": 2400,
    "Purchases":3700,
    "amt": 2400
  },
  {
    "name": "Dec",
    "Expenses": 4000,
    "Income": 2400,
    "Purchases":3700,
    "amt": 2400
  }

]

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <div className="summary">
        {summary.map((item) => <SummaryCard />)}
      </div>
      <div className="charts">
        <div className="line">
          <div className="heading">
            <h2>Business trading</h2>
            <p>Monthly comparisons in a year</p>
          </div>
        <LineChart height={500} width={900} data={data}
            margin={{ top: 30, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Expenses" stroke="#8884d8" />
            <Line type="monotone" dataKey="Income" stroke="#82ca9d" />
            <Line type="monotone" dataKey="Purchases" stroke="#827a99" />
          </LineChart>
        </div>
        <div className="pie">
          
        </div>
      </div>
    </div>
  )
}

export default Dashboard