import React, { useState } from "react";
import "./Transaction.css";
import TransactionList from "./TransactionList/TransactionList";
import AddTransaction from "./AddTransaction/AddTransaction";
import mockTransactions from "../../Database/MockData";

function Transactions({ transactions = mockTransactions, setTransactions }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [SelectedCategory, setSelectedCategory] = useState("All categories");
  const [selectedType, setSelectedType] = useState("All Types");
  const [sortBy, setSortBy] = useState("Date");
  const category = [
    "All categories",
    ...new Set(transactions.map((transaction) => transaction.category)),
  ];
  const types = ["All Types", "Income", "Expense"];
  const sortOptions = ["Date", "Amount"];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };
  const filteredTransactions = transactions.filter((transaction) => {
    const desc = (transaction.description || "").toString().toLowerCase();
    const matchesSearch = desc.includes(searchTerm.toLowerCase());
    const matchesCategory =
      SelectedCategory === "All categories" ||
      transaction.category === SelectedCategory;
    const matchesType =
      selectedType === "All Types" || transaction.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortBy === "Date") {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === "Amount") {
      return b.amount - a.amount; // Sort by amount descending
    }
    return 0;
  });
  return (
    <div className="transactions-page">
      <div className="transactions-header">
        <div>
          <h1>Transactions</h1>
          <p className="page-subtitle">
            A simple view of your income, expenses, and activity.
          </p>
        </div>
        <button className="add-btn" onClick={() => setIsModalOpen(true)}>
          + Add transaction
        </button>
      </div>

      <div className="controls">
        <input
          type="text"
          placeholder="Search transactions"
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <select value={SelectedCategory} onChange={handleCategoryChange}>
          {category.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select value={selectedType} onChange={handleTypeChange}>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <div className="sort">
          <label>Sort</label>
          <select value={sortBy} onChange={handleSortChange}>
            {sortOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="transaction-card">
        <TransactionList transactions={sortedTransactions} />
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <AddTransaction
              transactions={transactions}
              setTransactions={setTransactions}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
export default Transactions;
