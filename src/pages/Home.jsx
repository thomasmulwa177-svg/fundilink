import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="page">
      <h1>FundiLink</h1>

      <div className="links">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/fundi">Fundi</Link>
        <Link to="/client">Client</Link>
      </div>
    </div>
  );
}
