import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import supabase from "../client";

const ExpenseChart = (props) => {
  const [expenses, setExpenses] = useState([]);
  const [dateRangeText, setDateRangeText] = useState("");

  useEffect(() => {
    const fetchExpenses = async () => {
      const uid = props.data.userID;
      const timePeriod = props.data.time?.toLowerCase() || "monthly";
      const today = new Date();
      let dateFrom;

      if (timePeriod === "yearly") {
        dateFrom = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
      } else if (timePeriod === "weekly") {
        dateFrom = new Date(today);
        dateFrom.setDate(today.getDate() - 7);
      } else {
        // default = monthly
        dateFrom = new Date(today);
        dateFrom.setDate(today.getDate() - 30);
      }

      // Format and display date range
      const formatDate = (date) => date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      const rangeText =
        timePeriod === "yearly"
          ? `${dateFrom.toLocaleDateString("en-US", { month: "short", year: "numeric" })} – ${today.toLocaleDateString("en-US", { month: "short", year: "numeric" })}`
          : timePeriod === "monthly"
          ? `${formatDate(dateFrom)} – ${formatDate(today)}`
          : `${formatDate(dateFrom)} – ${formatDate(today)}`;
      setDateRangeText(rangeText);

      const { data, error } = await supabase
        .from("Transactions Log")
        .select("date, amount")
        .eq("userID", uid)
        .gte("date", dateFrom.toISOString())
        .lt("amount", 0); // Only negative amounts (expenses)

      if (error) {
        console.error("Error fetching expenses:", error.message);
        return;
      }

      const grouped = {};
      data.forEach(({ date, amount }) => {
        const d = new Date(date);
        let key;

        if (timePeriod === "yearly") {
          key = d.toLocaleString("en-US", { month: "long" });
        } else if (timePeriod === "weekly") {
          key = d.toLocaleDateString("en-US", { weekday: "short" });
        } else {
          key = d.getDate().toString().padStart(2, "0");
        }

        grouped[key] = (grouped[key] || 0) + amount;
      });

      const formattedData = Object.entries(grouped).map(([label, total_amount]) => ({
        label,
        total_amount,
      }));

      setExpenses(formattedData);
    };

    fetchExpenses();
  }, [props.data.time, props.data.userID]);

  return (
    <div>
      <h2>Expenses Overview ({props.data.time})</h2>
      <p>{dateRangeText}</p> {/* 👈 Shows actual range */}
      <BarChart width={1000} height={300} data={expenses}>
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar type="monotone" dataKey="total_amount" stroke="#8884d8" />
      </BarChart>
    </div>
  );
};

export default ExpenseChart;
