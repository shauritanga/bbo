import React from "react";
import Dashboard from "./pages/dashboard/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import { Navigate } from "react-router";
import Orders from "./pages/orders/Orders";
import DealingSheet from "./pages/dealing/DealingSheet";
import Reports from "./pages/reports/Reports";
import Assets from "./pages/assets/Assets";
import Customers from "./pages/customers/Customers";
import Files from "./pages/files/Files";
import Messages from "./pages/message/Messages";
import Receipt from "./pages/receipt/Receipt";
import Expense from "./pages/expense/Expense";
import Transaction from "./pages/transaction/Transaction";
import Payment from "./pages/payments/Payment";
import Role from "./pages/role/Role";
import Employee from "./pages/employee/Employee";
import Security from "./pages/security/Security";
import Business from "./pages/business/Business";
import HumanResource from "./pages/resources/HumanResource";
import Department from "./pages/department/Department";
import Process from "./pages/process/Process";
import PayrollEmployee from "./pages/payrollEmployee/PayrollEmployee";
import Setup from "./pages/setup/Setup";
import Paylist from "./pages/paylist/Paylist";
import Generate from "./pages/generate/Generate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/business" element={<Business />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dealing" element={<DealingSheet />} />
          <Route path="/departments" element={<Department />} />
          <Route path="/employees" element={<Employee />} />
          <Route path="/expenses" element={<Expense />} />
          <Route path="/files" element={<Files />} />
          <Route path="/generate" element={<Generate />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/paylist" element={<Paylist />} />
          <Route path="/payments" element={<Payment />} />
          <Route path="/payroll/employees" element={<PayrollEmployee />} />
          <Route path="/process" element={<Process />} />
          <Route path="/receipts" element={<Receipt />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/resources" element={<HumanResource />} />
          <Route path="/roles" element={<Role />} />
          <Route
            path="/securities"
            element={<Security backgroundColor="var(--color-white)" />}
          />
          <Route path="/setup" element={<Setup />} />
          <Route path="/transactions" element={<Transaction />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
