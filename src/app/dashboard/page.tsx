'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import SummaryCards from '@/components/features/SummaryCards';
import TransactionList from '@/components/features/TransactionList';
import { MonthlyBarChart, ExpensePieChart } from '@/components/features/Charts';
import MemberReportSection from '@/components/features/MemberReportSection';
import Card from '@/components/ui/Card';
import {
    mockDashboardSummary,
    mockTransactions,
    mockMembers,
    monthlyData,
    categoryBreakdown,
    defaultMemberGroups,
} from '@/data/mockData';
import Link from 'next/link';

export default function DashboardPage() {
    return (
        <DashboardLayout pageTitle="Dashboard">
            {/* Summary Cards */}
            <SummaryCards summary={mockDashboardSummary} />

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">
                {/* Monthly Overview */}
                <Card id="chart-monthly">
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <h2 className="text-base font-semibold text-[var(--color-text-primary)]">
                                Monthly Overview
                            </h2>
                            <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                                Income vs Expenses trend
                            </p>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
                            <div className="flex items-center gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-sm bg-[var(--color-success)]" />
                                Income
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-sm bg-[var(--color-primary-light)]" />
                                Expense
                            </div>
                        </div>
                    </div>
                    <MonthlyBarChart data={monthlyData} />
                </Card>

                {/* Expense Distribution */}
                <Card id="chart-expenses">
                    <div className="mb-5">
                        <h2 className="text-base font-semibold text-[var(--color-text-primary)]">
                            Expense Distribution
                        </h2>
                        <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                            Spending by category this month
                        </p>
                    </div>
                    <ExpensePieChart data={categoryBreakdown} />
                </Card>
            </div>

            {/* ===== NEW: Member Reports Section ===== */}
            <MemberReportSection
                transactions={mockTransactions}
                members={mockMembers}
                defaultGroups={defaultMemberGroups}
            />

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-6">
                {/* Recent Transactions */}
                <Card padding="none" className="lg:col-span-2" id="recent-transactions">
                    <div className="flex items-center justify-between px-5 pt-5 pb-3 md:px-6 md:pt-6">
                        <div>
                            <h2 className="text-base font-semibold text-[var(--color-text-primary)]">
                                Recent Transactions
                            </h2>
                            <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                                Latest activity across all accounts
                            </p>
                        </div>
                        <Link
                            href="/expenses"
                            className="text-xs font-medium text-[var(--color-primary)] hover:underline"
                        >
                            View All
                        </Link>
                    </div>
                    <div className="px-2 pb-4 md:px-3">
                        <TransactionList transactions={mockTransactions} limit={6} />
                    </div>
                </Card>

                {/* Members Overview */}
                <Card padding="none" id="members-overview">
                    <div className="flex items-center justify-between px-5 pt-5 pb-3 md:px-6 md:pt-6">
                        <div>
                            <h2 className="text-base font-semibold text-[var(--color-text-primary)]">
                                Members
                            </h2>
                            <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                                {mockMembers.length} active members
                            </p>
                        </div>
                        <Link
                            href="/members"
                            className="text-xs font-medium text-[var(--color-primary)] hover:underline"
                        >
                            Manage
                        </Link>
                    </div>
                    <div className="px-3 pb-4 space-y-2">
                        {mockMembers.slice(0, 4).map((member) => (
                            <div
                                key={member.id}
                                className="flex items-center gap-3 px-3 py-2 rounded-[var(--radius-md)] hover:bg-[var(--color-surface-hover)] transition-colors"
                            >
                                <div className="w-8 h-8 rounded-full bg-[var(--color-primary-50)] text-[var(--color-primary)] flex items-center justify-center text-xs font-semibold flex-shrink-0">
                                    {member.avatar}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-[var(--color-text-primary)] truncate">
                                        {member.name}
                                    </p>
                                    <p className="text-xs text-[var(--color-text-muted)] capitalize">
                                        {member.role} · {member.accountType}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </DashboardLayout>
    );
}
