import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h1>FundiLink</h1>

      <div style={{ display: "flex", gap: 10 }}>
        <Link to="/login">
          <button>Login</button>
        </Link>

        <Link to="/signup">
          <button>Signup</button>
        </Link>
      </div>
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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}
