'use client';

import { useState, useMemo } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from 'recharts';
import Card from '@/components/ui/Card';
import DateRangeFilter from './DateRangeFilter';
import { Transaction, Member, MemberGroup, TimeRangePreset } from '@/types';
import { categoryColors } from '@/data/mockData';

interface MemberReportSectionProps {
    transactions: Transaction[];
    members: Member[];
    defaultGroups: MemberGroup[];
}

const MEMBER_COLORS = [
    '#4A90A4', '#6B9080', '#A47551', '#8B6F8E',
    '#5B7B8E', '#7A8B6F', '#8E7B6B', '#4A7C6F',
];

export default function MemberReportSection({
    transactions,
    members,
    defaultGroups,
}: MemberReportSectionProps) {
    const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
    const [groups, setGroups] = useState<MemberGroup[]>(defaultGroups);
    const [activeGroup, setActiveGroup] = useState<string | null>(null);
    const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
        start: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
        end: new Date().toISOString().split('T')[0],
    });
    const [showGroupForm, setShowGroupForm] = useState(false);
    const [newGroupName, setNewGroupName] = useState('');
    const [newGroupMembers, setNewGroupMembers] = useState<string[]>([]);
    const [viewMode, setViewMode] = useState<'individual' | 'comparison'>('comparison');

    // Handle date range changes
    const handleRangeChange = (start: string, end: string, _preset: TimeRangePreset) => {
        setDateRange({ start, end });
    };

    // Toggle member selection
    const toggleMember = (memberId: string) => {
        setActiveGroup(null);
        setSelectedMembers((prev) =>
            prev.includes(memberId)
                ? prev.filter((id) => id !== memberId)
                : [...prev, memberId]
        );
    };

    // Apply group
    const applyGroup = (group: MemberGroup) => {
        setActiveGroup(group.id);
        setSelectedMembers(group.memberIds);
    };

    // Create custom group
    const createGroup = () => {
        if (!newGroupName.trim() || newGroupMembers.length === 0) return;
        const newGroup: MemberGroup = {
            id: `grp-${Date.now()}`,
            name: newGroupName.trim(),
            memberIds: newGroupMembers,
            color: MEMBER_COLORS[groups.length % MEMBER_COLORS.length],
        };
        setGroups([...groups, newGroup]);
        setNewGroupName('');
        setNewGroupMembers([]);
        setShowGroupForm(false);
        applyGroup(newGroup);
    };

    // Filter transactions
    const filteredTransactions = useMemo(() => {
        return transactions.filter((txn) => {
            const txnDate = new Date(txn.date);
            const inRange = txnDate >= new Date(dateRange.start) && txnDate <= new Date(dateRange.end);
            const memberMatch = selectedMembers.length === 0 || (txn.memberId && selectedMembers.includes(txn.memberId));
            return inRange && memberMatch;
        });
    }, [transactions, dateRange, selectedMembers]);

    // Per-member breakdown
    const memberBreakdown = useMemo(() => {
        const activeMemberIds = selectedMembers.length > 0 ? selectedMembers : members.map((m) => m.id);
        return activeMemberIds.map((memberId) => {
            const member = members.find((m) => m.id === memberId);
            const memberTxns = filteredTransactions.filter((t) => t.memberId === memberId);
            const income = memberTxns.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
            const expense = memberTxns.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
            return {
                name: member?.name.split(' ')[0] || 'Unknown',
                fullName: member?.name || 'Unknown',
                avatar: member?.avatar || '??',
                income,
                expense,
                net: income - expense,
                memberId,
            };
        }).filter((m) => m.income > 0 || m.expense > 0);
    }, [filteredTransactions, selectedMembers, members]);

    // Category breakdown per member
    const memberCategoryData = useMemo(() => {
        const activeMemberIds = selectedMembers.length > 0 ? selectedMembers : members.map((m) => m.id);
        const categories: Record<string, number> = {};
        filteredTransactions
            .filter((t) => t.type === 'expense' && activeMemberIds.includes(t.memberId || ''))
            .forEach((t) => {
                const cat = t.category.charAt(0).toUpperCase() + t.category.slice(1);
                categories[cat] = (categories[cat] || 0) + t.amount;
            });
        return Object.entries(categories).map(([category, amount]) => ({
            category,
            amount,
            color: categoryColors[category.toLowerCase()] || '#6B7B8E',
        }));
    }, [filteredTransactions, selectedMembers, members]);

    // Total stats
    const totalIncome = memberBreakdown.reduce((s, m) => s + m.income, 0);
    const totalExpense = memberBreakdown.reduce((s, m) => s + m.expense, 0);

    return (
        <div className="mt-6 space-y-5">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-base font-semibold text-[var(--color-text-primary)]">
                        📊 Member Reports
                    </h2>
                    <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                        Individual and group financial insights
                    </p>
                </div>
                <DateRangeFilter onRangeChange={handleRangeChange} />
            </div>

            {/* Member & Group Selector */}
            <Card id="member-selector">
                <div className="space-y-4">
                    {/* Groups */}
                    <div>
                        <p className="text-xs font-medium text-[var(--color-text-muted)] mb-2 uppercase tracking-wider">
                            Quick Groups
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => { setSelectedMembers([]); setActiveGroup(null); }}
                                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${selectedMembers.length === 0
                                        ? 'bg-[var(--color-primary)] text-white shadow-sm'
                                        : 'bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border-light)]'
                                    }`}
                            >
                                👥 All Members
                            </button>
                            {groups.map((group) => (
                                <button
                                    key={group.id}
                                    onClick={() => applyGroup(group)}
                                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${activeGroup === group.id
                                            ? 'text-white shadow-sm'
                                            : 'bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border-light)]'
                                        }`}
                                    style={activeGroup === group.id ? { backgroundColor: group.color } : {}}
                                >
                                    {group.name}
                                </button>
                            ))}
                            <button
                                onClick={() => setShowGroupForm(!showGroupForm)}
                                className="px-3 py-1.5 text-xs font-medium rounded-full bg-[var(--color-surface-hover)] text-[var(--color-text-muted)] hover:bg-[var(--color-border-light)] transition-all border border-dashed border-[var(--color-border)]"
                            >
                                + Custom Group
                            </button>
                        </div>
                    </div>

                    {/* Custom Group Form */}
                    {showGroupForm && (
                        <div className="p-4 bg-[var(--color-bg)] rounded-[var(--radius-md)] border border-[var(--color-border)] space-y-3">
                            <input
                                type="text"
                                value={newGroupName}
                                onChange={(e) => setNewGroupName(e.target.value)}
                                placeholder="Group name (e.g. Me & Wife)"
                                className="w-full px-3 py-2 text-sm bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)]"
                            />
                            <div className="flex flex-wrap gap-2">
                                {members.map((member) => (
                                    <button
                                        key={member.id}
                                        onClick={() => {
                                            setNewGroupMembers((prev) =>
                                                prev.includes(member.id)
                                                    ? prev.filter((id) => id !== member.id)
                                                    : [...prev, member.id]
                                            );
                                        }}
                                        className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full transition-all ${newGroupMembers.includes(member.id)
                                                ? 'bg-[var(--color-primary)] text-white'
                                                : 'bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)]'
                                            }`}
                                    >
                                        <span className="w-4 h-4 rounded-full bg-[var(--color-primary-50)] text-[var(--color-primary)] flex items-center justify-center text-[8px] font-bold">
                                            {member.avatar}
                                        </span>
                                        {member.name.split(' ')[0]}
                                    </button>
                                ))}
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => { setShowGroupForm(false); setNewGroupMembers([]); setNewGroupName(''); }}
                                    className="px-3 py-1.5 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={createGroup}
                                    disabled={!newGroupName.trim() || newGroupMembers.length === 0}
                                    className="px-4 py-1.5 text-xs font-medium bg-[var(--color-primary)] text-white rounded-[var(--radius-md)] hover:bg-[var(--color-primary-dark)] disabled:opacity-50 transition-colors"
                                >
                                    Create Group
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Individual Members */}
                    <div>
                        <p className="text-xs font-medium text-[var(--color-text-muted)] mb-2 uppercase tracking-wider">
                            Individual Members
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {members.map((member) => (
                                <button
                                    key={member.id}
                                    onClick={() => toggleMember(member.id)}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-[var(--radius-md)] text-xs font-medium transition-all duration-200 ${selectedMembers.includes(member.id)
                                            ? 'bg-[var(--color-primary)] text-white shadow-sm'
                                            : 'bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]'
                                        }`}
                                >
                                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold ${selectedMembers.includes(member.id)
                                            ? 'bg-white/20 text-white'
                                            : 'bg-[var(--color-primary-50)] text-[var(--color-primary)]'
                                        }`}>
                                        {member.avatar}
                                    </span>
                                    {member.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* View Mode Toggle */}
                    <div className="flex items-center gap-2 pt-2 border-t border-[var(--color-border-light)]">
                        <span className="text-xs text-[var(--color-text-muted)]">View:</span>
                        <button
                            onClick={() => setViewMode('comparison')}
                            className={`px-3 py-1 text-xs rounded-[var(--radius-sm)] transition-colors ${viewMode === 'comparison'
                                    ? 'bg-[var(--color-primary)] text-white'
                                    : 'text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)]'
                                }`}
                        >
                            Comparison
                        </button>
                        <button
                            onClick={() => setViewMode('individual')}
                            className={`px-3 py-1 text-xs rounded-[var(--radius-sm)] transition-colors ${viewMode === 'individual'
                                    ? 'bg-[var(--color-primary)] text-white'
                                    : 'text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)]'
                                }`}
                        >
                            Individual
                        </button>
                    </div>
                </div>
            </Card>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="card p-4">
                    <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Total Income</p>
                    <p className="text-lg font-bold text-[var(--color-success)]">${totalIncome.toLocaleString()}</p>
                </div>
                <div className="card p-4">
                    <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Total Expense</p>
                    <p className="text-lg font-bold text-[var(--color-danger)]">${totalExpense.toLocaleString()}</p>
                </div>
                <div className="card p-4">
                    <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Net Balance</p>
                    <p className={`text-lg font-bold ${totalIncome - totalExpense >= 0 ? 'text-[var(--color-success)]' : 'text-[var(--color-danger)]'}`}>
                        ${(totalIncome - totalExpense).toLocaleString()}
                    </p>
                </div>
                <div className="card p-4">
                    <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Members</p>
                    <p className="text-lg font-bold text-[var(--color-primary)]">{memberBreakdown.length}</p>
                </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Member Comparison Bar Chart */}
                <Card id="member-comparison-chart">
                    <div className="mb-4">
                        <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                            {viewMode === 'comparison' ? 'Member Comparison' : 'Income vs Expense'}
                        </h3>
                        <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                            Income and expenses by member
                        </p>
                    </div>
                    {memberBreakdown.length > 0 ? (
                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={memberBreakdown} barGap={4}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-light)" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'var(--color-text-muted)', fontSize: 11 }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'var(--color-text-muted)', fontSize: 11 }}
                                    tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'var(--color-surface)',
                                        border: '1px solid var(--color-border)',
                                        borderRadius: 'var(--radius-md)',
                                        boxShadow: 'var(--shadow-md)',
                                        fontSize: '12px',
                                    }}
                                    formatter={(value) => [`$${Number(value).toLocaleString()}`, '']}
                                />
                                <Bar dataKey="income" name="Income" fill="var(--color-success)" radius={[4, 4, 0, 0]} maxBarSize={40} />
                                <Bar dataKey="expense" name="Expense" fill="var(--color-danger)" radius={[4, 4, 0, 0]} maxBarSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex items-center justify-center h-[280px] text-sm text-[var(--color-text-muted)]">
                            No data for selected range
                        </div>
                    )}
                </Card>

                {/* Category Pie Chart */}
                <Card id="member-category-chart">
                    <div className="mb-4">
                        <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                            Spending by Category
                        </h3>
                        <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                            {selectedMembers.length > 0
                                ? `For ${memberBreakdown.map(m => m.name).join(', ')}`
                                : 'All members combined'}
                        </p>
                    </div>
                    {memberCategoryData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={280}>
                            <PieChart>
                                <Pie
                                    data={memberCategoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={55}
                                    outerRadius={90}
                                    paddingAngle={2}
                                    dataKey="amount"
                                    nameKey="category"
                                    stroke="none"
                                >
                                    {memberCategoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'var(--color-surface)',
                                        border: '1px solid var(--color-border)',
                                        borderRadius: 'var(--radius-md)',
                                        boxShadow: 'var(--shadow-md)',
                                        fontSize: '12px',
                                    }}
                                    formatter={(value) => [`$${Number(value).toLocaleString()}`, '']}
                                />
                                <Legend
                                    verticalAlign="bottom"
                                    iconSize={8}
                                    iconType="circle"
                                    formatter={(value) => (
                                        <span style={{ color: 'var(--color-text-secondary)', fontSize: '11px' }}>
                                            {value}
                                        </span>
                                    )}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex items-center justify-center h-[280px] text-sm text-[var(--color-text-muted)]">
                            No expense data for selected range
                        </div>
                    )}
                </Card>
            </div>

            {/* Individual Member Cards (when in individual mode) */}
            {viewMode === 'individual' && memberBreakdown.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {memberBreakdown.map((member, idx) => (
                        <Card key={member.memberId} id={`member-report-${member.memberId}`}>
                            <div className="flex items-center gap-3 mb-3">
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                                    style={{ backgroundColor: MEMBER_COLORS[idx % MEMBER_COLORS.length] }}
                                >
                                    {member.avatar}
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-[var(--color-text-primary)]">
                                        {member.fullName}
                                    </h4>
                                    <p className={`text-xs font-medium ${member.net >= 0 ? 'text-[var(--color-success)]' : 'text-[var(--color-danger)]'}`}>
                                        Net: ${member.net.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-[var(--color-text-muted)]">Income</span>
                                    <span className="font-medium text-[var(--color-success)]">${member.income.toLocaleString()}</span>
                                </div>
                                <div className="w-full h-1.5 bg-[var(--color-border-light)] rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full bg-[var(--color-success)] progress-fill"
                                        style={{ width: `${totalIncome > 0 ? (member.income / totalIncome) * 100 : 0}%` }}
                                    />
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-[var(--color-text-muted)]">Expense</span>
                                    <span className="font-medium text-[var(--color-danger)]">${member.expense.toLocaleString()}</span>
                                </div>
                                <div className="w-full h-1.5 bg-[var(--color-border-light)] rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full bg-[var(--color-danger)] progress-fill"
                                        style={{ width: `${totalExpense > 0 ? (member.expense / totalExpense) * 100 : 0}%` }}
                                    />
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
