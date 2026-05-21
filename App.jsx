import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>
      <p>Manage all users and jobs</p>
      <button>View Fundis</button>
    </div>
  );
}

function FundiDashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Fundi Dashboard</h1>
      <p>View available jobs</p>
      <button>Accept Job</button>
    </div>
  );
}

function ClientDashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Client Dashboard</h1>
      <p>Post repair jobs</p>
      <button>Create Job</button>
    </div>
  );
}

function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>FundiLink</h1>

      <div style={{ display: "flex", gap: "10px" }}>
        <Link to="/admin">
          <button>Admin</button>
        </Link>

        <Link to="/fundi">
          <button>Fundi</button>
        </Link>

        <Link to="/client">
          <button>Client</button>
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/fundi" element={<FundiDashboard />} />
        <Route path="/client" element={<ClientDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
