import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
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
        dateFrom = new Date(
          today.getFullYear() - 1,
          today.getMonth(),
          today.getDate()
        );
      } else if (timePeriod === "weekly") {
        dateFrom = new Date(today);
        dateFrom.setDate(today.getDate() - 7);
      } else {
        // default = monthly
        dateFrom = new Date(today);
        dateFrom.setDate(today.getDate() - 30);
      }

      // Format and display date range
      const formatDate = (date) =>
        date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      const rangeText =
        timePeriod === "yearly"
          ? `${dateFrom.toLocaleDateString("en-US", { month: "short", year: "numeric" })} - ${today.toLocaleDateString("en-US", { month: "short", year: "numeric" })}`
          : timePeriod === "monthly"
            ? `${formatDate(dateFrom)} - ${formatDate(today)}`
            : `${formatDate(dateFrom)} - ${formatDate(today)}`;
      setDateRangeText(rangeText);

      const { data, error } = await supabase
        .from("Transactions Log")
        .select("date, amount")
        .eq("userID", uid)
        .gte("date", dateFrom.toISOString().split("T")[0])
        .lt("amount", 0); // Only negative amounts (expenses)

      if (error) {
        console.error("Error fetching expenses:", error.message);
        return;
      }

      if (!data || data.length === 0) {
        setExpenses([]);
        return;
      }

      const grouped = {};
      data.forEach(({ date, amount }) => {
        const d = new Date(date);
        const numericAmount = Number(amount);
        let key;

        if (timePeriod === "yearly") {
          key = d.toLocaleString("en-US", { month: "long" });
        } else if (timePeriod === "weekly") {
          key = d.toLocaleDateString("en-US", { weekday: "short" });
        } else {
          key = d.getDate().toString().padStart(2, "0");
        }

        grouped[key] = (grouped[key] || 0) + numericAmount;
      });

      const formattedData = Object.entries(grouped).map(
        ([label, total_amount]) => ({
          label,
          total_amount: Math.abs(total_amount),
        })
      );

      setExpenses(formattedData);
    };

    fetchExpenses();
  }, [props.data.time, props.data.userID]);

  return (
    <article className="chart-card">
      <header className="chart-card-header">
        <div>
          <h2 className="chart-title">Expenses Overview ({props.data.time})</h2>
          <p className="chart-range">{dateRangeText}</p>
        </div>
      </header>
      {expenses.length > 0 ? (
        <div className="chart-wrap">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={expenses}>
              <XAxis dataKey="label" tick={{ fontSize: 12 }} />
              <YAxis domain={["auto", "auto"]} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar type="monotone" dataKey="total_amount" fill="#0f766e" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="chart-empty">No expense records found for this range.</p>
      )}
    </article>
  );
};

export default ExpenseChart;
