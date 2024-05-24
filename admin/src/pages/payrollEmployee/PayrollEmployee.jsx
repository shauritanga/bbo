import React, { useEffect, useState } from 'react'
import './payrollemployee.css'
import CustomTable from '../../components/customTable/CustomTable'
import EmployeeSelection from '../../components/combo/EmployeeSelection'
import StatusSelection from '../../components/combo/StatusSelection'
import PayrollModal from '../../components/modals/payrollModal/PayrollModal'

function PayrollEmployee() {

  const [openPayrollModal, setOpenPayModal] = useState(false);

  return (
    <div className='custom-table'>
        <button onClick={() => setOpenPayModal(true)}>Add Employee</button>
        <CustomTable />
        {openPayrollModal && <PayrollModal  close={setOpenPayModal}/>}
    </div>
  )
}

export default PayrollEmployee