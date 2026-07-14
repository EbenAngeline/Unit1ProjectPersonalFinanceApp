import "./Budget.css";
import mockTransactions, { budgetLimits } from "../../Database/MockData";

const BudgetCategory = ({ categoryName, limit, spent, remaining, status }) => {
  const isOverBudget = status === "OverBudget";
  const isUnderBudget = status === "Remaining";
  const usagePercent =
    limit > 0
      ? Math.min(Math.max(Math.round((spent / limit) * 100), 0), 100)
      : 0;
  const remainingPercent = Math.max(100 - usagePercent, 0);

  return (
    <div className="budget-category">
      <div className="category-title">
        <h3>{categoryName}</h3>
      </div>
      <div className="category-detail">
        <div className="detail">
          <span className="label">Limit</span>
          <span className="value">${limit.toLocaleString()}</span>
        </div>
        <div className="detail">
          <span className="label">Spent</span>
          <span className="value">${spent.toLocaleString()}</span>
        </div>
        <div className="detail">
          <span className="label">Remaining</span>
          <span className="value">${remaining.toLocaleString()}</span>
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
            {remainingPercent}% remaining
          </span>
        )}
      </div>
      <div className="progress-track">
        <div
          className="progress-bar"
          style={{ width: `${usagePercent}%` }}
        ></div>
      </div>
      <div className="usage">{usagePercent}% used</div>
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
  const overallProgress =
    totalBudget > 0
      ? Math.min(Math.max(Math.round((totalSpent / totalBudget) * 100), 0), 100)
      : 0;

  return (
    <div className="budget-page">
      <section className="page-header">
        <h1>Budget</h1>
        <h3 className="page-subtitle">
          {" "}
          A simple view of your monthly limits and spending progress.
        </h3>
      </section>

      <section className="budget-summary">
        <div className="summary-item">
          <span className="label">Total Monthly Budget</span>
          <span className="value">${totalBudget.toLocaleString()}</span>
        </div>
        <div className="summary-item">
          <span className="label">Budget period</span>
          <span className="value">{budgetPeriod}</span>
        </div>
        <div className="summary-item">
          <span className="label">Total spent</span>
          <span className="value">
            ${totalSpent.toLocaleString()} ({overallProgress}%)
          </span>
        </div>
        <div className="summary-overall">
          <span className="label">Overall progress</span>
          <div className="progress-track">
            <div
              className="progress-bar"
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
        </div>
      </section>

      <section className="budget-section">
        <div className="section-title-row">
          <h2>Budget categories</h2>
        </div>
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
      </section>
    </div>
  );
};
export default BudgetManagement;
