import React from "react";
import { useState } from "react";
import Visualizations from "../components/Visualizations";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function DashboardPage() {
  const { uid } = useParams(); // Get the user ID from the URL parameters
  const [timePeriod, setTimePeriod] = useState("default");

  const handleTimePeriodChange = (event) => {
    setTimePeriod(event.target.value);
  }


  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      <label htmlFor="timeSelection"> Filter by Time Period </label>
        <select name = "timeSelection" id = "timeSelection" value={timePeriod} onChange={handleTimePeriodChange}>
          <option value="default">Select Time Period</option>
          <option>Yearly</option>
          <option>Monthly</option>
          <option>Weekly</option>
        </select>
      <p>Welcome, user with ID: {uid}</p>
      <Visualizations data = {{userID: uid, time:timePeriod}}/>
    </div>
  );
}

export default DashboardPage;