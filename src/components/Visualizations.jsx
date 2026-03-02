import React from "react";
import ExpenseChart from "./ExpenseChart";
import ExpensePieChart from "./ExpensePieChart";
import IncomeChart from "./IncomeChart";
import IncomePieChart from "./IncomePieChart";
import "./Visualizations.css";

function Visualizations(props) {
  return (
    <section className="visualizations">
      <div className="visualizations-grid">
        <ExpenseChart data={{ userID: props.data.userID, time: props.data.time }} />
        <IncomeChart data={{ userID: props.data.userID, time: props.data.time }} />
        <ExpensePieChart data={{ userID: props.data.userID, time: props.data.time }} />
        <IncomePieChart data={{ userID: props.data.userID, time: props.data.time }} />
      </div>
    </section>
  );
}

export default Visualizations;
