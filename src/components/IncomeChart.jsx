import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import supabase from "../client";

const IncomeChart = (props) => {
  const [incomeData, setIncomeData] = useState([]);
  const [dateRangeText, setDateRangeText] = useState("");

  useEffect(() => {
    const fetchIncome = async () => {
      const uid = props.data.userID;
      const timePeriod = props.data.time?.toLowerCase() || "monthly";
      const today = new Date();
      let dateFrom;

      if (timePeriod === "yearly") {
        dateFrom = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
      } else if (timePeriod === "weekly") {
        dateFrom = new Date(today.setDate(today.getDate() - 7));
      } else {
        dateFrom = new Date(today.setDate(today.getDate() - 30));
      }

      const formatDate = (date) =>
        date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      const rangeText =
        timePeriod === "yearly"
          ? `${dateFrom.toLocaleDateString("en-US", { month: "short", year: "numeric" })} – ${new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" })}`
          : `${formatDate(dateFrom)} – ${formatDate(new Date())}`;
      setDateRangeText(rangeText);

      const { data, error } = await supabase
        .from("Transactions Log")
        .select("date, amount")
        .eq("userID", uid)
        .gte("date", dateFrom.toISOString())
        .gt("amount", 0); // Only positive values = income

      if (error) {
        console.error("Error fetching income data:", error.message);
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

      const formatted = Object.entries(grouped).map(([label, total_amount]) => ({
        label,
        total_amount,
      }));

      setIncomeData(formatted);
    };

    fetchIncome();
  }, [props.data.time, props.data.userID]);

  return (
    <div>
      <h2>Income Overview ({props.data.time})</h2>
      <p>{dateRangeText}</p>
      <BarChart width={1000} height={300} data={incomeData}>
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="total_amount" fill="#00C49F" name="Total Income" />
      </BarChart>
    </div>
  );
};

export default IncomeChart;
