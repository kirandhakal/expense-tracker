// ============================================
// Expense Tracker + Project Management Types
// ============================================

// --- Expense Module Types ---
export type ExpenseCategory =
  | 'food'
  | 'bills'
  | 'savings'
  | 'transport'
  | 'entertainment'
  | 'health'
  | 'education'
  | 'shopping'
  | 'rent'
  | 'other';

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  name: string;
  amount: number;
  type: TransactionType;
  category: ExpenseCategory;
  date: string;
  description?: string;
  accountId: string;
  memberId?: string; // link transaction to a member
}

// --- Account & Member Types ---
export type AccountType = 'personal' | 'family' | 'business';
export type MemberRole = 'owner' | 'admin' | 'member' | 'child' | string;

export interface Member {
  id: string;
  name: string;
  email: string;
  role: MemberRole;
  avatar: string;
  accountType: AccountType;
  joinedDate: string;
}

// --- Member Group (custom people combos) ---
export interface MemberGroup {
  id: string;
  name: string;
  memberIds: string[];
  color: string;
}

// --- Planning Module Types ---
export type GoalStatus = 'active' | 'completed' | 'paused';

export interface FinancialGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  status: GoalStatus;
  category: string;
  description: string;
}

// --- Kanban Board Types ---
export type KanbanColumn = 'todo' | 'in-progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface KanbanTask {
  id: string;
  title: string;
  description: string;
  column: KanbanColumn;
  priority: TaskPriority;
  assignee?: string;
  dueDate?: string;
  dueTime?: string;
  tags: string[];
}

// --- Sticky Notes ---
export interface StickyNote {
  id: string;
  content: string;
  color: string;
  x: number;
  y: number;
  page: string; // which page the note belongs to, or 'global'
  createdAt: string;
}

// --- Time Range Filter ---
export type TimeRangePreset = 'monthly' | 'quarterly' | 'yearly' | 'custom';

export interface TimeRange {
  preset: TimeRangePreset;
  startDate: string;
  endDate: string;
}

// --- Dashboard Summary ---
export interface DashboardSummary {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
  totalSavings: number;
  monthlyChange: number;
}

// --- Chart Data ---
export interface CategoryBreakdown {
  category: string;
  amount: number;
  color: string;
}

export interface MonthlyData {
  month: string;
  income: number;
  expense: number;
}

// --- Navigation ---
export interface NavItem {
  label: string;
  href: string;
  icon: string;
}
