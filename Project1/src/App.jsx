import { useState } from "react";
import "./App.css";
import Sidebar from "./components/Transaction/Sidebar";
import Transactions from "./components/Transaction/Transactions";


function App() {
  const [transactions, setTransactions] = useState([
    { id: 1, date: 'Jul 02, 2026', description: 'Whole Foods Market', category: 'Groceries', type: 'Expense', amount: -64.20 },
    { id: 2, date: 'Jul 01, 2026', description: 'Paycheck - Acme Inc.', category: 'Income', type: 'Income', amount: 2450.00 },
    { id: 3, date: 'Jun 30, 2026', description: 'Shell Gas Station', category: 'Transportation', type: 'Expense', amount: -41.10 },
    { id: 4, date: 'Jun 29, 2026', description: 'Netflix Subscription', category: 'Entertainment', type: 'Expense', amount: -15.99 },
    { id: 5, date: 'Jun 28, 2026', description: 'Electric Company', category: 'Utilities', type: 'Expense', amount: -98.40 },
  ]);
  return (
    <div>
    <Sidebar/>
    <Transactions transactions={transactions}/>
  </div>
  )
}

export default App;
