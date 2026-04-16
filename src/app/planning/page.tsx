'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import GoalCard from '@/components/features/GoalCard';
import { mockGoals } from '@/data/mockData';
import { FinancialGoal, GoalStatus } from '@/types';

const statusFilterOptions = [
    { value: 'all', label: 'All Goals' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
    { value: 'paused', label: 'Paused' },
];

const categoryOptions = [
    { value: 'savings', label: 'Savings' },
    { value: 'technology', label: 'Technology' },
    { value: 'travel', label: 'Travel' },
    { value: 'home', label: 'Home' },
    { value: 'education', label: 'Education' },
    { value: 'other', label: 'Other' },
];

export default function PlanningPage() {
    const [goals, setGoals] = useState<FinancialGoal[]>(mockGoals);
    const [showForm, setShowForm] = useState(false);
    const [statusFilter, setStatusFilter] = useState('all');

    // Form
    const [title, setTitle] = useState('');
    const [targetAmount, setTargetAmount] = useState('');
    const [deadline, setDeadline] = useState('');
    const [category, setCategory] = useState('savings');
    const [description, setDescription] = useState('');

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !targetAmount || !deadline) return;

        const newGoal: FinancialGoal = {
            id: `goal-${Date.now()}`,
            title: title.trim(),
            targetAmount: parseFloat(targetAmount),
            currentAmount: 0,
            deadline,
            status: 'active',
            category,
            description: description.trim(),
        };

        setGoals([newGoal, ...goals]);
        setTitle('');
        setTargetAmount('');
        setDeadline('');
        setDescription('');
        setShowForm(false);
    };

    const filtered =
        statusFilter === 'all'
            ? goals
            : goals.filter((g) => g.status === statusFilter);

    const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0);
    const totalSaved = goals.reduce((sum, g) => sum + g.currentAmount, 0);
    const activeGoals = goals.filter((g) => g.status === 'active').length;
    const completedGoals = goals.filter((g) => g.status === 'completed').length;

    return (
        <DashboardLayout pageTitle="Financial Planning">
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card>
                    <p className="text-sm text-[var(--color-text-muted)]">Total Goals</p>
                    <p className="text-xl font-bold text-[var(--color-text-primary)] mt-1">
                        {goals.length}
                    </p>
                </Card>
                <Card>
                    <p className="text-sm text-[var(--color-text-muted)]">Active</p>
                    <p className="text-xl font-bold text-[var(--color-warning)] mt-1">
                        {activeGoals}
                    </p>
                </Card>
                <Card>
                    <p className="text-sm text-[var(--color-text-muted)]">Completed</p>
                    <p className="text-xl font-bold text-[var(--color-success)] mt-1">
                        {completedGoals}
                    </p>
                </Card>
                <Card>
                    <p className="text-sm text-[var(--color-text-muted)]">Total Saved</p>
                    <p className="text-xl font-bold text-[var(--color-primary)] mt-1">
                        ${totalSaved.toLocaleString()}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                        of ${totalTarget.toLocaleString()} target
                    </p>
                </Card>
            </div>

            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 text-sm bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)]"
                    aria-label="Filter by status"
                >
                    {statusFilterOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>

                <button
                    onClick={() => setShowForm(!showForm)}
                    className="ml-auto px-4 py-2 text-sm font-medium rounded-[var(--radius-md)] bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition-colors"
                >
                    {showForm ? 'Cancel' : '+ New Goal'}
                </button>
            </div>

            {/* Add Goal Form */}
            {showForm && (
                <Card className="mb-6" id="add-goal-form">
                    <h2 className="text-base font-semibold text-[var(--color-text-primary)] mb-4">
                        Create Financial Goal
                    </h2>
                    <form onSubmit={handleAdd} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input
                                label="Goal Title"
                                placeholder="e.g., Emergency Fund"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                            <Input
                                label="Target Amount"
                                type="number"
                                placeholder="10000"
                                min="1"
                                value={targetAmount}
                                onChange={(e) => setTargetAmount(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Select
                                label="Category"
                                options={categoryOptions}
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                            <Input
                                label="Deadline"
                                type="date"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                                required
                            />
                        </div>
                        <Input
                            label="Description"
                            placeholder="Describe your goal..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <div className="flex justify-end pt-2">
                            <Button type="submit" size="lg">
                                Create Goal
                            </Button>
                        </div>
                    </form>
                </Card>
            )}

            {/* Goals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filtered.map((goal) => (
                    <GoalCard key={goal.id} goal={goal} />
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-[var(--color-text-muted)]">
                        No goals found. Create your first financial goal!
                    </p>
                </div>
            )}
        </DashboardLayout>
    );
}
