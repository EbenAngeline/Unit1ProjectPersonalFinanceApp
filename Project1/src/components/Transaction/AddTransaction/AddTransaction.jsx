import { useState } from "react";
import "./AddTransaction.css";
import Button from "../../Common/Button/Button";

function AddTransaction({
  transactions = [],
  setTransactions,
  onClose,
  editingTransaction = null,
}) {
  const isEditing = Boolean(editingTransaction);
  const [transactionType, setTransactionType] = useState(
    editingTransaction?.type ?? "Expense",
  );
  const [amount, setAmount] = useState(
    editingTransaction ? String(Math.abs(editingTransaction.amount)) : "",
  );
  const [category, setCategory] = useState(editingTransaction?.category ?? "");
  const [description, setDescription] = useState(
    editingTransaction?.description ?? "",
  );
  const [date, setDate] = useState(editingTransaction?.date ?? "");

  const handleSubmit = (event) => {
    event.preventDefault();
    // basic validation
    if (
      !amount ||
      isNaN(Number(amount)) ||
      !category ||
      !description ||
      !date
    ) {
      alert("Please fill in all fields with valid values.");
      return;
    }

    const numericAmount = Math.abs(Number(amount));
    const signedAmount =
      transactionType === "Expense" ? -numericAmount : numericAmount;

    if (isEditing) {
      const updated = transactions.map((transaction) =>
        transaction.id === editingTransaction.id
          ? {
              ...transaction,
              date,
              description,
              category,
              type: transactionType,
              amount: signedAmount,
            }
          : transaction,
      );
      setTransactions(updated);
    } else {
      const nextId =
        transactions && transactions.length
          ? Math.max(...transactions.map((t) => t.id)) + 1
          : 1;

      const newTransaction = {
        id: nextId,
        date,
        description,
        category,
        type: transactionType,
        amount: signedAmount,
      };

      setTransactions([newTransaction, ...(transactions || [])]);
    }

    if (onClose) {
      onClose();
    }
  };
  return (
    <div className="container">
      <div className="add-transaction">
        <h2>{isEditing ? "Edit Transaction" : "Add Transaction"}</h2>
        <p>
          {isEditing
            ? "Update the details for this transaction"
            : "Enter the details below to log a new transaction"}
        </p>

        <form className="transaction-form" onSubmit={handleSubmit}>
          <label className="field-label">Transaction Type</label>
          <div className="radio-buttons">
            <label
              className={`radio-button ${transactionType === "Expense" ? "active" : ""}`}
            >
              <input
                type="radio"
                name="transactionType"
                value="Expense"
                checked={transactionType === "Expense"}
                onChange={() => setTransactionType("Expense")}
              />
              <span>Expense</span>
            </label>

            <label
              className={`radio-button ${transactionType === "Income" ? "active" : ""}`}
            >
              <input
                type="radio"
                name="transactionType"
                value="Income"
                checked={transactionType === "Income"}
                onChange={() => setTransactionType("Income")}
              />
              <span>Income</span>
            </label>
          </div>

          <div className="form-grid">
            <div className="field-group amount">
              <label htmlFor="amount" className="field-label">
                Amount
              </label>
              <div className="input-with-icon">
                <span className="symbol">$</span>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter the Amount"
                />
              </div>
              <p className="helper-text">
                Amounts are always entered as positive numbers.
              </p>
            </div>

            <div className="field-group">
              <label htmlFor="category" className="field-label">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {transactionType === "Expense" && (
                  <>
                    <option value="Groceries">Groceries</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Rent">Rent</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Entertainment">Entertainment</option>
                  </>
                )}

                {transactionType === "Income" && (
                  <>
                    <option value="Salary">Salary</option>
                    <option value="Investment">Investment</option>
                  </>
                )}
              </select>
            </div>

            <div className="field-group description">
              <label htmlFor="description" className="field-label">
                Description
              </label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g Whole Foods Market"
              />
            </div>

            <div className="field-group date">
              <label htmlFor="date" className="field-label">
                Date
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          <div className="form-action">
            <Button
              type="button"
              variant="secondary"
              className="cancel-button"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="save-button">
              {isEditing ? "Save Changes" : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default AddTransaction;
