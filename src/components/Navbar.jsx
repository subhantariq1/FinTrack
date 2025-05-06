import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../client";
import { useAuth } from "./AuthContext";
import "./Navbar.css"; // Assuming you have a CSS file for styling

function Navbar() {
  const { user } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location = "/"; // Redirect to home or login page
  };

  return (
    <nav className="navbar">

      <div className="logo">
        <h1>FinTrack</h1>
      </div>

      <ul className="navLinks">
        {user ? (
          <>
            <li>
              <Link to={`/account/${user.id}`} className="link">
                My Account
              </Link>
            </li>
            <li>
              <Link to={`/dashboard/${user.id}`} className="link">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to={`/add-income/${user.id}`} className="link">
                Add Income
              </Link>
            </li>
            <li>
              <Link to={`/add-expense/${user.id}`} className="link">
                Add Expense
              </Link>
            </li>
            <li>
              <button>
                <Link to="/" className="link" onClick={handleLogout}>
                  Logout
                </Link>
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/" className="link">
                Home
              </Link>
            </li>
            <li>
              <button>
                <Link to="/login" className="link sigin ">
                  Login/Sign Up
                </Link>
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;