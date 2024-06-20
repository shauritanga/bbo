import Layout from "layout/Layout";
import BuyShare from "pages/buy/BuyShare";
import ContractNote from "pages/contract/ContractNote";
import Dashboard from "pages/dashboard/Dashboard";
import Login from "login/Login";
import SellShare from "pages/sell/SellShare";
import Statement from "pages/statement/Statement";
import Viewer from "pages/viewer/Viewer";
import AuthProvider from "provider/AuthProvider";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Start from "start/Start";
import ActivationPage from "pages/activate/Activation";
import Otp from "pages/otp/Otp";
import OrderView from "views/OrderView";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/start" element={<Start />} />
          <Route path="/login" element={<Login />} />
          <Route path="/activate" element={<ActivationPage />} />
          <Route path="/otp" element={<Otp />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/buy" element={<BuyShare />} />
            <Route path="/sell" element={<SellShare />} />
            <Route path="/contract-note" element={<ContractNote />} />
            <Route path="/statement" element={<Statement />} />
            <Route path="/orders/view" element={<OrderView />} />
          </Route>
     
          <Route path="/view" element={<Viewer />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
