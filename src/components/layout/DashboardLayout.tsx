'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

interface DashboardLayoutProps {
    children: React.ReactNode;
    pageTitle?: string;
}

export default function DashboardLayout({
    children,
    pageTitle,
}: DashboardLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden bg-[var(--color-bg)]">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <Navbar
                    onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                    pageTitle={pageTitle}
                />
                <main className="flex-1 overflow-y-auto custom-scrollbar">
                    <div className="page-enter p-4 md:p-6 lg:p-8 max-w-[1400px]">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
