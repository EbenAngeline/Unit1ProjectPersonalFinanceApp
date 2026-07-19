import { useState } from "react";
import "./AddTransaction.css";
import Button from "../../Common/Button/Button";

function getTodayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function AddTransaction({
  transactions = [],       //Current list of transactions.
  setTransactions,       //Function used to update the transaction list.
  onClose,                   //Function that closes the popup or modal.
  editingTransaction = null,   //If adding a new one: If editing an existing transaction, this contains its data.
}) {
  const isEditing = Boolean(editingTransaction);
  const [transactionType, setTransactionType] = useState(
    editingTransaction?.type ?? "Expense",  // ?-If editingTransaction exists, read its type.??Use the value on the left unless it is null or undefined.  
  );
  const [amount, setAmount] = useState(
    editingTransaction ? String(Math.abs(editingTransaction.amount)) : "",  //Expenses are stored as negative numbers.
  );
  const [category, setCategory] = useState(editingTransaction?.category ?? "");//stores category
  const [description, setDescription] = useState(                   //stores description
    editingTransaction?.description ?? "",
  );
  const [date, setDate] = useState(editingTransaction?.date ?? ""); //stores date
  const todayISO = getTodayISO();  //Calls the helper function.
  const handleSubmit = (event) =>{     
    event.preventDefault();             //Normally forms refresh the page.This stops that behavior.

    const numericAmount = Math.abs(Number(amount)); //Number() converts it into
    const signedAmount =
      transactionType === "Expense" ? -numericAmount : numericAmount;

    if (isEditing) {
      const updated = transactions.map((transaction) =>  //map() goes through every transaction.
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
      setTransactions(updated);  //Updates the state.
    } else {
      const nextId =
        transactions && transactions.length
          ? Math.max(...transactions.map((t) => t.id)) + 1
          : 1;                //If no transactions exist, Start with id 1

      const newTransaction = {
        id: nextId,
        date,
        description,
        category,
        type: transactionType,
        amount: signedAmount,
      };

      setTransactions([newTransaction, ...(transactions || [])]);  //The new transaction appears at the top of the list.
    }

    if (onClose) {
      onClose();    //Close the Form
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
                value="Expense"
                name="transactionType"
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
                  min="0.01" //Cannot enter zero or negative values.
                  step="0.01"  //Allows decimal amounts.
                  required
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
                required
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
                required
                value={description}  //This tells React which option should currently be selected.
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
                required
                max={todayISO}
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
