const balanceEl = document.getElementById("balance");
const transactionsEl = document.getElementById("transactions");
const form = document.getElementById("transaction-form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const type = document.getElementById("type");

let transactions = [];
let chart;

// Update balance and chart
function updateUI() {
  let income = transactions
    .filter(t => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  let expense = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  let balance = income - expense;
  balanceEl.textContent = `₹${balance}`;
  balanceEl.className = balance >= 0 ? "text-success" : "text-danger";

  // Update chart
  updateChart(income, expense);
}

// Add transaction to list
function renderTransactions() {
  transactionsEl.innerHTML = "";
  transactions.forEach((t, index) => {
    const li = document.createElement("li");
    li.classList.add("list-group-item", t.type);
    li.innerHTML = `
      ${t.text} <span>₹${t.amount}</span>
      <button class="btn btn-sm btn-danger" onclick="deleteTransaction(${index})">X</button>
    `;
    transactionsEl.appendChild(li);
  });
}

// Add transaction
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const transaction = {
    text: text.value,
    amount: +amount.value,
    type: type.value
  };
  transactions.push(transaction);
  text.value = "";
  amount.value = "";
  renderTransactions();
  updateUI();
});

// Delete transaction
function deleteTransaction(index) {
  transactions.splice(index, 1);
  renderTransactions();
  updateUI();
}

// Chart.js
function updateChart(income, expense) {
  const ctx = document.getElementById("expenseChart").getContext("2d");
  if (chart) chart.destroy(); // Destroy old chart
  chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Income", "Expense"],
      datasets: [{
        data: [income, expense],
        backgroundColor: ["#28a745", "#dc3545"]
      }]
    }
  });
}

// Init
updateUI();
