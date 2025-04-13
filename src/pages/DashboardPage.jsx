import React from "react";
import { useState } from "react";
import Visualizations from "../components/Visualizations";
import Navbar from "../components/Navbar";
import { useEffect } from "react";

function DashboardPage() {
  // I need to fetch this user information from the backend
  // RN we're just gonna hardcode it
  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    expenses:{
      January: 300,
      February: 800,
      March: 500,
      April: 35,
      May: 900,
      June: 1200,
      July: 200,
      August: 83,
      September: 400,
      October: 450,
      November: 300,
      December: 589,
    }, 
  });

  // We're gonna need so use prams to get the user id and output the correct user's info

  return (
    
    <div>
      <Navbar/>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      <Visualizations data = {userInfo}/>
    </div>
  );
}

export default DashboardPage;