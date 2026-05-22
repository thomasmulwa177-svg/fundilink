import { useState } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import {
  collection,
  addDoc,
} from "firebase/firestore";

import { auth, db } from "./firebase";

export default function App() {

  // AUTH
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ROLE
  const [role, setRole] = useState("customer");

  // USER
  const [user, setUser] = useState(null);

  // JOBS
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  // SIGNUP
  const signup = async () => {

    try {

      const result =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      // SAVE USER
      await addDoc(collection(db, "users"), {
        email,
        role,
        createdAt: new Date(),
      });

      setUser(result.user);

      alert("Account created successfully");

    } catch (error) {

      alert(error.message);

    }
  };

  // LOGIN
  const login = async () => {

    try {

      const result =
        await signInWithEmailAndPassword(
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

    } catch (error) {

      alert(error.message);

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
            placeholder="Job Title"
            value={jobTitle}
            onChange={(e) =>
              setJobTitle(e.target.value)
            }
            style={input}
          />

          <textarea
            placeholder="Describe the work"
            value={jobDescription}
            onChange={(e) =>
              setJobDescription(e.target.value)
            }
            style={textarea}
          ></textarea>

          <button
            style={button}
            onClick={postJob}
          >
            Post Job
          </button>

        </div>

        <button
          style={logoutBtn}
          onClick={logout}
        >
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

          <h3>Membership Plans</h3>

          <button style={button}>
            Starter KES 200
          </button>

          <button style={greenBtn}>
            Premium KES 500
          </button>

          <button style={darkBtn}>
            Pro KES 1500
          </button>

        </div>

        <div style={card}>

          <h3>Available Jobs</h3>

          <p>Jobs from customers will appear here.</p>

        </div>

        <button
          style={logoutBtn}
          onClick={logout}
        >
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

          <h3>Platform Analytics</h3>

          <p>
            Manage users, jobs and payments.
          </p>

        </div>

        <div style={card}>

          <h3>Total Revenue</h3>

          <p>KES 0</p>

        </div>

        <div style={card}>

          <h3>Admin Controls</h3>

          <button style={button}>
            View Users
          </button>

          <button style={greenBtn}>
            View Jobs
          </button>

          <button style={darkBtn}>
            View Payments
          </button>

        </div>

        <button
          style={logoutBtn}
          onClick={logout}
        >
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
        onChange={(e) =>
          setRole(e.target.value)
        }
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

      <button
        style={button}
        onClick={signup}
      >
        Create Account
      </button>

      <button
        style={greenBtn}
        onClick={login}
      >
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

const darkBtn = {
  width: "100%",
  padding: "12px",
  background: "#111827",
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
