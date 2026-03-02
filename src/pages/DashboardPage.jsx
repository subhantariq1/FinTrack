import React from "react";
import { useState } from "react";
import Visualizations from "../components/Visualizations";
import { useAuth } from "../components/AuthContext";
import "./DashboardPage.css";

function DashboardPage() {
  const { user } = useAuth();
  const [timePeriod, setTimePeriod] = useState("yearly");

  const handleTimePeriodChange = (event) => {
    setTimePeriod(event.target.value);
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p className="dashboard-subtitle">
            Track your cash flow and category trends over time.
          </p>
        </div>
        <div className="dashboard-control">
          <label htmlFor="timeSelection">Time Period</label>
          <select
            name="timeSelection"
            id="timeSelection"
            value={timePeriod}
            onChange={handleTimePeriodChange}
          >
            <option value="yearly">Yearly</option>
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
      </header>
      <p className="dashboard-user">Logged in as {user?.id}</p>
      <Visualizations data={{ userID: user?.id, time: timePeriod }} />
    </div>
  );
}

export default DashboardPage;
