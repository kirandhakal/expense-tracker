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
    RadialBarChart,
    RadialBar,
} from 'recharts';
import Card from '@/components/ui/Card';
import DateRangeFilter from './DateRangeFilter';
import { FinancialGoal, TimeRangePreset } from '@/types';

interface PlanningChartsProps {
    goals: FinancialGoal[];
}

const CHART_COLORS = [
    '#4A90A4', '#6B9080', '#A47551', '#8B6F8E',
    '#5B7B8E', '#7A8B6F', '#8E7B6B', '#4A7C6F',
    '#C0544F', '#B8863B',
];

const categoryEmoji: Record<string, string> = {
    savings: '💰',
    technology: '💻',
    travel: '✈️',
    home: '🏠',
    education: '📚',
};

export default function PlanningCharts({ goals }: PlanningChartsProps) {
    const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
        start: new Date(new Date().getFullYear(), 0, 1).toISOString().split('T')[0],
        end: new Date().toISOString().split('T')[0],
    });
    const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

    const handleRangeChange = (start: string, end: string, _preset: TimeRangePreset) => {
        setDateRange({ start, end });
    };

    // Filter goals by deadline within date range
    const filteredGoals = useMemo(() => {
        return goals.filter((g) => {
            const deadline = new Date(g.deadline);
            return deadline >= new Date(dateRange.start) && deadline <= new Date(dateRange.end + 'T23:59:59');
        });
    }, [goals, dateRange]);

    // Show all goals if date filtering returns empty (to avoid blank state)
    const displayGoals = filteredGoals.length > 0 ? filteredGoals : goals;

    // Goal progress data for bar chart  
    const progressData = displayGoals.map((g) => ({
        name: g.title.length > 12 ? g.title.substring(0, 12) + '...' : g.title,
        fullName: g.title,
        target: g.targetAmount,
        saved: g.currentAmount,
        remaining: Math.max(0, g.targetAmount - g.currentAmount),
        percentage: Math.round((g.currentAmount / g.targetAmount) * 100),
    }));

    // Status distribution pie
    const statusData = useMemo(() => {
        const counts: Record<string, number> = { active: 0, completed: 0, paused: 0 };
        displayGoals.forEach((g) => { counts[g.status]++; });
        return [
            { name: 'Active', value: counts.active, color: '#B8863B' },
            { name: 'Completed', value: counts.completed, color: '#3B8A6E' },
            { name: 'Paused', value: counts.paused, color: '#7B8794' },
        ].filter((d) => d.value > 0);
    }, [displayGoals]);

    // Category breakdown
    const categoryData = useMemo(() => {
        const cats: Record<string, { target: number; saved: number }> = {};
        displayGoals.forEach((g) => {
            const cat = g.category.charAt(0).toUpperCase() + g.category.slice(1);
            if (!cats[cat]) cats[cat] = { target: 0, saved: 0 };
            cats[cat].target += g.targetAmount;
            cats[cat].saved += g.currentAmount;
        });
        return Object.entries(cats).map(([category, data], idx) => ({
            category,
            target: data.target,
            saved: data.saved,
            color: CHART_COLORS[idx % CHART_COLORS.length],
        }));
    }, [displayGoals]);

    // Radial chart for individual goal
    const selectedGoalData = useMemo(() => {
        if (!selectedGoal) return null;
        const goal = goals.find((g) => g.id === selectedGoal);
        if (!goal) return null;
        const pct = Math.round((goal.currentAmount / goal.targetAmount) * 100);
        return {
            ...goal,
            percentage: pct,
            radialData: [{ name: goal.title, value: pct, fill: pct >= 100 ? '#3B8A6E' : '#4A90A4' }],
        };
    }, [selectedGoal, goals]);

    const totalTarget = displayGoals.reduce((s, g) => s + g.targetAmount, 0);
    const totalSaved = displayGoals.reduce((s, g) => s + g.currentAmount, 0);
    const overallPct = totalTarget > 0 ? Math.round((totalSaved / totalTarget) * 100) : 0;

    return (
        <div className="space-y-5">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-base font-semibold text-[var(--color-text-primary)]">
                        📈 Planning Reports
                    </h2>
                    <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                        Visual progress of your financial goals
                    </p>
                </div>
                <DateRangeFilter onRangeChange={handleRangeChange} />
            </div>

            {/* Overall Progress Bar */}
            <Card id="overall-progress">
                <div className="flex items-center justify-between mb-3">
                    <div>
                        <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                            Overall Goal Progress
                        </h3>
                        <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                            ${totalSaved.toLocaleString()} saved of ${totalTarget.toLocaleString()} target
                        </p>
                    </div>
                    <span className={`text-2xl font-bold ${overallPct >= 100 ? 'text-[var(--color-success)]' : 'text-[var(--color-primary)]'}`}>
                        {overallPct}%
                    </span>
                </div>
                <div className="w-full h-3 bg-[var(--color-border-light)] rounded-full overflow-hidden">
                    <div
                        className="h-full rounded-full progress-fill"
                        style={{
                            width: `${Math.min(overallPct, 100)}%`,
                            background: overallPct >= 100
                                ? 'var(--color-success)'
                                : 'linear-gradient(90deg, var(--color-primary), var(--color-primary-light))',
                        }}
                    />
                </div>
            </Card>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Goal Progress Bar Chart */}
                <Card id="goal-progress-chart">
                    <div className="mb-4">
                        <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                            Goal Progress
                        </h3>
                        <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                            Saved vs Target for each goal
                        </p>
                    </div>
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={progressData} barGap={4}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-light)" vertical={false} />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: 'var(--color-text-muted)', fontSize: 10 }}
                                interval={0}
                                angle={-15}
                                textAnchor="end"
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: 'var(--color-text-muted)', fontSize: 11 }}
                                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'var(--color-surface)',
                                    border: '1px solid var(--color-border)',
                                    borderRadius: 'var(--radius-md)',
                                    boxShadow: 'var(--shadow-md)',
                                    fontSize: '12px',
                                }}
                                formatter={(value, name) => [`$${Number(value).toLocaleString()}`, name === 'saved' ? 'Saved' : 'Remaining']}
                            />
                            <Bar dataKey="saved" name="Saved" fill="var(--color-success)" radius={[4, 4, 0, 0]} maxBarSize={35} stackId="a" />
                            <Bar dataKey="remaining" name="Remaining" fill="var(--color-border)" radius={[4, 4, 0, 0]} maxBarSize={35} stackId="a" />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>

                {/* Status Distribution */}
                <Card id="goal-status-chart">
                    <div className="mb-4">
                        <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                            Goal Status Distribution
                        </h3>
                        <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                            Active, completed, and paused goals
                        </p>
                    </div>
                    <ResponsiveContainer width="100%" height={280}>
                        <PieChart>
                            <Pie
                                data={statusData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={95}
                                paddingAngle={3}
                                dataKey="value"
                                nameKey="name"
                                stroke="none"
                            >
                                {statusData.map((entry, index) => (
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
                            />
                            <Legend
                                verticalAlign="bottom"
                                iconSize={8}
                                iconType="circle"
                                formatter={(value) => (
                                    <span style={{ color: 'var(--color-text-secondary)', fontSize: '12px' }}>{value}</span>
                                )}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </Card>

                {/* Category Breakdown */}
                <Card id="goal-category-chart">
                    <div className="mb-4">
                        <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                            Goals by Category
                        </h3>
                        <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                            Target and saved amounts by category
                        </p>
                    </div>
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={categoryData} barGap={4} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-light)" horizontal={false} />
                            <XAxis
                                type="number"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: 'var(--color-text-muted)', fontSize: 11 }}
                                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                            />
                            <YAxis
                                type="category"
                                dataKey="category"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: 'var(--color-text-muted)', fontSize: 11 }}
                                width={80}
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
                            <Bar dataKey="saved" name="Saved" fill="var(--color-primary)" radius={[0, 4, 4, 0]} maxBarSize={20} />
                            <Bar dataKey="target" name="Target" fill="var(--color-border)" radius={[0, 4, 4, 0]} maxBarSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>

                {/* Individual Goal Detail */}
                <Card id="goal-individual-detail">
                    <div className="mb-4">
                        <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                            Individual Goal Detail
                        </h3>
                        <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                            Select a goal to view progress
                        </p>
                    </div>

                    {/* Goal Selector */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {goals.map((goal) => (
                            <button
                                key={goal.id}
                                onClick={() => setSelectedGoal(selectedGoal === goal.id ? null : goal.id)}
                                className={`px-2.5 py-1 text-[11px] font-medium rounded-full transition-all ${selectedGoal === goal.id
                                        ? 'bg-[var(--color-primary)] text-white'
                                        : 'bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border-light)]'
                                    }`}
                            >
                                {categoryEmoji[goal.category] || '🎯'} {goal.title}
                            </button>
                        ))}
                    </div>

                    {/* Goal Progress */}
                    {selectedGoalData ? (
                        <div className="flex flex-col items-center">
                            <ResponsiveContainer width="100%" height={180}>
                                <RadialBarChart
                                    cx="50%"
                                    cy="50%"
                                    innerRadius="60%"
                                    outerRadius="90%"
                                    barSize={12}
                                    data={selectedGoalData.radialData}
                                    startAngle={180}
                                    endAngle={0}
                                >
                                    <RadialBar
                                        background={{ fill: 'var(--color-border-light)' }}
                                        dataKey="value"
                                        cornerRadius={6}
                                    />
                                </RadialBarChart>
                            </ResponsiveContainer>
                            <div className="text-center -mt-8">
                                <p className="text-3xl font-bold text-[var(--color-text-primary)]">
                                    {selectedGoalData.percentage}%
                                </p>
                                <p className="text-xs text-[var(--color-text-muted)] mt-1">
                                    ${selectedGoalData.currentAmount.toLocaleString()} / ${selectedGoalData.targetAmount.toLocaleString()}
                                </p>
                                <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                                    Due: {new Date(selectedGoalData.deadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-[200px] text-sm text-[var(--color-text-muted)]">
                            Click a goal above to see details
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
}
