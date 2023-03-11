import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomeIndex from "./Screens/HomeScreen/Index";
import QRScanIndex from "./Screens/QRScanScreen/Index";
import styled from "styled-components"
import RetailersAuth from "./Screens/RetailersAuth/index"
import RetailersDashboard from "./Screens/RetailersDashboard/index"
import DistributorsAuth from "./Screens/DistributorsAuth/index"
import DistributorsDashboard from "./Screens/DistributorsDashboard/index"
import CustomersDashboard from "./Screens/CustomersDashboard/index"

const SApp = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`

function App() {
  return (
    <SApp>
      <Routes>
        <Route path="/" element={<HomeIndex />} />
        <Route path="/qrScan" element={<QRScanIndex />} />
        <Route path="/customerDashboard/:productId" element={<CustomersDashboard />} />
        <Route path="/retailersDashboard" element={<RetailersDashboard />} />
        <Route path="/distributorsDashboard" element={<DistributorsDashboard />} />
        <Route path="/retailersAuth" element={<RetailersAuth />} />
        <Route path="/distributorsAuth" element={<DistributorsAuth />} />
      </Routes>

    </SApp>
  );
}

export default App;
