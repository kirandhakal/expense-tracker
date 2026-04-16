'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import { Transaction, ExpenseCategory, TransactionType } from '@/types';

interface AddTransactionFormProps {
    onAdd: (transaction: Transaction) => void;
}

const categoryOptions = [
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

const typeOptions = [
    { value: 'expense', label: 'Expense' },
    { value: 'income', label: 'Income' },
];

export default function AddTransactionForm({
    onAdd,
}: AddTransactionFormProps) {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState<TransactionType>('expense');
    const [category, setCategory] = useState<ExpenseCategory>('food');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !amount || !date) return;

        const newTransaction: Transaction = {
            id: `txn-${Date.now()}`,
            name: name.trim(),
            amount: parseFloat(amount),
            type,
            category,
            date,
            description: description.trim(),
            accountId: 'acc-personal',
        };

        onAdd(newTransaction);
        setName('');
        setAmount('');
        setDescription('');
        setDate(new Date().toISOString().split('T')[0]);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                    label="Name"
                    placeholder="e.g., Grocery Shopping"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <Input
                    label="Amount"
                    type="number"
                    placeholder="0.00"
                    min="0.01"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Select
                    label="Type"
                    options={typeOptions}
                    value={type}
                    onChange={(e) => setType(e.target.value as TransactionType)}
                />
                <Select
                    label="Category"
                    options={categoryOptions}
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
                />
                <Input
                    label="Date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </div>

            <Input
                label="Description (optional)"
                placeholder="Add a note..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <div className="flex justify-end pt-2">
                <Button type="submit" size="lg">
                    Add Transaction
                </Button>
            </div>
        </form>
    );
}
