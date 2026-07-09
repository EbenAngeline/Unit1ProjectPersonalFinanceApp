import React, { useState } from "react";
function AddTransaction({ transactions = [], setTransactions }) {
  const [transactionType, setTransactionType] = useState("Expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const handleSave = () => {
    // basic validation
    if (
      !amount ||
      isNaN(Number(amount)) ||
      !category ||
      !description ||
      !date
    ) {
      alert("Please fill in all fields with valid values.");
      return;
    }

    const numericAmount = Math.abs(Number(amount));
    const signedAmount =
      transactionType === "Expense" ? -numericAmount : numericAmount;

    const nextId =
      transactions && transactions.length
        ? Math.max(...transactions.map((t) => t.id)) + 1
        : 1;

    const newTransaction = {
      id: nextId,
      date,
      description,
      category,
      type: transactionType,
      amount: signedAmount,
    };

    const updated = [newTransaction, ...(transactions || [])];
    setTransactions(updated);
    try {
      localStorage.setItem("transactions", JSON.stringify(updated));
    } catch (e) {
      console.warn("Could not persist transactions to localStorage", e);
    }

    // reset form
    setTransactionType("Expense");
    setAmount("");
    setCategory("");
    setDescription("");
    setDate("");
  };
  return (
    <>
      {" "}
      <div className="add-transaction">
        <h2>Add Transaction</h2>
        <p>Enter the details below to log a new transaction</p>
      </div>
      <div className="transaction-form">
        <label> Transaction Type</label>
      </div>
      <div className=" radio-buttons">
        <label>
          <input
            type="radio"
            name="transactionType"
            value="Expense"
            checked={transactionType === "Expense"}
            onChange={() => setTransactionType("Expense")}
          />
        </label>
        <label
          className={`radio-button ${transactionType === "Expense" ? " active" : ""}`}
          onClick={() => setTransactionType("Expense")}
        >
          Expense
        </label>

        <label>
          <input
            type="radio"
            name="transactionType"
            value="Income"
            checked={transactionType === "Income"}
            onChange={() => setTransactionType("Income")}
          />
        </label>

        <label
          className={`radio-button ${transactionType === "Income" ? " active" : ""}`}
          onClick={() => setTransactionType("Income")}
        >
          Income
        </label>

        <p>Choose Expense or Income first</p>
      </div>
      <div className="amount">
        <label htmlFor="amount"> Amount</label>
        <div className="input">
          <span className="symbol">$</span>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter the Amount"
          />
        </div>
        <p> Amounts are always entered as positive numbers.</p>
      </div>
      <div className="category-section"></div>
      <label htmlFor="category">CATEGORY</label>
      <select
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="category"> Select Category</option>
        {transactionType === "Expense" && (
          <>
            <option value="Groceries">Groceries</option>
            <option value="Utilities">Utilities</option>
            <option value="Rent">Rent</option>
            <option value="Transportation">Transportation</option>
            <option value="Entertainment">Entertainment</option>
          </>
        )}

        {transactionType === "Income" && (
          <>
            <option value="Salary"> Salary</option>
            <option value="Investmaent">Investment</option>
          </>
        )}
      </select>
      <div className="description">
        <label htmlFor="description">DESCRIPTION</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g Whole Foods Market"
        />
      </div>
      <div className="date">
        <label htmlFor="date">DATE</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="form-action">
        <button className="cancel-button">Cancel</button>
        <button className="save-button" onClick={handleSave}>
          Save{" "}
        </button>
      </div>
    </>
  );
}
export default AddTransaction;
