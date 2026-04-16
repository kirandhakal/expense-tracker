'use client';

import { useState } from 'react';
import { KanbanTask, KanbanColumn } from '@/types';
import Badge from '@/components/ui/Badge';

interface KanbanBoardProps {
    initialTasks: KanbanTask[];
}

const columns: { id: KanbanColumn; label: string; color: string }[] = [
    { id: 'todo', label: 'To Do', color: 'var(--color-warning)' },
    { id: 'in-progress', label: 'In Progress', color: 'var(--color-info)' },
    { id: 'done', label: 'Done', color: 'var(--color-success)' },
];

const priorityVariant: Record<string, 'danger' | 'warning' | 'default'> = {
    high: 'danger',
    medium: 'warning',
    low: 'default',
};

export default function KanbanBoard({ initialTasks }: KanbanBoardProps) {
    const [tasks, setTasks] = useState<KanbanTask[]>(initialTasks);
    const [draggedTask, setDraggedTask] = useState<string | null>(null);

    const moveTask = (taskId: string, newColumn: KanbanColumn) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === taskId ? { ...task, column: newColumn } : task
            )
        );
    };

    const handleDragStart = (e: React.DragEvent, taskId: string) => {
        setDraggedTask(taskId);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e: React.DragEvent, column: KanbanColumn) => {
        e.preventDefault();
        if (draggedTask) {
            moveTask(draggedTask, column);
            setDraggedTask(null);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {columns.map((column) => {
                const columnTasks = tasks.filter((t) => t.column === column.id);

                return (
                    <div
                        key={column.id}
                        className="flex flex-col"
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, column.id)}
                    >
                        {/* Column Header */}
                        <div className="flex items-center gap-2.5 mb-4">
                            <div
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ backgroundColor: column.color }}
                            />
                            <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                                {column.label}
                            </h3>
                            <span className="ml-auto text-xs font-medium text-[var(--color-text-muted)] bg-[var(--color-surface-hover)] px-2 py-0.5 rounded-full">
                                {columnTasks.length}
                            </span>
                        </div>

                        {/* Tasks */}
                        <div className="space-y-3 min-h-[200px] p-3 bg-[var(--color-bg)] rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border)]">
                            {columnTasks.map((task) => (
                                <div
                                    key={task.id}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, task.id)}
                                    className={`kanban-card card p-4 ${draggedTask === task.id ? 'opacity-50' : ''
                                        }`}
                                >
                                    {/* Priority & Title */}
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <h4 className="text-sm font-medium text-[var(--color-text-primary)] leading-snug">
                                            {task.title}
                                        </h4>
                                        <Badge variant={priorityVariant[task.priority]} className="text-[10px] flex-shrink-0">
                                            {task.priority}
                                        </Badge>
                                    </div>

                                    {/* Description */}
                                    <p className="text-xs text-[var(--color-text-muted)] mb-3 line-clamp-2">
                                        {task.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-1.5 mb-3">
                                        {task.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-[10px] px-2 py-0.5 bg-[var(--color-surface-hover)] text-[var(--color-text-muted)] rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
                                        {task.assignee && (
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-5 h-5 rounded-full bg-[var(--color-primary-50)] text-[var(--color-primary)] flex items-center justify-center text-[9px] font-semibold">
                                                    {task.assignee
                                                        .split(' ')
                                                        .map((n) => n[0])
                                                        .join('')}
                                                </div>
                                                <span className="hidden sm:inline">{task.assignee.split(' ')[0]}</span>
                                            </div>
                                        )}
                                        {task.dueDate && (
                                            <span>
                                                {new Date(task.dueDate).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                })}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {columnTasks.length === 0 && (
                                <div className="flex items-center justify-center h-24 text-xs text-[var(--color-text-muted)]">
                                    Drop tasks here
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
