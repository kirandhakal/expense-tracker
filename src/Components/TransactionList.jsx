import React from 'react';

function TransactionList({ transactions, onDelete }) {
  return (
    <ul>
      {transactions.length > 0 ? (
        transactions.map((trx) => (
          <li key={trx.id}>
            <div>
              <h4>{trx.name}</h4>
              <p>{new Date(trx.date).toLocaleDateString()}</p>
            </div>
            <div>
              <span>{trx.type === 'income' ? '+' : '-'}{trx.amount}</span>
              <button onClick={() => onDelete(trx.id)}>Delete</button>
            </div>
          </li>
        ))
      ) : (
        <p>No transactions</p>
      )}
    </ul>
  );
}

export default TransactionList;
