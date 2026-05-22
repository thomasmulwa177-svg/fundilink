import { useState } from "react";

export default function App() {
  const [page, setPage] = useState("home");

  return (
    <div
      style={{
        fontFamily: "Arial",
        background: "#f1f5f9",
        minHeight: "100vh",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          background: "#0f172a",
          color: "white",
          padding: "15px",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <h2>FundiLink</h2>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("fundis")}>Fundis</button>
          <button onClick={() => setPage("jobs")}>Post Job</button>
          <button onClick={() => setPage("admin")}>Admin</button>
        </div>
      </div>

      {/* HOME PAGE */}
      {page === "home" && (
        <div style={{ padding: "20px" }}>
          <h1>Find Trusted Fundis Near You</h1>

          <p>
            Search electricians, CCTV technicians, plumbers, welders and more.
          </p>

          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              marginTop: "20px",
            }}
          >
            <h3>Electrical Installation</h3>
            <p>Professional electrical services.</p>

            <button
              style={{
                background: "green",
                color: "white",
                border: "none",
                padding: "10px",
                borderRadius: "5px",
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
            <h3>CCTV Installation</h3>
            <p>Trusted CCTV technicians.</p>

            <button
              style={{
                background: "green",
                color: "white",
                border: "none",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              Hire Fundi
            </button>
          </div>
        </div>
      )}

      {/* FUNDI PAGE */}
      {page === "fundis" && (
        <div style={{ padding: "20px" }}>
          <h1>Join as a Fundi</h1>

          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              marginTop: "20px",
            }}
          >
            <input
              type="text"
              placeholder="Full Name"
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "10px",
              }}
            />

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
              type="text"
              placeholder="Service Offered"
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "10px",
              }}
            />

            <input
              type="password"
              placeholder="Create Password"
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "10px",
              }}
            />

            <button
              style={{
                width: "100%",
                background: "#2563eb",
                color: "white",
                border: "none",
                padding: "12px",
                borderRadius: "5px",
              }}
            >
              Register Fundi
            </button>
          </div>

          {/* MPESA PAYMENT */}
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              marginTop: "20px",
            }}
          >
            <h2>Platform Joining Fee</h2>

            <p>Pay KES 500 via M-PESA to activate account.</p>

            <input
              type="text"
              placeholder="M-PESA Phone Number"
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
                border: "none",
                padding: "12px",
                borderRadius: "5px",
              }}
            >
              Pay with M-PESA
            </button>
          </div>
        </div>
      )}

      {/* JOB POSTING PAGE */}
      {page === "jobs" && (
        <div style={{ padding: "20px" }}>
          <h1>Post a Job</h1>

          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              marginTop: "20px",
            }}
          >
            <input
              type="text"
              placeholder="Job Title"
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "10px",
              }}
            />

            <textarea
              placeholder="Describe the work needed"
              style={{
                width: "100%",
                padding: "12px",
                height: "120px",
                marginBottom: "10px",
              }}
            ></textarea>

            <input
              type="text"
              placeholder="Location"
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "10px",
              }}
            />

            <button
              style={{
                width: "100%",
                background: "#0f172a",
                color: "white",
                border: "none",
                padding: "12px",
                borderRadius: "5px",
              }}
            >
              Post Job
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
            <h2>Available Jobs</h2>

            <p>
              <strong>Need CCTV Installation</strong>
            </p>

            <p>Location: Nairobi</p>

            <button
              style={{
                background: "#2563eb",
                color: "white",
                border: "none",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              Apply Job
            </button>
          </div>
        </div>
      )}

      {/* ADMIN PAGE */}
      {page === "admin" && (
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
              <h3>Total Jobs</h3>
              <h2>12</h2>
            </div>

            <div
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              <h3>Total Revenue</h3>
              <h2>KES 25,000</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
