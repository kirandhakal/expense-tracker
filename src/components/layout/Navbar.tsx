'use client';

interface NavbarProps {
    onToggleSidebar: () => void;
    pageTitle?: string;
}

export default function Navbar({ onToggleSidebar, pageTitle }: NavbarProps) {
    return (
        <header className="sticky top-0 z-30 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
            <div className="flex items-center justify-between h-[60px] px-4 md:px-6">
                {/* Left side */}
                <div className="flex items-center gap-3">
                    {/* Mobile menu toggle */}
                    <button
                        onClick={onToggleSidebar}
                        className="lg:hidden p-2 rounded-[var(--radius-md)] hover:bg-[var(--color-surface-hover)] transition-colors"
                        aria-label="Toggle menu"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        >
                            <line x1="3" y1="5" x2="17" y2="5" />
                            <line x1="3" y1="10" x2="17" y2="10" />
                            <line x1="3" y1="15" x2="17" y2="15" />
                        </svg>
                    </button>
                    {pageTitle && (
                        <h1 className="text-lg font-semibold text-[var(--color-text-primary)]">
                            {pageTitle}
                        </h1>
                    )}
                </div>

                {/* Right side */}
                <div className="flex items-center gap-2 md:gap-3">
                    {/* Search */}
                    <div className="hidden md:flex items-center gap-2 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-[var(--radius-md)] px-3 py-1.5">
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            stroke="var(--color-text-muted)"
                            strokeWidth="1.5"
                        >
                            <circle cx="7" cy="7" r="5" />
                            <line x1="11" y1="11" x2="14" y2="14" strokeLinecap="round" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-40 bg-transparent text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none"
                            aria-label="Search"
                        />
                    </div>

                    {/* Notification bell */}
                    <button
                        className="relative p-2 rounded-[var(--radius-md)] hover:bg-[var(--color-surface-hover)] transition-colors"
                        aria-label="Notifications"
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            stroke="var(--color-text-secondary)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M13.5 6.75a4.5 4.5 0 1 0-9 0c0 5.25-2.25 6.75-2.25 6.75h13.5s-2.25-1.5-2.25-6.75" />
                            <path d="M10.3 15.75a1.5 1.5 0 0 1-2.6 0" />
                        </svg>
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--color-danger)] rounded-full" />
                    </button>

                    {/* User avatar (mobile) */}
                    <div className="w-8 h-8 rounded-full bg-[var(--color-primary-50)] text-[var(--color-primary)] flex items-center justify-center text-xs font-semibold lg:hidden">
                        KD
                    </div>
                </div>
            </div>
        </header>
    );
}
