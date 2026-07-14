import TransactionItem from "../TransactionItem/TransactionItem";

function TransactionList({ transactions }) {
  return (
    <div className="data-table transaction-list" role="table">
      <div className="data-row data-row--header transaction-row" role="row">
        <span role="columnheader">Date</span>
        <span role="columnheader">Description</span>
        <span role="columnheader">Category</span>
        <span role="columnheader">Type</span>
        <span role="columnheader">Amount</span>
      </div>
      {transactions.map((transaction) => (
        <TransactionItem key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
}
export default TransactionList;
