import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard/Dashboard";
import HomePage from "./components/HomePage"
import "./App.css";

function App() {
  return (
    <>
      <Dashboard />
      <Footer/>
    </>
  );
}

export default App;
