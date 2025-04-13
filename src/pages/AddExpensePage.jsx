import React from "react";

function AddExpensePage() {
  return (
    <div>
      <h1>Add Expense</h1>
      <form>
        <div>
          <label htmlFor="description">Description:</label>
          <input type="text" id="description" name="description" required />
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input type="number" id="amount" name="amount" required />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" name="date" required />
        </div>
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
}

export default AddExpensePage;