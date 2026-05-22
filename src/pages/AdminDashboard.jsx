import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

// 🔥 FIREBASE CONFIG (use yours)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const [tab, setTab] = useState("users");

  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [payments, setPayments] = useState([]);
  const [jobs, setJobs] = useState([]);

  const [newCategory, setNewCategory] = useState("");

  // 🔐 AUTH CHECK
  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      setUser(u);

      if (u && u.email === "admin@gmail.com") {
        setIsAdmin(true);
        loadAllData();
      } else {
        setIsAdmin(false);
      }
    });
  }, []);

  // 📦 LOAD ALL DATA
  const loadAllData = async () => {
    const usersSnap = await getDocs(collection(db, "users"));
    const catSnap = await getDocs(collection(db, "categories"));
    const paySnap = await getDocs(collection(db, "payments"));
    const jobSnap = await getDocs(collection(db, "jobs"));

    setUsers(usersSnap.docs.map(d => ({ id: d.id, ...d.data() })));
    setCategories(catSnap.docs.map(d => ({ id: d.id, ...d.data() })));
    setPayments(paySnap.docs.map(d => ({ id: d.id, ...d.data() })));
    setJobs(jobSnap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  // 🚪 LOGOUT
  const logout = () => signOut(auth);

  // ➕ ADD CATEGORY
  const addCategory = async () => {
    if (!newCategory) return;

    await addDoc(collection(db, "categories"), {
      name: newCategory,
      createdAt: new Date().toISOString(),
    });

    setNewCategory("");
    loadAllData();
  };

  // ❌ DELETE CATEGORY
  const deleteCategory = async (id) => {
    await deleteDoc(doc(db, "categories", id));
    loadAllData();
  };

  // 🔄 UPDATE JOB STATUS (EXIT SYSTEM)
  const updateJobStatus = async (id, status) => {
    await updateDoc(doc(db, "jobs", id), {
      status,
    });
    loadAllData();
  };

  if (!user) return <h3>Loading...</h3>;

  if (!isAdmin) return <h3 style={{ color: "red" }}>Access Denied</h3>;

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>🔥 FULL ADMIN PANEL</h1>

      {/* NAV */}
      <div style={{ marginBottom: 15 }}>
        <button onClick={() => setTab("users")}>Users</button>
        <button onClick={() => setTab("categories")}>Categories</button>
        <button onClick={() => setTab("payments")}>Payments</button>
        <button onClick={() => setTab("jobs")}>Jobs / Exit</button>
        <button onClick={logout} style={{ float: "right" }}>
          Logout
        </button>
      </div>

      {/* USERS */}
      {tab === "users" && (
        <div>
          <h2>👤 Users ({users.length})</h2>
          {users.map(u => (
            <div key={u.id} style={box}>
              <p>Email: {u.email}</p>
              <p>Name: {u.name}</p>
              <p>Role: {u.role || "user"}</p>
            </div>
          ))}
        </div>
      )}

      {/* CATEGORIES */}
      {tab === "categories" && (
        <div>
          <h2>📂 Categories</h2>

          <input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Add category..."
          />
          <button onClick={addCategory}>Add</button>

          {categories.map(c => (
            <div key={c.id} style={box}>
              <p>{c.name}</p>
              <button onClick={() => deleteCategory(c.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}

      {/* PAYMENTS */}
      {tab === "payments" && (
        <div>
          <h2>💰 Payments / Earnings</h2>
          {payments.map(p => (
            <div key={p.id} style={box}>
              <p>User: {p.userEmail}</p>
              <p>Amount: KES {p.amount}</p>
              <p>Status: {p.status}</p>
            </div>
          ))}
        </div>
      )}

      {/* JOBS / EXIT */}
      {tab === "jobs" && (
        <div>
          <h2>💼 Jobs / Exit System</h2>

          {jobs.map(j => (
            <div key={j.id} style={box}>
              <p>Title: {j.title}</p>
              <p>User: {j.userEmail}</p>
              <p>Status: {j.status}</p>

              <button onClick={() => updateJobStatus(j.id, "active")}>
                Active
              </button>
              <button onClick={() => updateJobStatus(j.id, "completed")}>
                Completed
              </button>
              <button onClick={() => updateJobStatus(j.id, "exited")}>
                Exit
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// simple UI style
const box = {
  border: "1px solid #ccc",
  padding: 10,
  margin: 8,
};
