import React, { useEffect, useState } from 'react'
import './orders.css'
import SummaryCard from '../../components/summary-card/SummaryCard'
import Table from '../../components/table/Table'
import Modal from '../../components/modals/modal/Modal'
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
    { field: '_id', headerName: 'ID'},
    { field: 'date', headerName: 'DATE',valueFormatter: (value,row) => dayjs(row.date).format('DD-MM-YYYY'), },
    { field: 'customer', headerName: 'CUSTOMER',valueGetter: (value, row ) => row.customer.name, },
    {
      field: 'security',
      headerName: 'SECURITY',
      type: 'string',
      valueGetter: (value, row ) => row.security.name,
    },
    {
      field: 'type',
      headerName: 'TYPE',
    },
    {
        field: 'volume',
        headerName: 'VOLUME',
      },
      {
        field: 'amount',
        headerName: 'AMOUNT',
      },
      {
        field: 'balance',
        headerName: 'BALANCE',
        valueGetter: (value, row) => `${row.amount * row.volume}`,
      },
      {
        field: 'status',
        headerName: 'STATUS',
       
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

  return (
    <div className='order'>
        <div className="order-summary">
            {summary.map((item) => <SummaryCard info={item.name} icon={item.icon} total={item.total}/>)}
        </div>
        <div className="order-action">
            <h1>Orders</h1>
            <Button variant="outlined" startIcon={<Add />} className='button' onClick={() => setOpenModal(true)}>
                new order
            </Button>
        </div>
        <div className="order-table">
            {/* <Table columns={columns} rows = {data}/> */}
        </div>
        {openModal && <Modal  close={setOpenModal}/>} 
    </div>
  )
}

export default Orders