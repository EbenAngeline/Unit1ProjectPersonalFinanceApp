import React, { useState } from "react";
import MockData from './MockData';
import categories from "./MockData";
const BudgetCategory = ({ categoryName, limit, spent, remaining, status }) => {
  const isOverBudget = status === "OverBudget";
  const isUnderBudget = status === "Remaining";
  //const [deletButton,setDeleteButton]=useState("Delete");
  //const [editButton,setEditButton]=useState();

  return (
    <div
      className={`budget-category ${isOverBudget ? "over-budget" : ""} ${isUnderBudget ? "under-budget" : ""}`}
    >
      <div className=" category">
        <h3>{categoryName}</h3>
      </div>
      <div className="category-detail">
        <div className="detail">
          <span className="label">Limit:</span>
          <span className="value"> ${limit.toLocaleString()}</span>
        </div>
        <div className="detail">
          <span className="label">Spent:</span>
          <span className="value"> ${spent.toLocaleString()}</span>
        </div>
        <div className="detail">
          <span className="label">Remaining:</span>
          <span className="value"> ${remaining.toLocaleString()}</span>
        </div>
      </div>
      <div className="category-status">
        {isOverBudget && (
          <span className="status-over">
            Over by: ${Math.abs(remaining).toLocaleString()}
          </span>
        )}
        {isUnderBudget && (
          <span className="status-remaining">
            {" "}
            Remaining:${remaining.toLocalString()}
          </span>
        )}
      </div>
      <div className="progress">
        <div
          className="progress-bar"
          style={{ width: `${(spent / limit) * 100}` }}
        ></div>
      </div>
      <div className="usage">
        {Math.round((spent / limit) * 100)}% {status}
      </div>
    </div>
  );
};

const BudgetManagement = () => {
  const totalBudget = 2450.0;
  const totalSpent = 1540.15;
  const budgetPeriod = "Monthly";
  const overallProgress = (totalSpent / totalBudget) * 100;
  const mock_categories = categories
 
  return (
    <div className="budget">
      <div className="budget-summary">
        <div className="summary-item">
          <span className="label">Total Monthly Budget : </span>
          <span className="value">{totalBudget.toLocaleString()}</span>
        </div>
        <div className="summary-item">
          <span className="label">Budget period : </span>
          <span className="value">{budgetPeriod}</span>
        </div>
        <div className="summary-item">
          <span className="label">Total Spent :</span>
          <span className="value">
            {totalSpent.toLocaleString()}({Math.round(overallProgress)}%)
          </span>
        </div>
        <div className="summary-overall">
          <span className="label">OverAll Progress : </span>
          <div className="progress-bar">
            <div
              className="progress-bar"
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
        </div>
      </div>

      <main className="budget">
        <h3>Budget Categories</h3>
        <div className="categories">
          {mock_categories.map((cat, index) => (
            <BudgetCategory
              key={index}
              categoryName={cat.name}
              limit={cat.limit}
              spent={cat.spent}
              remaining={cat.remaining}
              status={
                cat.remaining >= 0
                  ? cat.remaining == 0
                    ? "used"
                    : "remaining"
                  : "over Budget"
              }
            />
          ))}
        </div>
      </main>
    </div>
  );
};
export default BudgetManagement;
