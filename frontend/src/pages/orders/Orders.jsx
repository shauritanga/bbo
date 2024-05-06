import React, { useEffect, useState } from 'react'
import './orders.css'
import SummaryCard from '../../components/summary-card/SummaryCard'
import Table from '../../components/table/Table'
import Modal from '../../components/modal/Modal'
import { Button } from '@mui/material'
import { Add } from '@mui/icons-material'
import dayjs from 'dayjs'
import { IoTimerOutline } from 'react-icons/io5'
import { VscServerProcess } from 'react-icons/vsc'
import { BsExclamationOctagon } from 'react-icons/bs'
import { FiShoppingBag } from 'react-icons/fi'

const summary = [
    {"name":"New orders","total":34, "icon":<IoTimerOutline style={{"font-size":"1.8rem"}} />},
    {"name":"Processing","total":74, "icon":<VscServerProcess  style={{"font-size":"1.8rem"}} />},
    {"name":"Unmatched","total":0, "icon":<BsExclamationOctagon  style={{"font-size":"1.8rem"}} />},
    {"name":"All orders","total":349, "icon":<FiShoppingBag  style={{"font-size":"1.8rem"}} />},
  ]

const Orders = () => {
   const [openModal, setOpenModal] = useState(false);
   const [data, setData] = useState(null);

   const columns = [
    { field: '_id', headerName: 'ID', width: 200 },
    { field: 'date', headerName: 'DATE', width: 180,valueFormatter: (value,row) => dayjs(row.date).format('DD-MM-YYYY'), },
    { field: 'customer', headerName: 'CUSTOMER', width: 180,valueGetter: (value, row ) => row.customer.name, },
    {
      field: 'security',
      headerName: 'SECURITY',
      type: 'string',
      width: 100,
      valueGetter: (value, row ) => row.security.name,
    },
    {
      field: 'type',
      headerName: 'TYPE',
      width: 160,
    },
    {
        field: 'volume',
        headerName: 'VOLUME',
        width: 160,
      },
      {
        field: 'amount',
        headerName: 'AMOUNT',
        width: 160,
      },
      {
        field: 'balance',
        headerName: 'BALANCE',
        width: 160,
        valueGetter: (value, row) => `${row.amount * row.volume}`,
      },
      {
        field: 'status',
        headerName: 'STATUS',
        width: 160,
        valueGetter:(value, row)=> "Completed",
      },
  ];

        

  useEffect(() => {
    fetch('http://localhost:3000/api/orders',{
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin':'*',
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.log(error));
  }, []);

  if(!data){
    return <div>
        Loading ...
    </div>
  }

  const rows = data;

  return (
    <div className='order'>
        <div className="order-summary">
            {summary.map((item) => <SummaryCard info={item.name} icon={item.icon} total={item.total}/>)}
        </div>
        <div className="action">
            <h1>Orders</h1>
            <Button variant="outlined" startIcon={<Add />} className='button' onClick={() => setOpenModal(true)}>
                new order
            </Button>
        </div>
        <div className="orders">
            <Table columns={columns} rows = {data}/>
        </div>
        {openModal && <Modal  close={setOpenModal}/>} 
    </div>
  )
}

export default Orders