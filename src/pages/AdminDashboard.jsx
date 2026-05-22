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
  updateDoc,
  doc,
} from "firebase/firestore";

/* ================= FIREBASE ================= */
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

/* ================= COMPONENT ================= */
export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const [tab, setTab] = useState("users");

  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [payments, setPayments] = useState([]);
  const [jobs, setJobs] = useState([]);

  const [newCategory, setNewCategory] = useState("");

  /* ================= AUTH ================= */
  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      setUser(u);

      if (u && u.email === "admin@gmail.com") {
        setIsAdmin(true);
        loadData();
      } else {
        setIsAdmin(false);
      }
    });
  }, []);

  /* ================= LOAD DATA ================= */
  const loadData = async () => {
    const usersSnap = await getDocs(collection(db, "users"));
    const catSnap = await getDocs(collection(db, "categories"));
    const paySnap = await getDocs(collection(db, "payments"));
    const jobSnap = await getDocs(collection(db, "jobs"));

    setUsers(usersSnap.docs.map(d => ({ id: d.id, ...d.data() })));
    setCategories(catSnap.docs.map(d => ({ id: d.id, ...d.data() })));
    setPayments(paySnap.docs.map(d => ({ id: d.id, ...d.data() })));
    setJobs(jobSnap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  /* ================= LOGOUT ================= */
  const logout = () => signOut(auth);

  /* ================= USERS ================= */
  const deleteUser = async (id) => {
    await deleteDoc(doc(db, "users", id));
    loadData();
  };

  const makeAdmin = async (id) => {
    await updateDoc(doc(db, "users", id), {
      role: "admin",
    });
    loadData();
  };

  /* ================= CATEGORY ================= */
  const addCategory = async () => {
    if (!newCategory) return;

    await addDoc(collection(db, "categories"), {
      name: newCategory,
      createdAt: new Date().toISOString(),
    });

    setNewCategory("");
    loadData();
  };

  const deleteCategory = async (id) => {
    await deleteDoc(doc(db, "categories", id));
    loadData();
  };

  /* ================= PAYMENTS ================= */
  const markPaid = async (id) => {
    await updateDoc(doc(db, "payments", id), {
      status: "paid",
    });
    loadData();
  };

  /* ================= JOBS ================= */
  const updateJob = async (id, status) => {
    await updateDoc(doc(db, "jobs", id), {
      status,
    });
    loadData();
  };

  /* ================= UI CHECK ================= */
  if (!user) return <h3>Loading...</h3>;
  if (!isAdmin) return <h3 style={{ color: "red" }}>Access Denied</h3>;

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>🔥 ADMIN FULL CONTROL PANEL</h1>

      {/* NAV */}
      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setTab("users")}>Users</button>
        <button onClick={() => setTab("categories")}>Categories</button>
        <button onClick={() => setTab("payments")}>Payments</button>
        <button onClick={() => setTab("jobs")}>Jobs</button>
        <button onClick={logout} style={{ float: "right" }}>
          Logout
        </button>
      </div>

      {/* ================= USERS ================= */}
      {tab === "users" && (
        <div>
          <h2>👤 Users</h2>

          {users.map(u => (
            <div key={u.id} style={box}>
              <p>Email: {u.email}</p>
              <p>Role: {u.role || "user"}</p>

              <button onClick={() => makeAdmin(u.id)}>
                Make Admin
              </button>

              <button onClick={() => deleteUser(u.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ================= CATEGORIES ================= */}
      {tab === "categories" && (
        <div>
          <h2>📂 Categories</h2>

          <input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category"
          />
          <button onClick={addCategory}>Add</button>

          {categories.map(c => (
            <div key={c.id} style={box}>
              <p>{c.name}</p>
              <button onClick={() => deleteCategory(c.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ================= PAYMENTS ================= */}
      {tab === "payments" && (
        <div>
          <h2>💰 Payments</h2>

          {payments.map(p => (
            <div key={p.id} style={box}>
              <p>User: {p.userEmail}</p>
              <p>Amount: KES {p.amount}</p>
              <p>Status: {p.status}</p>

              <button onClick={() => markPaid(p.id)}>
                Mark Paid
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ================= JOBS ================= */}
      {tab === "jobs" && (
        <div>
          <h2>💼 Jobs / Exit System</h2>

          {jobs.map(j => (
            <div key={j.id} style={box}>
              <p>Title: {j.title}</p>
              <p>Status: {j.status}</p>

              <button onClick={() => updateJob(j.id, "active")}>
                Active
              </button>
              <button onClick={() => updateJob(j.id, "completed")}>
                Complete
              </button>
              <button onClick={() => updateJob(j.id, "exited")}>
                Exit
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ================= STYLE ================= */
const box = {
  border: "1px solid #ccc",
  padding: 10,
  margin: 10,
};
