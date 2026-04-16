import Card from '@/components/ui/Card';
import { DashboardSummary } from '@/types';

interface SummaryCardsProps {
    summary: DashboardSummary;
}

const summaryItems = [
    {
        key: 'totalBalance',
        label: 'Total Balance',
        icon: '💎',
        format: (val: number) => `$${val.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
        color: 'var(--color-primary)',
        bgColor: 'var(--color-primary-50)',
    },
    {
        key: 'totalIncome',
        label: 'Total Income',
        icon: '📈',
        format: (val: number) => `$${val.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
        color: 'var(--color-success)',
        bgColor: 'var(--color-success-light)',
    },
    {
        key: 'totalExpense',
        label: 'Total Expense',
        icon: '📉',
        format: (val: number) => `$${val.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
        color: 'var(--color-danger)',
        bgColor: 'var(--color-danger-light)',
    },
    {
        key: 'totalSavings',
        label: 'Savings',
        icon: '🏦',
        format: (val: number) => `$${val.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
        color: 'var(--color-info)',
        bgColor: 'var(--color-info-light)',
    },
];

export default function SummaryCards({ summary }: SummaryCardsProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {summaryItems.map((item) => (
                <Card key={item.key} id={`summary-${item.key}`}>
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <p className="text-sm text-[var(--color-text-muted)] mb-1">
                                {item.label}
                            </p>
                            <p
                                className="text-2xl font-bold leading-tight"
                                style={{ color: item.color }}
                            >
                                {item.format(summary[item.key as keyof DashboardSummary])}
                            </p>
                            {item.key === 'totalBalance' && (
                                <p className="text-xs mt-1.5 text-[var(--color-success)] font-medium">
                                    ↑ {summary.monthlyChange}% from last month
                                </p>
                            )}
                        </div>
                        <div
                            className="w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center text-lg flex-shrink-0"
                            style={{ backgroundColor: item.bgColor }}
                        >
                            {item.icon}
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}
