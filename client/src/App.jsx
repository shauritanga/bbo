import Layout from "layout/Layout";
import BuyShare from "pages/buy/BuyShare";
import ContractNote from "pages/contract/ContractNote";
import Dashboard from "pages/dashboard/Dashboard";
import SellShare from "pages/sell/SellShare";
import Statement from "pages/statement/Statement";
import Viewer from "pages/viewer/Viewer";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/buy" element={<BuyShare />} />
          <Route path="/sell" element={<SellShare />} />
          <Route path="/contract-note" element={<ContractNote />} />
          <Route path="/statement" element={<Statement />} />
        </Route>
        <Route path="/view" element={<Viewer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
