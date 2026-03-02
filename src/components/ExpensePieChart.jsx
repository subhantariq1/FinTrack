import React, { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Cell, Legend, ResponsiveContainer } from "recharts";
import supabase from "../client";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A28EFF",
  "#FF6F61",
];

function ExpensePieChart(props) {
  const [categoryData, setCategoryData] = useState([]);
  const [dateRangeText, setDateRangeText] = useState("");

  useEffect(() => {
    const fetchCategoryData = async () => {
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
        dateFrom = new Date(today.setDate(today.getDate() - 7));
      } else {
        dateFrom = new Date(today.setDate(today.getDate() - 30));
      }

      const formatDate = (date) =>
        date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      const rangeText =
        timePeriod === "yearly"
          ? `${dateFrom.toLocaleDateString("en-US", { month: "short", year: "numeric" })} - ${today.toLocaleDateString("en-US", { month: "short", year: "numeric" })}`
          : `${formatDate(dateFrom)} - ${formatDate(new Date())}`;
      setDateRangeText(rangeText);

      const { data, error } = await supabase
        .from("Transactions Log")
        .select("amount, category, date")
        .eq("userID", uid)
        .gte("date", dateFrom.toISOString().split("T")[0])
        .lt("amount", 0); // Only expenses

      if (error) {
        console.error("Error fetching category data:", error.message);
        return;
      }

      const groupedData = data.reduce((acc, { category, amount }) => {
        const numericAmount = Number(amount);
        acc[category] = (acc[category] || 0) + numericAmount;
        return acc;
      }, {});

      const formattedData = Object.entries(groupedData).map(
        ([category, total]) => ({
          name: category,
          value: Math.abs(total),
        })
      );
      setCategoryData(formattedData);
    };

    fetchCategoryData();
  }, [props.data.userID, props.data.time]); // ✅ This ensures it updates when props change

  return (
    <article className="chart-card">
      <header className="chart-card-header">
        <div>
          <h2 className="chart-title">Expenses by Category ({props.data.time})</h2>
          <p className="chart-range">{dateRangeText}</p>
        </div>
      </header>
      {categoryData.length > 0 ? (
        <div className="chart-wrap">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#0f766e"
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
              <Legend verticalAlign="bottom" align="center" iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="chart-empty">No expense records found for this range.</p>
      )}
    </article>
  );
}

export default ExpensePieChart;
