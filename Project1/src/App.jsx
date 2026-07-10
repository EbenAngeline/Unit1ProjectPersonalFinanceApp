import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Common/Header";
import HomePage from "./components/Home/Home";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Dashboard from "./components/Dashboard/Dashboard";
import Budget from "./components/Budget/Budget";
import Transactions from "./components/Transaction/Transactions";
import AddTransaction from "./components/Transaction/AddTransaction/AddTransaction";
import mockTransactions from "./Database/MockData";

function App() {
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = sessionStorage.getItem("transactions");

    if (savedTransactions) {
      try {
        return JSON.parse(savedTransactions);
      } catch {
        return mockTransactions;
      }
    }

    return mockTransactions;
  });

  const updateTransactions = (nextTransactions) => {
    setTransactions(nextTransactions);
    sessionStorage.setItem("transactions", JSON.stringify(nextTransactions));
  };

  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/dashboard"
          element={<Dashboard transactions={transactions} />}
        />
        <Route
          path="/budget"
          element={<Budget transactions={transactions} />}
        />
        <Route
          path="/transactions"
          element={
            <>
              <Transactions transactions={transactions} />
              <AddTransaction
                transactions={transactions}
                setTransactions={updateTransactions}
              />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
