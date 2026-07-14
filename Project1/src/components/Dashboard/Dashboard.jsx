import { Link } from "react-router-dom";
import "./Dashboard.css";
import mockTransactions from "../../Database/MockData";

function Dashboard({ transactions = mockTransactions }) {
  const totalIncome = transactions
    .filter((item) => item.type === "Income")
    .reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = transactions
    .filter((item) => item.type === "Expense")
    .reduce((sum, item) => sum + Math.abs(item.amount), 0);
  const currentBalance = totalIncome - totalExpenses;
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="dashboard-page">
      <section className="dashboard-hero">
        <div>
          <h1>Dashboard</h1>
          <p className="hero-text">
            A simple view of your balance and recent transactions.
          </p>
        </div>
      </section>

      <section className="dashboard-grid">
        <article className="box">
          <p className="box-label">Balance</p>
          <h2 className={currentBalance >= 0 ? "positive" : "negative"}>
            ${currentBalance.toLocaleString()}
          </h2>
        </article>
        <article className="box">
          <p className="box-label">Expenses</p>
          <h2>${totalExpenses.toLocaleString()}</h2>
        </article>
        <article className="box">
          <p className="box-label">Income</p>
          <h2>${totalIncome.toLocaleString()}</h2>
        </article>
      </section>

      <section className="transaction-card">
        <div className="transaction-card-header">
          <h2>Recent activity</h2>
          <Link className="view-all-link" to="/transactions">
            View all
          </Link>
        </div>

        <div className="data-table" role="table">
          <div className="data-row data-row--header activity-row" role="row">
            <span role="columnheader">Description</span>
            <span role="columnheader">Type</span>
            <span role="columnheader">Amount</span>
          </div>
          {recentTransactions.map((item) => (
            <div className="data-row activity-row" role="row" key={item.id}>
              <span role="cell">{item.description}</span>
              <span role="cell">
                <span className={`type-pill ${item.type.toLowerCase()}`}>
                  {item.type}
                </span>
              </span>
              <span
                role="cell"
                className={`amount-cell ${item.type === "Income" ? "income" : "expense"}`}
              >
                ${Math.abs(item.amount).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
export default Dashboard;
