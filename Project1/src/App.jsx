import { useState } from "react";
import "./App.css";
import Sidebar from "./components/Transaction/Sidebar";
import Transactions from "./components/Transaction/Transactions";
import AddTransaction from "./components/AddDeleteTransaction/AddTransaction";

function App() {
  const [transactions, setTransactions] = useState(() => {
    try {
      const stored = localStorage.getItem("transactions");
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });

  return (
    <div>
      <Sidebar />

      <Transactions transactions={transactions} />
      <AddTransaction
        transactions={transactions}
        setTransactions={setTransactions}
      />
    </div>
  );
}

export default App;
