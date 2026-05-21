import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { auth, db } from "./firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [role, setRole] = useState("client");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        role,
      });

      if (role === "admin") navigate("/admin");
      if (role === "fundi") navigate("/fundi");
      if (role === "client") navigate("/client");

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Signup</h1>

      <input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <select onChange={(e) => setRole(e.target.value)}>
        <option value="client">Client</option>
        <option value="fundi">Fundi</option>
        <option value="admin">Admin</option>
      </select>

      <br /><br />

      <button onClick={signup}>Create Account</button>

      <br /><br />

      <button onClick={() => navigate("/login")}>
        Go To Login
      </button>
    </div>
  );
}

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      const data = docSnap.data();

      if (data.role === "admin") navigate("/admin");
      if (data.role === "fundi") navigate("/fundi");
      if (data.role === "client") navigate("/client");

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Login</h1>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={login}>Login</button>

      <br /><br />

      <button onClick={() => navigate("/")}>
        Back
      </button>
    </div>
  );
}

function AdminDashboard() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Dashboard</h1>
      <p>Manage users and payments</p>
    </div>
  );
}

function FundiDashboard() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Fundi Dashboard</h1>
      <p>View and accept jobs</p>
    </div>
  );
}

function ClientDashboard() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Client Dashboard</h1>
      <p>Post jobs and hire fundis</p>
    </div>
  );
}

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20 }}>
      <h1>FundiLink</h1>

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
