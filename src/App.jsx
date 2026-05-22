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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");

  const [user, setUser] = useState(null);

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

      await addDoc(collection(db, "users"), {
        email,
        role,
        createdAt: new Date(),
      });

      setUser(result.user);

      alert("Account created");

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
      <div style={{ padding: "20px" }}>

        <h1>Customer Dashboard</h1>

        <p>{user.email}</p>

        <input
          placeholder="Job title"
          value={jobTitle}
          onChange={(e) =>
            setJobTitle(e.target.value)
          }
          style={input}
        />

        <textarea
          placeholder="Job description"
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
  maxWidth: "400px",
  margin: "auto",
  padding: "30px",
  fontFamily: "Arial",
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
