import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ExpenseTracker - Smart Finance & Project Management',
  description:
    'Track expenses, manage budgets, plan financial goals, and organize tasks with a clean, accessible dashboard.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
