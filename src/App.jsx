// import React from 'react';
// import Header from './Components/Header';
// import Footer from "./Components/Footer";
// import CodeEditor from './Components/Codeeditor';
// import Stopwatch from './Components/Stopwatch';

// function App() {
//   return (
//   <>
//     <Header />
//     <Stopwatch></Stopwatch>

//   <CodeEditor></CodeEditor> run dev
//   <Footer />
//   </>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import Main from './Components/Main';
import TransactionList from './Components/TransactionList';
import AddTransaction from './Components/AddTransaction';
import ChartComponent from './Components/ChartComponent';
import './Components/css/ExpenseTracker.css'; 

function App() {
  const [transactions, setTransactions] = useState(
    JSON.parse(localStorage.getItem('transactions')) || []
  );

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions([transaction, ...transactions]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((trx) => trx.id !== id));
  };

  return (
    <div className="container">
      <Main transactions={transactions} />
      <TransactionList transactions={transactions} onDelete={deleteTransaction} />
      <AddTransaction onAdd={addTransaction} />
      {/* <ChartComponent transactions={transactions} /> */}
    </div>
  );
}

export default App;
