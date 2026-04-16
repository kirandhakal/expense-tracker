import {
    Transaction,
    Member,
    FinancialGoal,
    KanbanTask,
    CategoryBreakdown,
    MonthlyData,
    DashboardSummary,
} from '@/types';

// ============================================
// Mock Transactions
// ============================================
export const mockTransactions: Transaction[] = [
    {
        id: 'txn-001',
        name: 'Monthly Salary',
        amount: 5200,
        type: 'income',
        category: 'other',
        date: '2026-04-15',
        description: 'April salary payment',
        accountId: 'acc-personal',
    },
    {
        id: 'txn-002',
        name: 'Grocery Shopping',
        amount: 156.5,
        type: 'expense',
        category: 'food',
        date: '2026-04-14',
        description: 'Weekly groceries from store',
        accountId: 'acc-personal',
    },
    {
        id: 'txn-003',
        name: 'Electric Bill',
        amount: 89.0,
        type: 'expense',
        category: 'bills',
        date: '2026-04-13',
        description: 'Monthly electricity bill',
        accountId: 'acc-family',
    },
    {
        id: 'txn-004',
        name: 'Freelance Project',
        amount: 1200,
        type: 'income',
        category: 'other',
        date: '2026-04-12',
        description: 'Web development project payment',
        accountId: 'acc-business',
    },
    {
        id: 'txn-005',
        name: 'Bus Pass',
        amount: 75,
        type: 'expense',
        category: 'transport',
        date: '2026-04-11',
        description: 'Monthly bus pass renewal',
        accountId: 'acc-personal',
    },
    {
        id: 'txn-006',
        name: 'Movie Night',
        amount: 45,
        type: 'expense',
        category: 'entertainment',
        date: '2026-04-10',
        description: 'Family movie outing',
        accountId: 'acc-family',
    },
    {
        id: 'txn-007',
        name: 'Health Insurance',
        amount: 320,
        type: 'expense',
        category: 'health',
        date: '2026-04-09',
        description: 'Monthly health insurance premium',
        accountId: 'acc-personal',
    },
    {
        id: 'txn-008',
        name: 'Online Course',
        amount: 49.99,
        type: 'expense',
        category: 'education',
        date: '2026-04-08',
        description: 'TypeScript masterclass',
        accountId: 'acc-personal',
    },
    {
        id: 'txn-009',
        name: 'Dining Out',
        amount: 68,
        type: 'expense',
        category: 'food',
        date: '2026-04-07',
        description: 'Dinner at Italian restaurant',
        accountId: 'acc-personal',
    },
    {
        id: 'txn-010',
        name: 'Rent Payment',
        amount: 1500,
        type: 'expense',
        category: 'rent',
        date: '2026-04-01',
        description: 'Monthly apartment rent',
        accountId: 'acc-personal',
    },
    {
        id: 'txn-011',
        name: 'Side Business Revenue',
        amount: 800,
        type: 'income',
        category: 'other',
        date: '2026-04-05',
        description: 'Revenue from online store',
        accountId: 'acc-business',
    },
    {
        id: 'txn-012',
        name: 'New Shoes',
        amount: 120,
        type: 'expense',
        category: 'shopping',
        date: '2026-04-04',
        description: 'Running shoes purchase',
        accountId: 'acc-personal',
    },
    {
        id: 'txn-013',
        name: 'Internet Bill',
        amount: 65,
        type: 'expense',
        category: 'bills',
        date: '2026-04-03',
        description: 'Monthly internet subscription',
        accountId: 'acc-family',
    },
    {
        id: 'txn-014',
        name: 'Savings Deposit',
        amount: 500,
        type: 'expense',
        category: 'savings',
        date: '2026-04-02',
        description: 'Monthly savings allocation',
        accountId: 'acc-personal',
    },
    {
        id: 'txn-015',
        name: 'Client Consultation',
        amount: 350,
        type: 'income',
        category: 'other',
        date: '2026-03-30',
        description: 'Consulting fee',
        accountId: 'acc-business',
    },
];

