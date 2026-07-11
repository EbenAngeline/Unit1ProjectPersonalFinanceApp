import mockTransactions, { budgetLimits } from "../../Database/MockData";

const BudgetCategory = ({ categoryName, limit, spent, remaining, status }) => {
  const isOverBudget = status === "OverBudget";
  const isUnderBudget = status === "Remaining";

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
            Remaining:${remaining.toLocaleString()}
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

const BudgetManagement = ({ transactions = mockTransactions }) => {
  const budgetCategories = Object.entries(budgetLimits).map(([name, limit]) => {
    const expenses = transactions.filter(
      (transaction) =>
        transaction.category === name && transaction.type === "Expense",
    );
    const spent = expenses.reduce(
      (total, transaction) => total + Math.abs(transaction.amount),
      0,
    );
    const remaining = limit - spent;
    const status =
      remaining < 0 ? "OverBudget" : remaining === 0 ? "Used" : "Remaining";

    return { name, limit, spent, remaining, status };
  });

  const totalBudget = budgetCategories.reduce(
    (sum, item) => sum + item.limit,
    0,
  );
  const totalSpent = budgetCategories.reduce(
    (sum, item) => sum + item.spent,
    0,
  );
  const budgetPeriod = "Monthly";
  const overallProgress = (totalSpent / totalBudget) * 100;

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
              style={{ width: `${Math.min(overallProgress, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      <main className="budget">
        <h3>Budget Categories</h3>
        <div className="categories">
          {budgetCategories.map((cat, index) => (
            <BudgetCategory
              key={`${cat.name}-${index}`}
              categoryName={cat.name}
              limit={cat.limit}
              spent={cat.spent}
              remaining={cat.remaining}
              status={cat.status}
            />
          ))}
        </div>
      </main>
    </div>
  );
};
export default BudgetManagement;
