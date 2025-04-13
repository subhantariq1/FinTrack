import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function SignUpPage() {
    return (
        <div>
            <Navbar/>
            <h1>Sign Up</h1>
            <form>
                <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />
                </div>
                <div>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required />
                </div>
                <button type="submit">Sign Up</button>
            </form>
            <p>Already have an account?<button> <Link to="/login" className="link" >Login</Link></button></p>
        </div>
    );
}

export default SignUpPage;