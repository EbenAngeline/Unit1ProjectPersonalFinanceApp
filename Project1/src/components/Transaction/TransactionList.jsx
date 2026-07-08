import React from "react";
import TransactionItem from "./TransactionItem";

function TransactionList({ transactions }) {
  return (
    <div className="transaction-list">
      <table>
        <thead>
          <tr>
            <th> DATE</th>
            <th>DESCRIPTION</th>
            <th> CATEGORY</th>
            <th> TYPE</th>
            <th> AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default TransactionList;
