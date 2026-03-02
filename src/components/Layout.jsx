import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import "./Layout.css";

function Layout() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;
