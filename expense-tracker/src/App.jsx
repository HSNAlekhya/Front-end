import { useState } from "react";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");

  const addExpense = (e) => {
    e.preventDefault();

    if (!title.trim() || !amount || !date) {
      return;
    }

    const newExpense = {
      id: Date.now(),
      title: title.trim(),
      amount: Number(amount),
      category,
      date,
    };

    setExpenses((previousExpenses) => [
      newExpense,
      ...previousExpenses,
    ]);

    setTitle("");
    setAmount("");
    setCategory("Food");
    setDate("");
  };

  const deleteExpense = (id) => {
    setExpenses((previousExpenses) =>
      previousExpenses.filter(
        (expense) => expense.id !== id
      )
    );
  };

  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  return (
    <div className="expense-page">

      <div className="expense-container">

        {/* Header */}

        <header className="expense-header">

          <div className="header-icon">
            💰
          </div>

          <div>
            <h1>Expense Tracker</h1>
            <p>
              Track your expenses and manage your spending
            </p>
          </div>

        </header>

        {/* Summary Cards */}

        <div className="summary-grid">

          <div className="summary-card total-card">

            <div className="summary-icon">
              💵
            </div>

            <div>
              <p>Total Expenses</p>

              <h2>
                ₹{totalExpenses.toFixed(2)}
              </h2>
            </div>

          </div>

          <div className="summary-card">

            <div className="summary-icon">
              🧾
            </div>

            <div>
              <p>Number of Expenses</p>

              <h2>
                {expenses.length}
              </h2>
            </div>

          </div>

          <div className="summary-card">

            <div className="summary-icon">
              📊
            </div>

            <div>
              <p>Average Expense</p>

              <h2>
                ₹
                {expenses.length > 0
                  ? (
                      totalExpenses /
                      expenses.length
                    ).toFixed(2)
                  : "0.00"}
              </h2>
            </div>

          </div>

        </div>

        {/* Add Expense */}

        <div className="expense-form-card">

          <h2>Add New Expense</h2>

          <form onSubmit={addExpense}>

            <div className="form-grid">

              <div className="input-group">

                <label>Expense Name</label>

                <input
                  type="text"
                  placeholder="e.g. Grocery shopping"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                />

              </div>

              <div className="input-group">

                <label>Amount</label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) =>
                    setAmount(e.target.value)
                  }
                />

              </div>

              <div className="input-group">

                <label>Category</label>

                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                >
                  <option>Food</option>
                  <option>Transport</option>
                  <option>Shopping</option>
                  <option>Entertainment</option>
                  <option>Bills</option>
                  <option>Health</option>
                  <option>Other</option>
                </select>

              </div>

              <div className="input-group">

                <label>Date</label>

                <input
                  type="date"
                  value={date}
                  onChange={(e) =>
                    setDate(e.target.value)
                  }
                />

              </div>

            </div>

            <button
              type="submit"
              className="add-expense-button"
            >
              + Add Expense
            </button>

          </form>

        </div>

        {/* Expense List */}

        <div className="expense-list-section">

          <div className="list-header">

            <div>
              <h2>Recent Expenses</h2>

              <p>
                {expenses.length === 0
                  ? "No expenses added yet."
                  : `${expenses.length} ${
                      expenses.length === 1
                        ? "expense"
                        : "expenses"
                    } recorded`}
              </p>
            </div>

            <div className="expense-count">
              {expenses.length}
            </div>

          </div>

          {expenses.length === 0 ? (

            <div className="empty-state">

              <div className="empty-icon">
                🧾
              </div>

              <h3>No Expenses Yet</h3>

              <p>
                Add your first expense using
                the form above.
              </p>

            </div>

          ) : (

            <div className="expense-list">

              {expenses.map((expense) => (

                <div
                  className="expense-item"
                  key={expense.id}
                >

                  <div className="expense-category-icon">
                    {expense.category === "Food"
                      ? "🍔"
                      : expense.category === "Transport"
                      ? "🚗"
                      : expense.category === "Shopping"
                      ? "🛍️"
                      : expense.category ===
                        "Entertainment"
                      ? "🎬"
                      : expense.category === "Bills"
                      ? "📄"
                      : expense.category === "Health"
                      ? "❤️"
                      : "📌"}
                  </div>

                  <div className="expense-details">

                    <h3>
                      {expense.title}
                    </h3>

                    <div className="expense-meta">

                      <span>
                        {expense.category}
                      </span>

                      <span>
                        📅 {expense.date}
                      </span>

                    </div>

                  </div>

                  <div className="expense-amount">
                    -₹{expense.amount.toFixed(2)}
                  </div>

                  <button
                    className="delete-button"
                    onClick={() =>
                      deleteExpense(expense.id)
                    }
                    aria-label="Delete expense"
                  >
                    🗑️
                  </button>

                </div>

              ))}

            </div>

          )}

        </div>

        <p className="footer">
          Built with React and Vite
        </p>

      </div>

    </div>
  );
}

export default App;