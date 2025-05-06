import React from "react";
import ExpenseChart from "./ExpenseChart";
import ExpensePieChart from "./ExpensePieChart";
import { Pie } from "recharts";
import IncomeChart from "./IncomeChart";
import IncomePieChart from "./IncomePieChart";

function Visualizations(props) {

    return (
        <div>
            <p>Here you can visualize your expenses.</p>
            {/* Add your visualization components here */}
            <ExpenseChart data={{ userID: props.data.userID, time: props.data.time }} />
            <IncomeChart data={{ userID: props.data.userID, time: props.data.time }} />
            <ExpensePieChart data={{ userID: props.data.userID, time: props.data.time}} /> 
            <IncomePieChart data={{ userID: props.data.userID, time: props.data.time}} />  
            <p> will add more charts</p>
        </div>
  );
}

export default Visualizations;