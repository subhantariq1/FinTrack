import { useState } from 'react'
import { Link } from 'react-router-dom';
import React from 'react' 
import "./Navbar.css"

function Navbar() {

  return (
    <nav className="navbar">

      <div className="logo">
        <h1>FinTrack</h1>
      </div>

      <ul className="navLinks">
        <li><Link to="/" className="link" >Home</Link></li>
        {/* <li><Link to="/signup" className="link" >Signup</Link></li> */}
        <li><Link to="/dashboard" className="link" >Dashboard</Link></li>
        <li><Link to="/add-expense" className="link" >Add Expense</Link></li>
        <li><Link to="/login" className="link" >Login/Sign Up</Link></li>
      </ul>
    </nav>

  );

}

export default Navbar