// ============================================
// Mock Members
// ============================================
export const mockMembers: Member[] = [
    {
        id: 'mem-001',
        name: 'Kiran Dhakal',
        email: 'kiran@example.com',
        role: 'owner',
        avatar: 'KD',
        accountType: 'personal',
        joinedDate: '2025-01-15',
    },
    {
        id: 'mem-002',
        name: 'Sita Dhakal',
        email: 'sita@example.com',
        role: 'admin',
        avatar: 'SD',
        accountType: 'family',
        joinedDate: '2025-02-10',
    },
    {
        id: 'mem-003',
        name: 'Aarav Dhakal',
        email: 'aarav@example.com',
        role: 'child',
        avatar: 'AD',
        accountType: 'family',
        joinedDate: '2025-03-01',
    },
    {
        id: 'mem-004',
        name: 'Ramesh Thapa',
        email: 'ramesh@example.com',
        role: 'member',
        avatar: 'RT',
        accountType: 'business',
        joinedDate: '2025-04-20',
    },
    {
        id: 'mem-005',
        name: 'Priya Sharma',
        email: 'priya@example.com',
        role: 'member',
        avatar: 'PS',
        accountType: 'business',
        joinedDate: '2025-05-15',
    },
    {
        id: 'mem-006',
        name: 'Anjali Dhakal',
        email: 'anjali@example.com',
        role: 'child',
        avatar: 'AJ',
        accountType: 'family',
        joinedDate: '2025-06-01',
    },
];

// ============================================
// Mock Financial Goals
// ============================================
export const mockGoals: FinancialGoal[] = [
    {
        id: 'goal-001',
        title: 'Emergency Fund',
        targetAmount: 10000,
        currentAmount: 6500,
        deadline: '2026-12-31',
        status: 'active',
        category: 'savings',
        description: 'Build a 6-month emergency fund for family security',
    },
    {
        id: 'goal-002',
        title: 'New Laptop',
        targetAmount: 2000,
        currentAmount: 1200,
        deadline: '2026-08-15',
        status: 'active',
        category: 'technology',
        description: 'Save for a new MacBook Pro for work',
    },
    {
        id: 'goal-003',
        title: 'Family Vacation',
        targetAmount: 5000,
        currentAmount: 2800,
        deadline: '2026-11-01',
        status: 'active',
        category: 'travel',
        description: 'Trip to Pokhara with the whole family',
    },
    {
        id: 'goal-004',
        title: 'Home Renovation',
        targetAmount: 15000,
        currentAmount: 15000,
        deadline: '2026-03-01',
        status: 'completed',
        category: 'home',
        description: 'Kitchen and bathroom renovation project',
    },
    {
        id: 'goal-005',
        title: 'Education Fund',
        targetAmount: 20000,
        currentAmount: 4000,
        deadline: '2028-06-01',
        status: 'active',
        category: 'education',
        description: "Children's higher education fund",
    },
];

