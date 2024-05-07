import React, { useState } from 'react'
import './employee.css'
import CustomTable from '../../components/customTable/CustomTable';
import EmployeeTable from '../../components/employeeTable/EmployeeTable';

function Employee() {
    const [count, setCount] = useState(0);
    const [query, setQuery] = useState("");

    const columns = [
        {id:"1",name:"Name", width:200},
        {id:"2",name:"Email"},
        {id:"3",name:"Phone number"},
        {id:"4",name:"Role"},
        {id:"10",name:"status"},
    ];

    const objs = [
        {
            name:"Athanas Shauritanga",
            email:"shauritangaathanas@gmail.com",
            phone:"+255629593331",
            role:"Trading",
            status:"Active"
        },
        {
            name:"Doreen Masaki",
            email:"dmasaki97@gmail.com",
            phone:"+255629593331",
            role:"Admin",
            status:"Active"
        },
    ];
    const filtered = objs.filter(obj => obj.name.toLowerCase().includes(query.toLowerCase()));
    console.log(filtered);
    console.log(objs);
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
                        <button className='employee-table-summary-modify-button'>New Employee</button>
                    </div>
                </div>
                <div className="employee-table-detail">
                       <EmployeeTable columns={columns} rows={query===""?objs:filtered}/>
                </div>
            
        </div>
    </div>
  )
}

export default Employee