'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import TransactionList from '@/components/features/TransactionList';
import AddTransactionForm from '@/components/features/AddTransactionForm';
import { mockTransactions } from '@/data/mockData';
import { Transaction, ExpenseCategory } from '@/types';

const categoryFilterOptions: { value: string; label: string }[] = [
    { value: 'all', label: 'All Categories' },
    { value: 'food', label: 'Food & Groceries' },
    { value: 'bills', label: 'Bills & Utilities' },
    { value: 'savings', label: 'Savings' },
    { value: 'transport', label: 'Transport' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'health', label: 'Health' },
    { value: 'education', label: 'Education' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'rent', label: 'Rent' },
    { value: 'other', label: 'Other' },
];

export default function ExpensesPage() {
    const [transactions, setTransactions] =
        useState<Transaction[]>(mockTransactions);
    const [showForm, setShowForm] = useState(false);
    const [filterCategory, setFilterCategory] = useState<string>('all');
    const [filterType, setFilterType] = useState<string>('all');

    const addTransaction = (txn: Transaction) => {
        setTransactions([txn, ...transactions]);
        setShowForm(false);
    };

    const deleteTransaction = (id: string) => {
        setTransactions(transactions.filter((t) => t.id !== id));
    };

    const filtered = transactions.filter((txn) => {
        const matchCategory =
            filterCategory === 'all' || txn.category === filterCategory;
        const matchType = filterType === 'all' || txn.type === filterType;
        return matchCategory && matchType;
    });

    const totalIncome = transactions
        .filter((t) => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = transactions
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    return (
        <DashboardLayout pageTitle="Expenses">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <Card>
                    <p className="text-sm text-[var(--color-text-muted)]">
                        Total Transactions
                    </p>
                    <p className="text-xl font-bold text-[var(--color-text-primary)] mt-1">
                        {transactions.length}
                    </p>
                </Card>
                <Card>
                    <p className="text-sm text-[var(--color-text-muted)]">Total Income</p>
                    <p className="text-xl font-bold text-[var(--color-success)] mt-1">
                        +${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </p>
                </Card>
                <Card>
                    <p className="text-sm text-[var(--color-text-muted)]">
                        Total Expense
                    </p>
                    <p className="text-xl font-bold text-[var(--color-danger)] mt-1">
                        -${totalExpense.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </p>
                </Card>
            </div>

            {/* Add Transaction */}
            <Card className="mb-6" id="add-transaction-section">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-semibold text-[var(--color-text-primary)]">
                        {showForm ? 'Add New Transaction' : 'New Transaction'}
                    </h2>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="px-4 py-1.5 text-sm font-medium rounded-[var(--radius-md)] transition-colors bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]"
                    >
                        {showForm ? 'Cancel' : '+ Add'}
                    </button>
                </div>
                {showForm && <AddTransactionForm onAdd={addTransaction} />}
            </Card>

            {/* Filters */}
            <Card padding="sm" className="mb-5" id="expense-filters">
                <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                        Filter:
                    </span>
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="px-3 py-1.5 text-sm bg-[var(--color-bg)] border border-[var(--color-border)] rounded-[var(--radius-md)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)]"
                        aria-label="Filter by type"
                    >
                        <option value="all">All Types</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="px-3 py-1.5 text-sm bg-[var(--color-bg)] border border-[var(--color-border)] rounded-[var(--radius-md)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)]"
                        aria-label="Filter by category"
                    >
                        {categoryFilterOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                    <span className="ml-auto text-xs text-[var(--color-text-muted)]">
                        {filtered.length} result{filtered.length !== 1 ? 's' : ''}
                    </span>
                </div>
            </Card>

            {/* Transaction List */}
            <Card padding="none" id="transaction-list">
                <div className="px-2 py-3 md:px-3">
                    <TransactionList
                        transactions={filtered}
                        showActions
                        onDelete={deleteTransaction}
                    />
                </div>
            </Card>
        </DashboardLayout>
    );
}
