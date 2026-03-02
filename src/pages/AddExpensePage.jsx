import React, { useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "../client";
import "./AddEntryPage.css";

function AddExpensePage() {
  const { uid } = useParams(); // Extract the userID from the URL

  const [log, setLog] = useState({
    description: "",
    amount: 0,
    date: "",
    category: "Food", // Default category set to 'Food'
  });

  const expenseCategories = [
    "Food",
    "Transport",
    "Utilities",
    "Entertainment",
    "Health",
    "Other",
  ];

  const createPost = async (event) => {
    event.preventDefault();
    console.log("Creating post with data:", log);

    // Validate that the amount is negative
    if (log.amount >= 0) {
      console.error("Amount must be negative for expenses.");
      alert("Amount must be a negative number for expenses.");
      return; // Stop the form submission
    }

    const { data, error } = await supabase.from("Transactions Log").insert({
      description: log.description,
      amount: log.amount,
      date: log.date,
      category: log.category,
    });

    if (error) {
      console.error("Error inserting data:", error.message);
    } else {
      console.log("Data inserted successfully:", data);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLog((prevLog) => ({
      ...prevLog,
      [name]: value,
    }));
  };

  return (
    <section className="entry-page">
      <div className="entry-card">
        <h1>Add Expense</h1>
        <p className="entry-subtitle">Use negative amounts for expenses so totals stay balanced.</p>
        <form onSubmit={createPost} className="entry-form">
          <div className="entry-field">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={log.description}
            required
            onChange={handleChange}
          />
          </div>
          <div className="entry-field">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={log.amount}
            required
            onChange={handleChange}
          />
          </div>
          <div className="entry-field">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={log.date}
            required
            onChange={handleChange}
          />
          </div>
          <div className="entry-field">
          <label htmlFor="category">Category:</label>
          <select
            name="category"
            id="category"
            value={log.category}
            onChange={handleChange}
          >
            {expenseCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          </div>
          <button type="submit" className="entry-submit">
            Add Expense
          </button>
        </form>
      </div>
    </section>
  );
}

export default AddExpensePage;
