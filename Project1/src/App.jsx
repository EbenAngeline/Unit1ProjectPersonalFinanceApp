import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Common/Header/Header";
import Footer from "./components/Common/Footer/Footer";
import PageLoader from "./components/Common/PageLoader/PageLoader";
import HomePage from "./components/Home/Home";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Dashboard from "./components/Dashboard/Dashboard";
import Budget from "./components/Budget/Budget";
import Transactions from "./components/Transaction/Transactions";
import mockTransactions from "./Database/MockData";
function App() {
  const [transactions, setTransactions] = useState(() => {    //Instead of passing a value directly, it passes a function:
    const savedTransactions = sessionStorage.getItem("transactions");  //sessionStorage already contain transaction data
    if (savedTransactions) {    //Data inside sessionStorage is always stored as a string.
      try {
        return JSON.parse(savedTransactions);   //converts the string back into a JavaScript object or array.
      } catch {
        return mockTransactions;
      }
    }

    return mockTransactions;
  });

  const updateTransactions = (nextTransactions) => {
    setTransactions(nextTransactions);
    sessionStorage.setItem("transactions", JSON.stringify(nextTransactions));//This saves the updated list into sessionStorage.
  };

  return (
    <div className="app-shell">
      <PageLoader />
      <Header />

      <div className="app-content">
        <main className="app-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/dashboard"
              element={<Dashboard transactions={transactions} />}//This sends the transaction data to the Dashboard component as a prop.
            />
            <Route
              path="/budget"
              element={<Budget transactions={transactions} />} //Budget receives the transaction list.
            />
            <Route
              path="/transactions"
              element={
                <Transactions
                  transactions={transactions}  //Current list.
                  setTransactions={updateTransactions}  //Saves the updated data to sessionStorage.
                />
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
