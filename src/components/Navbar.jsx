import React from "react";
import { Link } from "react-router-dom";
import supabase from "../client";
import { useAuth } from "./AuthContext";
import "./Navbar.css";

function Navbar() {
  const { user } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location = "/"; // Redirect to home or login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to={user ? `/dashboard/${user.id}` : "/"} className="brand-link">
          <span className="brand-mark">FT</span>
          <span className="brand-text">FinTrack</span>
        </Link>

        <ul className="nav-links">
          {user ? (
            <>
              <li>
                <Link to={`/dashboard/${user.id}`} className="nav-link">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to={`/add-income/${user.id}`} className="nav-link">
                  Add Income
                </Link>
              </li>
              <li>
                <Link to={`/add-expense/${user.id}`} className="nav-link">
                  Add Expense
                </Link>
              </li>
              <li>
                <Link to={`/account/${user.id}`} className="nav-link">
                  Account
                </Link>
              </li>
              <li>
                <button type="button" className="btn btn-ghost" onClick={handleLogout}>
                  Sign Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/login" className="btn btn-primary">
                  Login / Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
