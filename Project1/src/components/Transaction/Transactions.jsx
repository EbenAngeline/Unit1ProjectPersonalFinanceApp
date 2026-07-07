import React,{useState} from 'react';
import TransactionList from './TransactionList';
function Transactions({transactions}){
    const[searchTerm,setSearchTerm]=useState('');
    const [SelectedCategory,setSelectedCategory]=useState('All categories');
    const [selectedType,setSelectedType]=useState('All Type');
    const[sortBy,setSortBy]=useState('Date');
    const category = ['All categories','Grocerious','Income','Transportation','Entertainment','Utilities'];
    const types =['All Types','Income','Expense'];
    const sortOptions=['Date','Amount'];
    const handleSearchChange = (event) =>{
        setSearchTerm(event.target.value);
};
const handleCategoryChange = (event) =>{
        setSelectedCategory(event.target.value);
};
const handleTypeChange = (event) =>{
        setSelectedType(event.target.value);
};
const handleSortChange = (event) =>{}
        setSortBy(event.target.value);
};
//Filtering
const list = transactions.filter((t) => {
      return (
        t.description.toLowerCase().includes(search.toLowerCase()) &&
        (category === "All Categories" || t.category === category) &&
        (type === "All Types" || t.type === type)
      );

    })
    //sorting
    .sort((a, b) => {
      if (sort === "Amount") {
       return b.amount - a.amount;
      }
      return new Date(b.date) - new Date(a.date);
    });
    return(
        <div className="transactions-conatiner">
            <h1>Transactions</h1>
            <p> All income and expense and Activity</p><input type="text"placeholder='Search..'value={search} onChange={(e)=>setSearchTerm(e.target.value)}/>
            <select onChange={(e)=>setSelectedCategory(e.target.value)}>
                <option>All Categories</option>
                <option>Groceries</option>
                <option>Income</option>
                <option>Transportation</option>
                <option>Entertainment</option>
                <option>Utilities</option>
                </select>
                <select onChange={(e)=>setSelectedType(e.target.value)}>
                    <option> All Types</option>
                    <option>Income</option>
                    <option> Expense</option>

                </select>
                <select onChange={(e)=>setSortBy(e.target.value)}>
                    <option> Date</option>
                    <option>Amount</option>
                    
                </select>
                <button> Add Transaction</button>
                <TransactionList transactions={list}/>

        </div>
    );
    export default Transactions;



