import React, { useEffect, useState } from 'react'
import EmployeeSelection from '../../combo/EmployeeSelection';
import StatusSelection from '../../combo/StatusSelection';
import './payrollModal.css';
import { Button } from '@mui/material';

function PayrollModal({close}) {

    const [status, setStatus] = useState("");
    const [employee, setEmployee] = useState(null);
    const [employeeId, setEmployeeId] = useState("");

    const handleFormSubmit =() => {
        const postData = {
            "customer":customerId,
            "security":securityId,
            "type":action,
            volume,price,fees,amount,total
        };
        fetch('http://localhost:3000/api/orders',{
        mode: 'cors',
        method:"POST",
        headers: {
          'Access-Control-Allow-Origin':'*',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(postData)
      })
      .then(response => response.json())
      .then(data => setSecurity(data))
      .catch(error => console.log(error));
      close(false);
    };

    const handleCancelFormSubmit =()=>{
        close(false);
    };

  
    useEffect(() => {
      fetch('http://localhost:3000/api/customers',{
          mode: 'cors',
          headers: {
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'application/json'
          }
        })
        .then(response => response.json())
        .then(data => setEmployee(data))
        .catch(error => console.log(error));
    }, []);
  
    if(!employee){
      return <p>Loading ...</p>;
    }
  
  return (
        <div className="payroll-modal">
            <div className="payroll-form-container">
                <span onClick={()=> close(false)}>x</span>
                <form action="">
                    <div className='form-control'>
                        <label htmlFor="employee">Employee</label>
                        <EmployeeSelection label="Select Employee" data={employee} setAction={setEmployeeId}/>
                    </div>
                    <div className='form-control'>
                        <label htmlFor="">Basic</label>
                        <input type="text" id='basic' className='basic' placeholder='Basic Salary'/>
                    </div>
                    <div className='form-control'>
                        <label htmlFor="status">Status</label>
                        <StatusSelection label="Select Status" data={[{"name":"Active"},{"name":"Inactive"}]} setAction={setStatus}/>
                    </div>
                </form>
                <div className="actions">
                    <Button variant="contained" onClick={handleFormSubmit}>Send</Button>
                    <Button variant="outlined" onClick={handleCancelFormSubmit}>Cancel</Button>
            </div>
            </div>
        </div>
  )
}

export default PayrollModal