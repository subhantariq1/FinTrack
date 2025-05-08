import react from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Layout() {
    
    return (
        <div>
            <Navbar />
            <div className="container">
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;