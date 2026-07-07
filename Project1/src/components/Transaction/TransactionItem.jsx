import React from "react";
function TransactionItem({Transaction}){
const amountClass= Transaction.type ==='Income'? 'income-amount': 'expense-amount';

return(
    <tr>
        <td>{transaction.date}</td>
        <td>{transaction.description}</td>
        <td>transaction.category</td>
        <td>transaction.type</td>
        <td className={amountClass}>{transaction.amount.toFixed(2)}</td>
        <td className="action"></td>
    </tr>
);
}
export default TransactionItem;
