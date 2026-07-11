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

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <div className="dashboard">
        <div className="box">
          <h2>Current Balance</h2>
          <p>${currentBalance.toLocaleString()}</p>
        </div>
        <div className="box">
          <h2>Total Expenses</h2>
          <p>${totalExpenses.toLocaleString()}</p>
        </div>
        <div className="box">
          <h2>Total Income</h2>
          <p>${totalIncome.toLocaleString()}</p>
        </div>
        <br />
      </div>

      {/* This div must be below the dashboard div otherswise it will try to to put both of them on the same row */}
      <div className="transaction-card">
        <h2> Transactions</h2>
        <table className="description">
          <thead>
            <tr>
              <th colSpan={"2"}>Description</th>
              <th colSpan={"2"}>Type</th>
              <th colSpan={"2"}> Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((item) => (
              <tr key={item.id}>
                <td colSpan={"2"}> {item.description}</td>
                <td colSpan={"2"}> {item.type}</td>
                <td colSpan={"2"}> {item.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Dashboard;
