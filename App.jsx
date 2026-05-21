import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20 }}>
      <h1>FundiLink Kenya</h1>

      <button onClick={() => navigate("/signup")}>
        Signup
      </button>

      <br /><br />

      <button onClick={() => navigate("/login")}>
        Login
      </button>
    </div>
  );
}

function Signup() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Signup Page</h1>

      <input placeholder="Email" />

      <br /><br />

      <input type="password" placeholder="Password" />

      <br /><br />

      <button>Create Account</button>
    </div>
  );
}

function Login() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Login Page</h1>

      <input placeholder="Email" />

      <br /><br />

      <input type="password" placeholder="Password" />

      <br /><br />

      <button>Login</button>
    </div>
  );
}

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
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/fundi" element={<FundiDashboard />} />
        <Route path="/client" element={<ClientDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
