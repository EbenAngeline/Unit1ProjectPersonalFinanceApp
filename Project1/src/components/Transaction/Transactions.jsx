import React,{useState} from 'react';
import TransactionList from './TransactionList';
function Transactions({ transactions = [] }){
    
    const[searchTerm,setSearchTerm]=useState('');
    const [SelectedCategory,setSelectedCategory]=useState('All categories');
    const [selectedType,setSelectedType]=useState('All Types');
    const[sortBy,setSortBy]=useState('Date');
    const category = ['All categories','Groceries','Income','Transportation','Entertainment','Utilities'];
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
const handleSortChange = (event) =>{
        setSortBy(event.target.value);
};
const filteredTransactions = transactions.filter(transaction => {
    const desc = (transaction.description || '').toString().toLowerCase();
    const matchesSearch = desc.includes(searchTerm.toLowerCase());
    const matchesCategory = SelectedCategory === 'All categories' || transaction.category === SelectedCategory;
    const matchesType = selectedType === 'All Types' || transaction.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortBy === 'Date') {
      
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === 'Amount') {
      return b.amount - a.amount; // Sort by amount descending
    }
    return 0;
  });
    return(
    <div className='container'>
            <h1>Transactions</h1>
            <p> All income and expense and Activity</p>
            <div className='controlbar'>
            <input type="text"placeholder='Search..'value={searchTerm} onChange={handleSearchChange}/></div>
            <select value={SelectedCategory} onChange={handleCategoryChange}>
                {category.map(cat=>(<option key={cat} value={cat}>{cat}</option>))}
            </select>
            <select value={selectedType} onChange={handleTypeChange}>
                {types.map(type=>(<option key={type} value={type}>{type}</option>))}
            </select>
            <div className='sort'>
                <label>Sort:</label>
                <select value={sortBy} onChange={handleSortChange}>
                    {sortOptions.map(option=> (<option key={option} value={option}>{option}</option>))}
                </select>
            </div>
            
             
                <TransactionList transactions={sortedTransactions}/>

        </div>
    );
}
    export default Transactions;