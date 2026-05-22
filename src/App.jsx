import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
  }, []);

  if (!user) {
    return <h2>Login required</h2>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>FundiLink System</h1>

      <p>Logged in as: {user.email}</p>

      <button onClick={() => signOut(auth)}>
        Logout
      </button>
    </div>
  );
}
