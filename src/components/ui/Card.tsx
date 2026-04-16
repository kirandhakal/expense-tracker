import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    interactive?: boolean;
    id?: string;
}

const paddingMap = {
    none: '',
    sm: 'p-4',
    md: 'p-5 md:p-6',
    lg: 'p-6 md:p-8',
};

export default function Card({
    children,
    className = '',
    padding = 'md',
    interactive = false,
    id,
}: CardProps) {
    return (
        <div
            id={id}
            className={`card ${paddingMap[padding]} ${interactive ? 'card-interactive cursor-pointer' : ''
                } ${className}`}
        >
            {children}
        </div>
    );
}
