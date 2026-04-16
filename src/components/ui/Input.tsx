import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

export default function Input({
    label,
    error,
    helperText,
    id,
    className = '',
    ...props
}: InputProps) {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
        <div className="flex flex-col gap-1.5">
            {label && (
                <label
                    htmlFor={inputId}
                    className="text-sm font-medium text-[var(--color-text-primary)]"
                >
                    {label}
                </label>
            )}
            <input
                id={inputId}
                className={`
          w-full px-3.5 py-2.5
          bg-[var(--color-surface)]
          border rounded-[var(--radius-md)]
          text-[var(--color-text-primary)]
          placeholder:text-[var(--color-text-muted)]
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)] focus:border-[var(--color-primary)]
          ${error
                        ? 'border-[var(--color-danger)] focus:ring-[var(--color-danger)]'
                        : 'border-[var(--color-border)]'
                    }
          ${className}
        `}
                {...props}
            />
            {error && (
                <p className="text-xs text-[var(--color-danger)] mt-0.5">{error}</p>
            )}
            {helperText && !error && (
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                    {helperText}
                </p>
            )}
        </div>
    );
}
