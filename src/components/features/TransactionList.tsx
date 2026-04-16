import { Transaction } from '@/types';
import { categoryColors } from '@/data/mockData';
import Badge from '@/components/ui/Badge';

interface TransactionListProps {
    transactions: Transaction[];
    limit?: number;
    onDelete?: (id: string) => void;
    showActions?: boolean;
}

export default function TransactionList({
    transactions,
    limit,
    onDelete,
    showActions = false,
}: TransactionListProps) {
    const displayed = limit ? transactions.slice(0, limit) : transactions;

    return (
        <div className="space-y-2">
            {displayed.length > 0 ? (
                displayed.map((txn) => (
                    <div
                        key={txn.id}
                        className="flex items-center gap-3 px-4 py-3 rounded-[var(--radius-md)] hover:bg-[var(--color-surface-hover)] transition-colors group"
                    >
                        {/* Category Icon */}
                        <div
                            className="w-9 h-9 rounded-[var(--radius-md)] flex items-center justify-center text-white text-xs font-semibold flex-shrink-0"
                            style={{
                                backgroundColor: categoryColors[txn.category] || '#6B7B8E',
                            }}
                        >
                            {txn.category.charAt(0).toUpperCase()}
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-[var(--color-text-primary)] truncate">
                                {txn.name}
                            </p>
                            <p className="text-xs text-[var(--color-text-muted)]">
                                {new Date(txn.date).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                })}
                            </p>
                        </div>

                        {/* Category Badge */}
                        <Badge className="hidden sm:inline-flex capitalize text-[11px]">
                            {txn.category}
                        </Badge>

                        {/* Amount */}
                        <span
                            className={`text-sm font-semibold whitespace-nowrap ${txn.type === 'income'
                                    ? 'text-[var(--color-success)]'
                                    : 'text-[var(--color-danger)]'
                                }`}
                        >
                            {txn.type === 'income' ? '+' : '-'}$
                            {txn.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </span>

                        {/* Delete Button */}
                        {showActions && onDelete && (
                            <button
                                onClick={() => onDelete(txn.id)}
                                className="opacity-0 group-hover:opacity-100 p-1.5 rounded-[var(--radius-sm)] hover:bg-[var(--color-danger-light)] text-[var(--color-danger)] transition-all"
                                aria-label={`Delete ${txn.name}`}
                            >
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 14 14"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                >
                                    <line x1="3" y1="3" x2="11" y2="11" />
                                    <line x1="11" y1="3" x2="3" y2="11" />
                                </svg>
                            </button>
                        )}
                    </div>
                ))
            ) : (
                <div className="text-center py-8">
                    <p className="text-[var(--color-text-muted)] text-sm">
                        No transactions yet
                    </p>
                </div>
            )}
        </div>
    );
}
