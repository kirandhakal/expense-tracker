import { FinancialGoal } from '@/types';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import ProgressBar from '@/components/ui/ProgressBar';

interface GoalCardProps {
    goal: FinancialGoal;
}

const statusVariant: Record<string, 'success' | 'warning' | 'default'> = {
    active: 'warning',
    completed: 'success',
    paused: 'default',
};

const categoryEmoji: Record<string, string> = {
    savings: '💰',
    technology: '💻',
    travel: '✈️',
    home: '🏠',
    education: '📚',
};

export default function GoalCard({ goal }: GoalCardProps) {
    const daysLeft = Math.max(
        0,
        Math.ceil(
            (new Date(goal.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
        )
    );

    return (
        <Card id={`goal-${goal.id}`}>
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                    <span className="text-xl">
                        {categoryEmoji[goal.category] || '🎯'}
                    </span>
                    <div>
                        <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                            {goal.title}
                        </h3>
                        <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                            {goal.description}
                        </p>
                    </div>
                </div>
                <Badge variant={statusVariant[goal.status]}>{goal.status}</Badge>
            </div>

            <ProgressBar
                value={goal.currentAmount}
                max={goal.targetAmount}
                color={
                    goal.status === 'completed'
                        ? 'var(--color-success)'
                        : 'var(--color-primary)'
                }
            />

            <div className="flex items-center justify-between mt-3 text-xs text-[var(--color-text-muted)]">
                <span>
                    {goal.status === 'completed'
                        ? '✅ Goal reached!'
                        : `${daysLeft} days left`}
                </span>
                <span>
                    Deadline:{' '}
                    {new Date(goal.deadline).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                    })}
                </span>
            </div>
        </Card>
    );
}
