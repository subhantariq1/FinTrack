import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";

function ExpenseChart({ data }) {

    const expenseData = Object.entries(data.expenses).map(([month, amount]) => ({
        month,
        amount,
    }));   
    console.log(expenseData)

    return (
        <div>
            <h2>Monthly Expenses</h2>
            <LineChart width={600} height={300} data={expenseData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="amount" stroke="#8884d8" />
            </LineChart>
        </div>
    );
}

export default ExpenseChart;