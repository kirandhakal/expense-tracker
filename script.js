const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
const graph = JSON.parse(localStorage.getItem("graph")) || [];

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "NRP",
  signDisplay: "always",
});

const list = document.getElementById("transactionList");
const form = document.getElementById("transactionForm");
const status = document.getElementById("status");
const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");

form.addEventListener("submit", addTransaction);

function updateTotal() {
  const incomeTotal = transactions
    .filter((trx) => trx.type === "income")
    .reduce((total, trx) => total + trx.amount, 0);

  const expenseTotal = transactions
    .filter((trx) => trx.type === "expense")
    .reduce((total, trx) => total + trx.amount, 0);

  const balanceTotal = incomeTotal - expenseTotal;

  balance.textContent = formatter.format(balanceTotal).substring(1);
  income.textContent = formatter.format(incomeTotal);
  expense.textContent = formatter.format(expenseTotal * -1);
}

function renderList() {
  list.innerHTML = "";

  status.textContent = "";
  if (transactions.length === 0) {
    status.textContent = "No transactions.";
    return;
  }

  transactions.forEach(({ id, name, amount, date, type }) => {
    const sign = "income" === type ? 1 : -1;

    const li = document.createElement("li");

    li.innerHTML = `
      <div class="name">
        <h4>${name}</h4>
        <p>${new Date(date).toLocaleDateString()}</p>
      </div>

      <div class="amount ${type}">
        <span>${formatter.format(amount * sign)}</span>
      </div>
    
      <div class="action">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" onclick="deleteTransaction(${id})">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    `;

    list.appendChild(li);
  });
}

renderList();
updateTotal();

function deleteTransaction(id) {
  const index = transactions.findIndex((trx) => trx.id === id);
  transactions.splice(index, 1);

  updateTotal();
  saveTransactions();
  renderList();
}

function addTransaction(e) {
  e.preventDefault();

  const formData = new FormData(this);

  transactions.push({
    id: transactions.length + 1,
    name: formData.get("name"),
    amount: parseFloat(formData.get("amount")),
    date: new Date(formData.get("date")),
    type: "on" === formData.get("type") ? "income" : "expense",
  });

  this.reset();

  updateTotal();
  saveTransactions();
  renderList();
}

function saveTransactions() {
  transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

  localStorage.setItem("transactions", JSON.stringify(transactions));
  localStorage.setItem("graph", JSON.stringify(graph));

}
//////////////////////////////////////// for graph//////////////////////////////////////////
// const expense1=document.getElementById("expense").value;
// const list1 = document.getElementById("transactionList").value;
// const value1=20;
// const value2=20;
// const value3=20;
// var xValues = [];
// var yValues = ["$list1"];
// var barColors = ["red",'red',"green"];
// yValues.push(expense1, value2, value3);
// xValues.push("list1","education","other","");

// new Chart("myChart", {
//   type: "bar",
//   data: {
//     labels: xValues,
//     datasets: [{
//       backgroundColor: barColors,
//       data: yValues
//     }]
//   },
//   options: {
//     legend: {display: false},
//     title: {
//       display: true,
//       text: "montly expenses"
//     }
//   }
// });
let labels = [];
let values = [];

function addData() {
    const labelInput = document.getElementById('name').value;
    const valueInput = document.getElementById('amount').value;

    if (labelInput && valueInput) {
        labels.push(labelInput);
        values.push(Number(valueInput));

        // Clear the input fields
        document.getElementById('label').value = '';
        document.getElementById('amount').value = '';
    } else {
        alert('Please enter both label and value.');
    }
}

function generateChart() {
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
         // You can change the chart type here
        data: {
            labels: labels,
            datasets: [{
                label: 'My Dataset',
                data: values,
                backgroundColor: 'rgb(75, 192, 192,)',
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    addData();
}
