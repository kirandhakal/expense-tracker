import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    options: { value: string; label: string }[];
    error?: string;
}

export default function Select({
    label,
    options,
    error,
    id,
    className = '',
    ...props
}: SelectProps) {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
        <div className="flex flex-col gap-1.5">
            {label && (
                <label
                    htmlFor={selectId}
                    className="text-sm font-medium text-[var(--color-text-primary)]"
                >
                    {label}
                </label>
            )}
            <select
                id={selectId}
                className={`
          w-full px-3.5 py-2.5
          bg-[var(--color-surface)]
          border border-[var(--color-border)]
          rounded-[var(--radius-md)]
          text-[var(--color-text-primary)]
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)] focus:border-[var(--color-primary)]
          appearance-none cursor-pointer
          ${error ? 'border-[var(--color-danger)]' : ''}
          ${className}
        `}
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.5rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem',
                }}
                {...props}
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            {error && (
                <p className="text-xs text-[var(--color-danger)] mt-0.5">{error}</p>
            )}
        </div>
    );
}
