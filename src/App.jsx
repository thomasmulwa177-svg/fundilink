import { useState } from "react";

export default function App() {
  const [role, setRole] = useState("customer");

  return (
    <div style={{ fontFamily: "Arial", background: "#f4f4f4", minHeight: "100vh" }}>
      
      {/* HEADER */}
      <div
        style={{
          background: "#0f172a",
          color: "white",
          padding: "15px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>FundiLink</h2>

        <div>
          <button
            onClick={() => setRole("customer")}
            style={{
              marginRight: "10px",
              padding: "10px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Customer
          </button>

          <button
            onClick={() => setRole("admin")}
            style={{
              padding: "10px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Admin
          </button>
        </div>
      </div>

      {/* CUSTOMER PAGE */}
      {role === "customer" && (
        <div style={{ padding: "20px" }}>
          <h1>Find Trusted Fundis Near You</h1>

          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              marginTop: "20px",
            }}
          >
            <h3>Electrician</h3>
            <p>Experienced electrical installations and repairs.</p>
            <button
              style={{
                background: "green",
                color: "white",
                border: "none",
                padding: "10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Hire Fundi
            </button>
          </div>

          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              marginTop: "20px",
            }}
          >
            <h3>CCTV Technician</h3>
            <p>Professional CCTV installation services.</p>
            <button
              style={{
                background: "green",
                color: "white",
                border: "none",
                padding: "10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Hire Fundi
            </button>
          </div>

          {/* MPESA SECTION */}
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              marginTop: "30px",
            }}
          >
            <h2>M-PESA Payment</h2>

            <input
              type="text"
              placeholder="Phone Number"
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "10px",
              }}
            />

            <input
              type="number"
              placeholder="Amount"
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "10px",
              }}
            />

            <button
              style={{
                width: "100%",
                background: "#16a34a",
                color: "white",
                padding: "12px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Pay with M-PESA
            </button>
          </div>
        </div>
      )}

      {/* ADMIN PAGE */}
      {role === "admin" && (
        <div style={{ padding: "20px" }}>
          <h1>Admin Dashboard</h1>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              <h3>Total Users</h3>
              <h2>120</h2>
            </div>

            <div
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              <h3>Total Fundis</h3>
              <h2>45</h2>
            </div>

            <div
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              <h3>Total Payments</h3>
              <h2>KES 45,000</h2>
            </div>
          </div>

          {/* FUNDI MANAGEMENT */}
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              marginTop: "30px",
            }}
          >
            <h2>Manage Fundis</h2>

            <table width="100%" style={{ marginTop: "20px" }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Service</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>John Mwangi</td>
                  <td>Electrical</td>
                  <td>Approved</td>
                </tr>

                <tr>
                  <td>Kevin Otieno</td>
                  <td>CCTV</td>
                  <td>Pending</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
