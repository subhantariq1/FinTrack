import React, { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";
import supabase from "../client";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28EFF", "#FF6F61"];

function IncomePieChart(props) {
  const [categoryData, setCategoryData] = useState([]);
  const [dateRangeText, setDateRangeText] = useState("");

  useEffect(() => {
    const fetchCategoryData = async () => {
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
            ? `${dateFrom.toLocaleDateString("en-US", { month: "short", year: "numeric" })} – ${today.toLocaleDateString("en-US", { month: "short", year: "numeric" })}`
            : `${formatDate(dateFrom)} – ${formatDate(new Date())}`;
        setDateRangeText(rangeText);

        const { data, error } = await supabase
            .from("Transactions Log")
            .select("amount, category, date")
            .eq("userID", uid)
            .gte("date", dateFrom.toISOString())
            .gt("amount", 0); // Only Income

        if (error) {
            console.error("Error fetching category data:", error.message);
            return;
        }

        const groupedData = data.reduce((acc, { category, amount }) => {
            acc[category] = (acc[category] || 0) + amount;
            return acc;
        }, {});

        const formattedData = Object.entries(groupedData).map(([category, total]) => ({
            name: category,
            value: Math.abs(total),
        }));
        setCategoryData(formattedData);
    };

        fetchCategoryData();
    }, [props.data.userId, props.data.time]); // ✅ This ensures it updates when props change

  return (
    <div>
      <h2>Income by Category ({props.data.time})</h2>
      <p>{dateRangeText}</p>
      {categoryData.length > 0 ? (
        <PieChart width={400} height={400}>
          <Pie
            data={categoryData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {categoryData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const { name, value, fill } = payload[0];
                return (
                  <div style={{ backgroundColor: "#fff", border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div style={{
                        width: 10,
                        height: 10,
                        backgroundColor: fill,
                        marginRight: 8,
                        borderRadius: "2px"
                      }}></div>
                      <strong>{name}</strong>
                    </div>
                    <div>Amount: ${value.toFixed(2)}</div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend
            verticalAlign="bottom"
            align="center"
            iconType="circle"
            formatter={(value) => <span style={{ textTransform: "capitalize" }}>{value}</span>}
          />
        </PieChart>
      ) : (
        <p>Loading or no data for selected period.</p>
      )}
    </div>
  );
}

export default IncomePieChart;
