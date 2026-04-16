interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'success' | 'danger' | 'warning' | 'info';
    className?: string;
}

const variantStyles = {
    default: 'bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)]',
    success: 'bg-[var(--color-success-light)] text-[var(--color-success)]',
    danger: 'bg-[var(--color-danger-light)] text-[var(--color-danger)]',
    warning: 'bg-[var(--color-warning-light)] text-[var(--color-warning)]',
    info: 'bg-[var(--color-info-light)] text-[var(--color-info)]',
};

export default function Badge({
    children,
    variant = 'default',
    className = '',
}: BadgeProps) {
    return (
        <span className={`badge ${variantStyles[variant]} ${className}`}>
            {children}
        </span>
    );
}
