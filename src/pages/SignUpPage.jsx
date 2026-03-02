import React from "react";
import {useState} from "react";
import { Link } from "react-router-dom";
import supabase from "../client"; // Adjust the import based on your project structure
import "./SignUpPage.css"


function SignUpPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const{ data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) {
            console.error("Error signing up:", error.message);
            // Handle error (e.g., show a message to the user)
        }
        
    }
    
    return (
        <div className="signup-containter">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit} className = "form-container">
                <div className ="input-field">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className ="input-field">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Sign Up</button>
            </form>
            <div className="signup-footer">
                <p>Already have an account?</p>
                <Link to="/login" className="signup-login-btn">Login</Link>
            </div>
        </div>
    );
}

export default SignUpPage;
