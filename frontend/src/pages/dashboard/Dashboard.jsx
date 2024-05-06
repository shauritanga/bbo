import React from 'react';
import './dashboard.css';
import SummaryCard from '../../components/summary-card/SummaryCard';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { FiShoppingBag } from 'react-icons/fi';
import { BsExclamationOctagon } from 'react-icons/bs';
import { VscServerProcess } from 'react-icons/vsc';
import { IoCheckmarkDoneCircleOutline, IoTimerOutline } from 'react-icons/io5';
import { TiCancelOutline } from 'react-icons/ti';

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
const summary = [
  {"name":"Completed orders","total":34, "icon":<IoCheckmarkDoneCircleOutline  style={{"font-size":"1.8rem"}} />},
  {"name":"Dealing","total":74, "icon":<VscServerProcess  style={{"font-size":"1.8rem"}} />},
  {"name":"Cancelled","total":10, "icon":<TiCancelOutline  style={{"font-size":"1.8rem"}} />},
  {"name":"All orders","total":349, "icon":<FiShoppingBag  style={{"font-size":"1.8rem"}} />},
]

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <div className="summary">
        {summary.map((item) => <SummaryCard info={item.name} total={item.total} icon={item.icon}/>)}
      </div>
      <div className="charts">
        <div className="line">
          <div className="heading">
            <h2>Business trading</h2>
            <p>Monthly comparisons in a year</p>
          </div>
        <LineChart height={500} width={500} data={data}
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