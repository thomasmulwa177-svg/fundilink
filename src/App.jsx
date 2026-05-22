import { useState, useEffect } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import {
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";

import { auth, db } from "./firebase";

export default function App() {

  // AUTH
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");

  const [user, setUser] = useState(null);

  // JOBS
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobs, setJobs] = useState([]);

  // LOAD JOBS
  const loadJobs = async () => {
    try {
      const snapshot = await getDocs(collection(db, "jobs"));
      const list = [];
      snapshot.forEach((doc) => list.push(doc.data()));
      setJobs(list);
    } catch (err) {
      alert(err.message);
    }
  };

  // SIGNUP
  const signup = async () => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await addDoc(collection(db, "users"), {
        email,
        role,
        createdAt: new Date(),
      });

      setUser(result.user);
      await loadJobs();

      alert("Account created");
    } catch (err) {
      alert(err.message);
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
      await loadJobs();

      alert("Login successful");
    } catch (err) {
      alert(err.message);
    }
  };

  // LOGOUT
  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  // POST JOB
  const postJob = async () => {
    try {
      await addDoc(collection(db, "jobs"), {
        title: jobTitle,
        description: jobDescription,
        customer: user.email,
        createdAt: new Date(),
      });

      alert("Job posted successfully");

      setJobTitle("");
      setJobDescription("");

      await loadJobs();
    } catch (err) {
      alert(err.message);
    }
  };

  // CUSTOMER DASHBOARD
  if (user && role === "customer") {
    return (
      <div style={container}>
        <h1>Customer Dashboard</h1>
        <p>{user.email}</p>

        <div style={card}>
          <h3>Post Job</h3>

          <input
            placeholder="Job title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            style={input}
          />

          <textarea
            placeholder="Job description"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            style={textarea}
          />

          <button style={button} onClick={postJob}>
            Post Job
          </button>
        </div>

        <button style={logoutBtn} onClick={logout}>
          Logout
        </button>
      </div>
    );
  }

  // FUNDI DASHBOARD
  if (user && role === "fundi") {
    return (
      <div style={container}>
        <h1>Fundi Dashboard</h1>
        <p>{user.email}</p>

        <div style={card}>
          <h3>Available Jobs</h3>

          {jobs.length === 0 && <p>No jobs yet</p>}

          {jobs.map((job, i) => (
            <div key={i} style={jobCard}>
              <h4>{job.title}</h4>
              <p>{job.description}</p>
              <p>Customer: {job.customer}</p>

              <button style={greenBtn}>
                Apply Job
              </button>
            </div>
          ))}
        </div>

        <button style={logoutBtn} onClick={logout}>
          Logout
        </button>
      </div>
    );
  }

  // ADMIN DASHBOARD
  if (user && role === "admin") {
    return (
      <div style={container}>
        <h1>Admin Dashboard</h1>

        <div style={card}>
          <h3>System Control</h3>
          <p>Manage users, jobs, payments</p>
        </div>

        <button style={logoutBtn} onClick={logout}>
          Logout
        </button>
      </div>
    );
  }

  // LOGIN PAGE
  return (
    <div style={container}>
      <h1>FundiLink LIVE</h1>

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        style={input}
      >
        <option value="customer">Customer</option>
        <option value="fundi">Fundi</option>
        <option value="admin">Admin</option>
      </select>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={input}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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
const container = {
  maxWidth: "500px",
  margin: "auto",
  padding: "20px",
  fontFamily: "Arial",
};

const card = {
  background: "#f5f5f5",
  padding: "20px",
  borderRadius: "10px",
  marginBottom: "20px",
};

const jobCard = {
  background: "white",
  padding: "10px",
  borderRadius: "8px",
  marginBottom: "10px",
};

const input = {
  width: "100%",
  padding: "12px",
  marginBottom: "10px",
};

const textarea = {
  width: "100%",
  padding: "12px",
  height: "120px",
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
