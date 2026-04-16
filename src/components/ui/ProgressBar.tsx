interface ProgressBarProps {
    value: number;
    max: number;
    color?: string;
    showLabel?: boolean;
    size?: 'sm' | 'md';
    className?: string;
}

export default function ProgressBar({
    value,
    max,
    color = 'var(--color-primary)',
    showLabel = true,
    size = 'md',
    className = '',
}: ProgressBarProps) {
    const percentage = Math.min(Math.round((value / max) * 100), 100);
    const heightClass = size === 'sm' ? 'h-1.5' : 'h-2.5';

    return (
        <div className={`w-full ${className}`}>
            {showLabel && (
                <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs text-[var(--color-text-muted)]">
                        {percentage}% complete
                    </span>
                    <span className="text-xs font-medium text-[var(--color-text-secondary)]">
                        ${value.toLocaleString()} / ${max.toLocaleString()}
                    </span>
                </div>
            )}
            <div
                className={`w-full ${heightClass} bg-[var(--color-border-light)] rounded-full overflow-hidden`}
            >
                <div
                    className={`${heightClass} rounded-full progress-fill`}
                    style={{
                        width: `${percentage}%`,
                        backgroundColor: color,
                    }}
                    role="progressbar"
                    aria-valuenow={value}
                    aria-valuemin={0}
                    aria-valuemax={max}
                />
            </div>
        </div>
    );
}
