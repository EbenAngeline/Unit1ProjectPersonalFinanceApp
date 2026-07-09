import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import About from "./components/About";
import Contact from "./components/Contact";
import Dashboard from "./components/Dashboard/Dashboard";
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
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/transactions"
          element={
            <>
              <Transactions transactions={transactions} />
              <AddTransaction
                transactions={transactions}
                setTransactions={setTransactions}
              />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
