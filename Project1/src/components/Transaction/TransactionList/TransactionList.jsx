import Table from "../../Common/Table/Table";
import Button from "../../Common/Button/Button";

function TransactionList({ transactions, onEdit, onDelete }) {
  const columns = [
    { key: "date", label: "Date" },
    { key: "description", label: "Description" },
    { key: "category", label: "Category" },
    { key: "type", label: "Type" },
    {
      key: "amount",
      label: "Amount",
      cellClassName: (transaction) =>
        transaction.type === "Income" ? "income-amount" : "expense-amount",
      render: (transaction) => transaction.amount.toFixed(2),
    },
    {
      key: "actions",
      label: "Actions",
      render: (transaction) => (
        <div className="row-actions">
          <Button
            type="button"
            variant="secondary"
            className="row-action-btn"
            onClick={() => onEdit(transaction)}
          >
            Edit
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="row-action-btn row-action-btn--danger"
            onClick={() => onDelete(transaction)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Table
      className="transaction-table"
      columns={columns}
      rows={transactions}
      getRowKey={(transaction) => transaction.id}
      emptyMessage="No transactions match your filters."
    />
  );
}
export default TransactionList;
