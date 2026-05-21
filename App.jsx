import { BrowserRouter, Routes, Route } from "react-router-dom";

function AdminDashboard() {
  return <h1>Admin Dashboard</h1>;
}

function FundiDashboard() {
  return <h1>Fundi Dashboard</h1>;
}

function ClientDashboard() {
  return <h1>Client Dashboard</h1>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/fundi" element={<FundiDashboard />} />
        <Route path="/client" element={<ClientDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
