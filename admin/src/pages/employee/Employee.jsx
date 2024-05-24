import React, { useEffect, useState } from 'react'
import './employee.css';
import CustomTable from '../../components/customTable/CustomTable';
import EmployeeTable from '../../components/employeeTable/EmployeeTable';
import EmployeeForm from '../../components/modals/employee_form/EmployeeForm';

function Employee() {
    const [count, setCount] = useState(0);
    const [query, setQuery] = useState("");
    const [openForm, setOpenForm] = useState(false);
    const [employees, setEmployees] = useState(null);

    const columns = [
        {id:"1",name:"Name", width:200},
        {id:"2",name:"Email"},
        {id:"3",name:"Phone number"},
        {id:"4",name:"Role"},
        {id:"10",name:"status"},
    ];

  useEffect(() => {
    fetch('http://localhost:3000/api/employees',{
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin':'*',
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => setEmployees(data))
      .catch(error => console.log(error));
  }, []);

  if(!employees){
    return <div>
        Loading ...
    </div>
  }

    const filtered = employees.filter(obj => obj.name.toLowerCase().includes(query.toLowerCase()));
  
  return (
    <div className='employee'>
        <div className="employee-header"></div>
        <div className="employee-table">
                <div className="employee-table-summary">
                    <div className="employee-table-summary-count">Show {count} employees</div>
                    <div className="employee-table-summary-modify">
                        <form action="">
                            <input 
                            type="search" 
                            placeholder='Search Employee'
                            onChange={(event) => setQuery(event.target.value)}
                            />
                        </form>
                        <button className='employee-table-summary-modify-button' onClick={()=>setOpenForm(true)}>New Employee</button>
                    </div>
                </div>
                <div className="employee-table-detail">
                       <EmployeeTable columns={columns} rows={query===""?employees:filtered}/>
                </div>
                {openForm && <EmployeeForm  setOpenForm={setOpenForm}/>}
            
        </div>
    </div>
  )
}

export default Employee