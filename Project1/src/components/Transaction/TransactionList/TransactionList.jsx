import Table from "../../Common/Table/Table";
import Button from "../../Common/Button/Button";

function TransactionList({ transactions, onEdit, onDelete }) {
  return (
    <Table
      className="transaction-table"
      headers={["Date", "Description", "Category", "Type", "Amount", "Actions"]}
    >
      {transactions.length === 0 ? (
        <tr>
          <td className="table-empty" colSpan={6}>
            No transactions match your filters.
          </td>
        </tr>
      ) : (
        transactions.map((transaction) => (
          <tr key={transaction.id}>
            <td>{transaction.date}</td>
            <td>{transaction.description}</td>
            <td>{transaction.category}</td>
            <td>{transaction.type}</td>
            <td
              className={
                transaction.type === "Income"
                  ? "income-amount"
                  : "expense-amount"
              }
            >
              {transaction.amount.toFixed(2)}
            </td>
            <td>
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
            </td>
          </tr>
        ))
      )}
    </Table>
  );
}
export default TransactionList;
