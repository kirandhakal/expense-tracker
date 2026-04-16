'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigationItems } from '@/data/mockData';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname();

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-40 lg:hidden"
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed top-0 left-0 z-50 h-full
          w-[var(--sidebar-width)]
          bg-[var(--color-surface)]
          border-r border-[var(--color-border)]
          flex flex-col
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
                role="navigation"
                aria-label="Main navigation"
            >
                {/* Logo / Brand */}
                <div className="px-6 py-5 border-b border-[var(--color-border)]">
                    <Link
                        href="/"
                        className="flex items-center gap-3 group"
                        onClick={onClose}
                    >
                        <div className="w-9 h-9 rounded-[var(--radius-md)] bg-[var(--color-primary)] flex items-center justify-center text-white font-bold text-sm">
                            ET
                        </div>
                        <div>
                            <h2 className="text-base font-bold text-[var(--color-text-primary)] leading-tight">
                                ExpenseTracker
                            </h2>
                            <p className="text-[11px] text-[var(--color-text-muted)] leading-tight">
                                Finance Manager
                            </p>
                        </div>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 py-4 overflow-y-auto custom-scrollbar">
                    <ul className="space-y-1">
                        {navigationItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        onClick={onClose}
                                        className={`
                      flex items-center gap-3 px-3.5 py-2.5
                      rounded-[var(--radius-md)]
                      text-sm font-medium
                      transition-all duration-200
                      ${isActive
                                                ? 'bg-[var(--color-primary-50)] text-[var(--color-primary)] border border-[var(--color-primary-100)]'
                                                : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]'
                                            }
                    `}
                                        aria-current={isActive ? 'page' : undefined}
                                    >
                                        <span className="text-lg" aria-hidden="true">
                                            {item.icon}
                                        </span>
                                        <span>{item.label}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Bottom User Info */}
                <div className="px-4 py-4 border-t border-[var(--color-border)]">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[var(--color-primary-50)] text-[var(--color-primary)] flex items-center justify-center text-sm font-semibold">
                            KD
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-[var(--color-text-primary)] truncate">
                                Kiran Dhakal
                            </p>
                            <p className="text-xs text-[var(--color-text-muted)] truncate">
                                Personal Account
                            </p>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
