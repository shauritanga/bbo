import React, { useEffect, useState } from 'react'
import Table from '../../components/table/Table';
import './custmers.css';
import { Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import { FaRegEdit } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';
import { MdOutlineDeleteSweep } from 'react-icons/md';

function Customers() {

  const [customers, setCustomers] = useState(null);

  const columns = [
    { field: 'name', headerName: 'NAME', width: 180, },
    { field: 'contact', 
    headerName: 'CONTACT', 
    width: 250,
    type:Array,
    valueGetter: (value, row ) => [row.phone, row.email], 
    renderCell: (params) => (
      <div style={{display:"flex", flexDirection:"column"}}>
        <Typography>{params.value[0]}</Typography>
        <Typography color="textSecondary">{params.value[1]}</Typography>
      </div>
    ),},
    {
      field: 'country',
      headerName: 'CATEGORY',
      type: 'string',
      width: 100,
    },
      {
        field: 'status',
        headerName: 'STATUS',
        width: 160,
        renderCell:(params) => (<div style={{color:"green"}}>active</div>),
      },
    
      {
        field: 'actions',
        headerName: 'ACTIONS',
        width: 160,
        renderCell:(params) => (
        <div style={{display:"flex", alignItems:"center",gap:"15px", padding:"15px 0px"}}>
            <FaRegEdit style={{fontSize:"1.2rem", cursor:"pointer"}}/>
            <MdOutlineDeleteSweep style={{fontSize:"1.4rem", color:"red", cursor:"pointer"}}/>
        </div>
    ),
      },
  ];

  useEffect(()=>{
    fetch('http://localhost:3000/api/customers',{
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin':'*',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => setCustomers(data))
    .catch(error => console.log(error));
  },[]);

  if(!customers){
    return <div>
        Loading ...
    </div>
  }

  return (
    <div>
      <div className="customer-table">
          <Table columns={columns} rows={customers}/>
      </div>
      
    </div>
  )
}

export default Customers