'use client';

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
import { CategoryBreakdown, MonthlyData } from '@/types';

interface BarChartProps {
    data: MonthlyData[];
}

interface PieChartProps {
    data: CategoryBreakdown[];
}

export function MonthlyBarChart({ data }: BarChartProps) {
    return (
        <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-light)" vertical={false} />
                <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }}
                />
                <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
                />
                <Tooltip
                    contentStyle={{
                        backgroundColor: 'var(--color-surface)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-md)',
                        boxShadow: 'var(--shadow-md)',
                        fontSize: '13px',
                    }}
                    formatter={(value) => [`$${Number(value).toLocaleString()}`, '']}
                    cursor={{ fill: 'var(--color-border-light)' }}
                />
                <Bar
                    dataKey="income"
                    name="Income"
                    fill="var(--color-success)"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={32}
                />
                <Bar
                    dataKey="expense"
                    name="Expense"
                    fill="var(--color-primary-light)"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={32}
                />
            </BarChart>
        </ResponsiveContainer>
    );
}

export function ExpensePieChart({ data }: PieChartProps) {
    return (
        <ResponsiveContainer width="100%" height={280}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="amount"
                    nameKey="category"
                    stroke="none"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip
                    contentStyle={{
                        backgroundColor: 'var(--color-surface)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-md)',
                        boxShadow: 'var(--shadow-md)',
                        fontSize: '13px',
                    }}
                    formatter={(value) => [`$${Number(value).toLocaleString()}`, '']}
                />
                <Legend
                    verticalAlign="bottom"
                    iconSize={8}
                    iconType="circle"
                    formatter={(value) => (
                        <span style={{ color: 'var(--color-text-secondary)', fontSize: '12px' }}>
                            {value}
                        </span>
                    )}
                />
            </PieChart>
        </ResponsiveContainer>
    );
}
