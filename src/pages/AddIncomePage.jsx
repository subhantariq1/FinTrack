import React from "react";
import { useState } from "react";
import supabase from "../client";
import { useParams } from "react-router-dom";
import "./AddEntryPage.css";

function AddIncomePage() {
  const { uid } = useParams(); // Extract the userID from the URL

  const [log, setLog] = useState({
    description: "",
    amount: 0,
    date: "",
    category: "", // Default category set to 'Food'
  });

  const incomeCategories = ["Salary", "Investment", "Freelance", "Other"];

  const createPost = async (event) => {
    event.preventDefault();

    // Validate that the amount is positive
    if (log.amount <= 0) {
      console.error("Amount must be positive.");
      alert("Amount must be a positive number.");
      return; // Stop the form submission
    }

    console.log("Creating post with data:", log);
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
    window.location = "/dashboard/" + uid; // Redirect to dashboard after successful insertion
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLog((prevLog) => ({
      ...prevLog,
      [name]: value,
    }));
    console.log("Creating post with data:", log);
  };

  return (
    <section className="entry-page">
      <div className="entry-card">
        <h1>Add Income</h1>
        <p className="entry-subtitle">Log positive cash flow to keep your reports accurate.</p>
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
            {incomeCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          </div>
          <button type="submit" className="entry-submit">
            Add Income
          </button>
        </form>
      </div>
    </section>
  );
}

export default AddIncomePage;
