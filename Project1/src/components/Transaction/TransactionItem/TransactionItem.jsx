function TransactionItem({ transaction }) {
  const amountClass =
    transaction.type === "Income" ? "income-amount" : "expense-amount";

  return (
    <div className="data-row transaction-row" role="row">
      <span role="cell">{transaction.date}</span>
      <span role="cell">{transaction.description}</span>
      <span role="cell">{transaction.category}</span>
      <span role="cell">{transaction.type}</span>
      <span role="cell" className={amountClass}>
        {transaction.amount.toFixed(2)}
      </span>
    </div>
  );
}
export default TransactionItem;
