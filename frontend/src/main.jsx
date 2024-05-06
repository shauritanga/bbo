import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/authentication/Login.jsx';
import Layout from './layout/Layout.jsx';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import Orders from './pages/orders/Orders.jsx';
import DealingSheet from './pages/dealing/DealingSheet.jsx';
import Customers from './pages/customers/Customers.jsx';
import Assets from './pages/assets/Assets.jsx';
import Reports from './pages/reports/Reports.jsx';
import Messages from './pages/message/Messages.jsx';
import Files from './pages/files/Files.jsx';
import Receipt from './pages/receipt/Receipt.jsx';
import Expense from './pages/expense/Expense.jsx';
import Business from './pages/business/Business.jsx';
import Payroll from './pages/payroll/Payroll.jsx';
import Role from './pages/role/Role.jsx';
import Transaction from './pages/transaction/Transaction.jsx';
import Security from './pages/security/Security.jsx';
import HumanResource from './pages/resources/HumanResource.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children:[
      {
        path:"/",
        element:<Dashboard/>
      },
      {
        path: "/dashboard",
        element: <Dashboard />
      },
      
      {
        path: "/orders",
        element: <Orders />
      },
      {
        path: "/dealing",
        element: <DealingSheet />
      },
      {
        path: "/reports",
        element: <Reports />
      },
      {
        path: "/assets",
        element: <Assets />
      },
      {
        path: "/customers",
        element: <Customers />
      },
      {
        path: "/files",
        element: < Files />
      },
      {
        path: "/messages",
        element: <Messages />
      },
      {
        path: "/receipts",
        element: <Receipt />
      },
      {
        path: "/expenses",
        element: <Expense />
      },
      {
        path: "/transactions",
        element: <Transaction />
      },
      {
        path: "/roles",
        element: <Role />
      },
      {
        path: "/payroll",
        element: <Payroll />
      },
      {
        path: "/securities",
        element: <Security />
      },
      {
        path: "/business",
        element: <Business />
      },
      {
        path: "/resources",
        element: <HumanResource />
      },

    ]
  },
  {
    path: "/login",
    element: <Login />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
