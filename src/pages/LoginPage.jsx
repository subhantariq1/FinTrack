import React from "react";
import Navbar from "../components/Navbar"
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div>
      <Navbar/>
      <h1>Login</h1>
      <form>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account?<button> <Link to="/signup" className="link" >Sign Up</Link></button></p>
    </div>
  );
}

export default LoginPage;