// ============================================
// Mock Kanban Tasks
// ============================================
export const mockKanbanTasks: KanbanTask[] = [
    {
        id: 'task-001',
        title: 'Review monthly budget',
        description: 'Go through all expenses and categorize properly',
        column: 'todo',
        priority: 'high',
        assignee: 'Kiran Dhakal',
        dueDate: '2026-04-20',
        tags: ['finance', 'review'],
    },
    {
        id: 'task-002',
        title: 'Pay utility bills',
        description: 'Pay electricity, water, and internet bills',
        column: 'todo',
        priority: 'high',
        assignee: 'Sita Dhakal',
        dueDate: '2026-04-18',
        tags: ['bills', 'urgent'],
    },
    {
        id: 'task-003',
        title: 'Update investment portfolio',
        description: 'Review and rebalance stock investments',
        column: 'in-progress',
        priority: 'medium',
        assignee: 'Kiran Dhakal',
        dueDate: '2026-04-25',
        tags: ['investment'],
    },
    {
        id: 'task-004',
        title: 'Plan grocery list',
        description: 'Prepare weekly grocery shopping list',
        column: 'in-progress',
        priority: 'low',
        assignee: 'Sita Dhakal',
        dueDate: '2026-04-17',
        tags: ['shopping', 'food'],
    },
    {
        id: 'task-005',
        title: 'File tax returns',
        description: 'Complete and submit annual tax returns',
        column: 'done',
        priority: 'high',
        assignee: 'Kiran Dhakal',
        dueDate: '2026-04-10',
        tags: ['tax', 'finance'],
    },
    {
        id: 'task-006',
        title: 'Set up auto-pay',
        description: 'Configure automatic payments for recurring bills',
        column: 'done',
        priority: 'medium',
        assignee: 'Kiran Dhakal',
        dueDate: '2026-04-05',
        tags: ['bills', 'automation'],
    },
    {
        id: 'task-007',
        title: 'Research insurance plans',
        description: 'Compare health and life insurance options',
        column: 'todo',
        priority: 'medium',
        assignee: 'Kiran Dhakal',
        dueDate: '2026-05-01',
        tags: ['insurance', 'research'],
    },
    {
        id: 'task-008',
        title: 'Create savings plan for vacation',
        description: 'Plan monthly savings target for family trip',
        column: 'in-progress',
        priority: 'low',
        assignee: 'Sita Dhakal',
        dueDate: '2026-04-30',
        tags: ['savings', 'vacation'],
    },
];

// ============================================
// Dashboard Summary
// ============================================
export const mockDashboardSummary: DashboardSummary = {
    totalBalance: 4896.51,
    totalIncome: 7550,
    totalExpense: 2653.49,
    totalSavings: 6500,
    monthlyChange: 12.5,
};

// ============================================
// Category Breakdown for Charts
// ============================================
export const categoryBreakdown: CategoryBreakdown[] = [
    { category: 'Food', amount: 224.5, color: '#4A90A4' },
    { category: 'Bills', amount: 154, color: '#7B8794' },
    { category: 'Transport', amount: 75, color: '#6B9080' },
    { category: 'Entertainment', amount: 45, color: '#A47551' },
    { category: 'Health', amount: 320, color: '#8B6F8E' },
    { category: 'Education', amount: 49.99, color: '#5B7B8E' },
    { category: 'Shopping', amount: 120, color: '#7A8B6F' },
    { category: 'Rent', amount: 1500, color: '#8E7B6B' },
    { category: 'Savings', amount: 500, color: '#4A7C6F' },
];

// ============================================
// Monthly Trend Data
// ============================================
export const monthlyData: MonthlyData[] = [
    { month: 'Oct', income: 5800, expense: 3200 },
    { month: 'Nov', income: 6200, expense: 3500 },
    { month: 'Dec', income: 7000, expense: 4100 },
    { month: 'Jan', income: 5500, expense: 2900 },
    { month: 'Feb', income: 6100, expense: 3300 },
    { month: 'Mar', income: 6800, expense: 3100 },
    { month: 'Apr', income: 7550, expense: 2653 },
];

// ============================================
// Category Colors Map
// ============================================
export const categoryColors: Record<string, string> = {
    food: '#4A90A4',
    bills: '#7B8794',
    savings: '#4A7C6F',
    transport: '#6B9080',
    entertainment: '#A47551',
    health: '#8B6F8E',
    education: '#5B7B8E',
    shopping: '#7A8B6F',
    rent: '#8E7B6B',
    other: '#6B7B8E',
};

// ============================================
// Navigation Items
// ============================================
export const navigationItems = [
    { label: 'Dashboard', href: '/dashboard', icon: '📊' },
    { label: 'Expenses', href: '/expenses', icon: '💰' },
    { label: 'Members', href: '/members', icon: '👥' },
    { label: 'Planning', href: '/planning', icon: '🎯' },
    { label: 'Kanban', href: '/kanban', icon: '📋' },
];
