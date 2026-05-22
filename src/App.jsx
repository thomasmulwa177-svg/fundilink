import { useEffect, useState } from "react";
import { auth } from "./firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export default function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
  }, []);

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      alert(e.message);
    }
  };

  const logout = () => signOut(auth);

  // 🔴 LOGIN SCREEN
  if (!user) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Login</h2>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />

        <button onClick={login}>Login</button>
      </div>
    );
  }

  // 🔵 LOGGED IN VIEW
  return (
    <div style={{ padding: 20 }}>
      <h1>FundiLink System</h1>

      <p>Logged in as: {user.email}</p>

      <button onClick={logout}>Logout</button>
    </div>
  );
}
