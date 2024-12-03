import React, { useState } from 'react';
// import './ExpenseTracker.css'; 

function AddTransaction({ onAdd }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      id: Math.random(),
      name,
      amount: parseFloat(amount),
      date,
      type,
    };
    onAdd(newTransaction);
    setName('');
    setAmount('');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name: <input type="text" value={name} onChange={(e) => setName(e.target.value)} required /></label>
      <label>Amount: <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required /></label>
      <label>Type: 
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </label>
      <label>Date: <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required /></label>
      <button type="submit">Add Transaction</button>
    </form>
  );
}

export default AddTransaction;
