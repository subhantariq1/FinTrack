import { useState } from 'react'
import { Link } from 'react-router-dom';
import React from 'react' 

function Navbar() {

  return (
    <nav className="navbar">

      <div className="logo">
        <h1>FinTrack</h1>
      </div>

      <ul className="navLinks">
        <li><Link to="/" className="link" >Home</Link></li>
        <li><Link to="/login" className="link" >Login</Link></li>
        <li><Link to="/signup" className="link" >Signup</Link></li>
        <li><Link to="/dashboard" className="link" >Log Expenses</Link></li>
      </ul>
    </nav>

  );

}

export default Navbar