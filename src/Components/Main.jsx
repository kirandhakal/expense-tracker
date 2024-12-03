import React from 'react';

function Main({ transactions }) {
  const income = transactions.filter(trx => trx.type === 'income').reduce((acc, trx) => acc + trx.amount, 0);
  const expense = transactions.filter(trx => trx.type === 'expense').reduce((acc, trx) => acc + trx.amount, 0);
  const balance = income - expense;

  return (
    <header>
      <div>
        <h5>Total Balance</h5>
        <span>{balance.toFixed(2)}</span>
      </div>
      <div>
        <h5>Income</h5>
        <span>{income.toFixed(2)}</span>
      </div>
      <div>
        <h5>Expense</h5>
        <span>{expense.toFixed(2)}</span>
      </div>
    </header>
  );
}

export default Main;
