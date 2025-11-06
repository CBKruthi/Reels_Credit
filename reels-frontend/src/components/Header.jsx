import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API, { setAuthToken } from "../api/api";

export default function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
      (async () => {
        try {
          const res = await API.get("/auth/me");
          setUser(res.data.user);
        } catch (err) {
          console.error(err);
          localStorage.removeItem("token");
          setUser(null);
        }
      })();
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    setUser(null);
    navigate("/login");
  };

  return (
    <header
      style={{
        padding: "10px 20px",
        borderBottom: "1px solid #ddd",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
        <Link to="/">ReelsCredit</Link>
      </div>

      <nav style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        <Link to="/">Feed</Link>
        {user && <Link to="/upload">Upload</Link>}

        {/* Role-based links */}
        {user?.role === "creator" && <Link to="/studio">Studio</Link>}
        {user?.role === "admin" && <Link to="/admin">Admin</Link>}

        {/* Auth controls */}
        {user ? (
          <>
            <span style={{ color: "#666" }}>Hi, {user.name}</span>
            <button
              onClick={logout}
              style={{
                background: "transparent",
                border: "none",
                color: "red",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Signup</Link>
          </>
        )}
      </nav>
    </header>
  );
}
