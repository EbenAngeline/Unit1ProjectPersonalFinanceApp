import React from 'react'
function Sidebar()
{
    return (
        < div className="Sidebar">
            <div className='logo'>$ BUDGETLY</div>
            <nav>
                <ul>
                    <li><i className="alt"></i>Dashboard</li>
                    <li className='active'><i className='alt'></i>Transactions</li>
                    <li> <i className='alt'></i>Budget</li> 
                        
                            
                        
                    
                </ul>
            </nav>
        </div>
    );
}
export default Sidebar;