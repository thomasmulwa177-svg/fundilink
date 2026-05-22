import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "./firebase";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState(null);
  const [role, setRole] = useState("customer");

  // SIGNUP
  const signup = async () => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      setUser(result.user);

      alert("Account created successfully");
    } catch (error) {
      alert(error.message);
    }
  };

  // LOGIN
  const login = async () => {
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      setUser(result.user);

      alert("Login successful");
    } catch (error) {
      alert(error.message);
    }
  };

  // LOGOUT
  const logout = async () => {
    await signOut(auth);

    setUser(null);
  };

  // DASHBOARDS
  if (user && role === "customer") {
    return (
      <div style={{ padding: "20px", fontFamily: "Arial" }}>
        <h1>Customer Dashboard</h1>

        <p>Logged in as: {user.email}</p>

        <div style={card}>
          <h3>Post a Job</h3>

          <input
            placeholder="Job title"
            style={input}
          />

          <textarea
            placeholder="Describe the work"
            style={textarea}
          ></textarea>

          <button style={button}>
            Post Job
          </button>
        </div>

        <div style={card}>
          <h3>Search Fundis</h3>

          <button style={button}>
            Find Electricians
          </button>

          <button style={button}>
            Find CCTV Experts
          </button>
        </div>

        <button style={logoutBtn} onClick={logout}>
          Logout
        </button>
      </div>
    );
  }

  if (user && role === "fundi") {
    return (
      <div style={{ padding: "20px", fontFamily: "Arial" }}>
        <h1>Fundi Dashboard</h1>

        <p>Logged in as: {user.email}</p>

        <div style={card}>
          <h3>Membership Payment</h3>

          <p>Pay KES 500 to activate your account.</p>

          <input
            placeholder="M-PESA Number"
            style={input}
          />

          <button style={greenBtn}>
            Pay with M-PESA
          </button>
        </div>

        <div style={card}>
          <h3>Available Jobs</h3>

          <p>CCTV installation in Nairobi</p>

          <button style={button}>
            Apply Job
          </button>
        </div>

        <button style={logoutBtn} onClick={logout}>
          Logout
        </button>
      </div>
    );
  }

  if (user && role === "admin") {
    return (
      <div style={{ padding: "20px", fontFamily: "Arial" }}>
        <h1>Admin Dashboard</h1>

        <div style={card}>
          <h3>Total Users</h3>
          <p>120</p>
        </div>

        <div style={card}>
          <h3>Total Fundis</h3>
          <p>45</p>
        </div>

        <div style={card}>
          <h3>Total Revenue</h3>
          <p>KES 25,000</p>
        </div>

        <button style={logoutBtn} onClick={logout}>
          Logout
        </button>
      </div>
    );
  }

  // LOGIN PAGE
  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "400px",
        margin: "auto",
        fontFamily: "Arial",
      }}
    >
      <h1>FundiLink LIVE</h1>

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        style={input}
      >
        <option value="customer">
          Customer
        </option>

        <option value="fundi">
          Fundi
        </option>

        <option value="admin">
          Admin
        </option>
      </select>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        style={input}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        style={input}
      />

      <button style={button} onClick={signup}>
        Create Account
      </button>

      <button style={greenBtn} onClick={login}>
        Login
      </button>
    </div>
  );
}

// STYLES
const input = {
  width: "100%",
  padding: "12px",
  marginBottom: "10px",
};

const textarea = {
  width: "100%",
  padding: "12px",
  height: "100px",
  marginBottom: "10px",
};

const button = {
  width: "100%",
  padding: "12px",
  background: "#2563eb",
  color: "white",
  border: "none",
  marginBottom: "10px",
};

const greenBtn = {
  width: "100%",
  padding: "12px",
  background: "#16a34a",
  color: "white",
  border: "none",
  marginBottom: "10px",
};

const logoutBtn = {
  width: "100%",
  padding: "12px",
  background: "#dc2626",
  color: "white",
  border: "none",
};

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  marginBottom: "20px",
};
