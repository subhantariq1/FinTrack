import React from "react";
import './HomePage.css';
import { Link } from "react-router";

function HomePage() {
  return (
    <div className = "home-container">
      <h1>Welcome to FinTrack</h1>
      <p>Your personal finance tracker.</p>
      <p>Log your expenses and manage your finances effectively.</p>
      <Link to="/signup" className="link" ><button>Sign Up </button></Link>
    </div>

  );
}

export default HomePage;