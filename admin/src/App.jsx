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
import { useNavigate } from "react-router";
import HumanResource from "./pages/resources/HumanResource";
import Department from "./pages/department/Department";
import PDF from "./components/pdf/PDF";
import CustomerView from "./views/customer/Customer";
import OrderView from "./views/order/Order";
import Register from "./register/Register";
import AuthProvider from "./provider/AuthProvider";

function App() {
  const signIn = false;
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="login" element={<Register />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/assets" element={<Assets />} />
            <Route path="/business" element={<Business />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/customers/:customerId" element={<CustomerView />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dealing" element={<DealingSheet />} />
            <Route path="/departments" element={<Department />} />
            <Route path="/employees" element={<Employee />} />
            <Route path="/expenses" element={<Expense />} />
            <Route path="/files" element={<Files />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:orderId" element={<OrderView />} />
            <Route path="/payments" element={<Payment />} />
            <Route path="/receipts" element={<Receipt />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/resources" element={<HumanResource />} />
            <Route path="/roles" element={<Role />} />
            <Route
              path="/securities"
              element={<Security backgroundColor="var(--color-white)" />}
            />
            <Route path="/transactions" element={<Transaction />} />
          </Route>

          <Route path="/statement" element={<PDF />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
