'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import KanbanBoard from '@/components/features/KanbanBoard';
import { mockKanbanTasks } from '@/data/mockData';

export default function KanbanPage() {
    return (
        <DashboardLayout pageTitle="Task Board">
            <div className="mb-5">
                <p className="text-sm text-[var(--color-text-secondary)]">
                    Organize your financial tasks with drag and drop. Move cards between
                    columns to track progress.
                </p>
            </div>

            <KanbanBoard initialTasks={mockKanbanTasks} />
        </DashboardLayout>
    );
}
