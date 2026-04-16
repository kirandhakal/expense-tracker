import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Nav */}
      <nav className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-[var(--radius-md)] bg-[var(--color-primary)] flex items-center justify-center text-white font-bold text-xs">
                ET
              </div>
              <span className="text-lg font-bold text-[var(--color-text-primary)]">
                ExpenseTracker
              </span>
            </div>
            <Link
              href="/dashboard"
              className="px-5 py-2 bg-[var(--color-primary)] text-white text-sm font-medium rounded-[var(--radius-md)] hover:bg-[var(--color-primary-dark)] transition-colors"
            >
              Open Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 sm:py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[var(--color-primary-50)] text-[var(--color-primary)] rounded-full text-sm font-medium mb-6">
            <span>📊</span>
            <span>Smart Finance Management</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] leading-tight mb-5">
            Take Full Control of{' '}
            <span style={{ color: 'var(--color-primary)' }}>Your Finances</span>
          </h1>

          <p className="text-base sm:text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-8 leading-relaxed">
            Track expenses, manage budgets, plan financial goals, and organize
            tasks — all in one clean, accessible dashboard designed for everyone.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-[var(--color-primary)] text-white font-medium rounded-[var(--radius-md)] hover:bg-[var(--color-primary-dark)] transition-colors text-sm"
            >
              Go to Dashboard
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/expenses"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-[var(--color-surface)] text-[var(--color-text-primary)] font-medium rounded-[var(--radius-md)] border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] transition-colors text-sm"
            >
              View Expenses
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="pb-16 sm:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] mb-3">
              Everything You Need
            </h2>
            <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto">
              A comprehensive toolkit for managing personal, family, and business finances with ease.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="card p-6 hover:shadow-lg transition-shadow"
              >
                <div
                  className="w-11 h-11 rounded-[var(--radius-md)] flex items-center justify-center text-xl mb-4"
                  style={{ backgroundColor: feature.bgColor }}
                >
                  {feature.icon}
                </div>
                <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[var(--color-surface)] border-y border-[var(--color-border)] py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>
                  {stat.value}
                </p>
                <p className="text-sm text-[var(--color-text-muted)] mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] mb-4">
            Ready to Start?
          </h2>
          <p className="text-[var(--color-text-secondary)] mb-8 max-w-lg mx-auto">
            Begin managing your finances smarter today. No setup required — your
            dashboard is ready.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[var(--color-primary)] text-white font-medium rounded-[var(--radius-md)] hover:bg-[var(--color-primary-dark)] transition-colors"
          >
            Open Dashboard
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)] py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-[var(--color-text-muted)]">
            © {new Date().getFullYear()} ExpenseTracker. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: '💰',
    title: 'Expense Tracking',
    description:
      'Effortlessly log and categorize daily expenses with smart category tagging.',
    bgColor: 'var(--color-success-light)',
  },
  {
    icon: '📊',
    title: 'Visual Reports',
    description:
      'See where your money goes with clear pie charts and bar graphs.',
    bgColor: 'var(--color-info-light)',
  },
  {
    icon: '👥',
    title: 'Member Management',
    description:
      'Manage personal, family, and business accounts with role-based access.',
    bgColor: 'var(--color-warning-light)',
  },
  {
    icon: '🎯',
    title: 'Financial Planning',
    description:
      'Set savings goals and track progress toward your financial milestones.',
    bgColor: 'var(--color-primary-50)',
  },
  {
    icon: '📋',
    title: 'Kanban Workflow',
    description:
      'Organize financial tasks using a simple drag-and-drop board.',
    bgColor: 'var(--color-danger-light)',
  },
  {
    icon: '📱',
    title: 'Fully Responsive',
    description:
      'Access your dashboard on any device — phone, tablet, or desktop.',
    bgColor: 'var(--color-surface-hover)',
  },
];

const stats = [
  { value: '15+', label: 'Tracked Transactions' },
  { value: '6', label: 'Team Members' },
  { value: '5', label: 'Financial Goals' },
  { value: '3', label: 'Account Types' },
];
