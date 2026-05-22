import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "./firebase";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // SIGNUP
  const signup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created successfully");
    } catch (error) {
      alert(error.message);
    }
  };

  // LOGIN
  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Arial",
        maxWidth: "400px",
        margin: "auto",
      }}
    >
      <h1>FundiLink Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "10px",
        }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "10px",
        }}
      />

      <button
        onClick={signup}
        style={{
          width: "100%",
          padding: "12px",
          background: "#2563eb",
          color: "white",
          border: "none",
          marginBottom: "10px",
        }}
      >
        Create Account
      </button>

      <button
        onClick={login}
        style={{
          width: "100%",
          padding: "12px",
          background: "#16a34a",
          color: "white",
          border: "none",
        }}
      >
        Login
      </button>
    </div>
  );
}
