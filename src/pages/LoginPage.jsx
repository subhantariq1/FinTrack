import React from "react";
import {useState} from 'react';
import { Link } from "react-router-dom";
import supabase from "../client";
import "./LoginPage.css"

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userID, setUserID] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.error("Error logging in:", error.message);
      // Handle error (e.g., show a message to the user)
    } else {
      console.log("Login successful:", data);
      // Redirect or perform any other action after successful login
      const userId = data.user?.id; // Safely access the user ID
      console.log("User ID:", userId);
  
      // Save the user ID to state or perform other actions
      setUserID(userId);
      window.location = `/dashboard/${userId}`; // Redirect to dashboard after login
    }
  }
  return (
    <div className = "login-container">
      <h1>Login</h1>
      <form onSubmit = {handleLogin} className = "form-container">
        <div className ="input-field">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={email} onChange={(e) => {setEmail(e.target.value)}}required />
        </div>
        <div className ="input-field">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={password} onChange={(e) => {setPassword(e.target.value)}} required />
        </div>
          <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <button> <Link to="/signup" className="link">Sign Up</Link></button></p>
    </div>
  );
}

export default LoginPage;