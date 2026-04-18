'use client';

import { useState, useCallback } from 'react';
import { KanbanTask, KanbanColumn, TaskPriority } from '@/types';
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

    // Add Task Form State
    const [showAddForm, setShowAddForm] = useState(false);
    const [addToColumn, setAddToColumn] = useState<KanbanColumn>('todo');
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newPriority, setNewPriority] = useState<TaskPriority>('medium');
    const [newAssignee, setNewAssignee] = useState('');
    const [newDueDate, setNewDueDate] = useState('');
    const [newDueTime, setNewDueTime] = useState('');
    const [newTags, setNewTags] = useState('');

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

    const openAddForm = (column: KanbanColumn) => {
        setAddToColumn(column);
        setShowAddForm(true);
    };

    const resetForm = () => {
        setNewTitle('');
        setNewDescription('');
        setNewPriority('medium');
        setNewAssignee('');
        setNewDueDate('');
        setNewDueTime('');
        setNewTags('');
        setShowAddForm(false);
    };

    const handleAddTask = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        if (!newTitle.trim()) return;

        const newTask: KanbanTask = {
            id: `task-${Date.now()}`,
            title: newTitle.trim(),
            description: newDescription.trim(),
            column: addToColumn,
            priority: newPriority,
            assignee: newAssignee.trim() || undefined,
            dueDate: newDueDate || undefined,
            dueTime: newDueTime || undefined,
            tags: newTags
                .split(',')
                .map((t) => t.trim())
                .filter(Boolean),
        };

        setTasks((prev) => [...prev, newTask]);
        resetForm();
    }, [newTitle, newDescription, addToColumn, newPriority, newAssignee, newDueDate, newDueTime, newTags]);

    return (
        <div className="space-y-5">
            {/* Add Task Form */}
            {showAddForm && (
                <div
                    className="card p-5"
                    style={{ animation: 'pageEnter 0.2s ease-out forwards' }}
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                            ✏️ Add Task to <span className="capitalize text-[var(--color-primary)]">{addToColumn.replace('-', ' ')}</span>
                        </h3>
                        <button
                            onClick={resetForm}
                            className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                        >
                            ✕ Cancel
                        </button>
                    </div>
                    <form onSubmit={handleAddTask} className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-medium text-[var(--color-text-primary)]">
                                    Title *
                                </label>
                                <input
                                    type="text"
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    placeholder="Task title..."
                                    required
                                    className="px-3 py-2 text-sm bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)]"
                                    autoFocus
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-medium text-[var(--color-text-primary)]">
                                    Assignee
                                </label>
                                <input
                                    type="text"
                                    value={newAssignee}
                                    onChange={(e) => setNewAssignee(e.target.value)}
                                    placeholder="e.g., Kiran Dhakal"
                                    className="px-3 py-2 text-sm bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)]"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-medium text-[var(--color-text-primary)]">
                                Description
                            </label>
                            <textarea
                                value={newDescription}
                                onChange={(e) => setNewDescription(e.target.value)}
                                placeholder="Task description..."
                                rows={2}
                                className="px-3 py-2 text-sm bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)] resize-none"
                            />
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-medium text-[var(--color-text-primary)]">
                                    Priority
                                </label>
                                <select
                                    value={newPriority}
                                    onChange={(e) => setNewPriority(e.target.value as TaskPriority)}
                                    className="px-3 py-2 text-sm bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)]"
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-medium text-[var(--color-text-primary)]">
                                    Column
                                </label>
                                <select
                                    value={addToColumn}
                                    onChange={(e) => setAddToColumn(e.target.value as KanbanColumn)}
                                    className="px-3 py-2 text-sm bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)]"
                                >
                                    {columns.map((col) => (
                                        <option key={col.id} value={col.id}>
                                            {col.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-medium text-[var(--color-text-primary)]">
                                    Due Date <span className="text-[var(--color-text-muted)] font-normal">(optional)</span>
                                </label>
                                <input
                                    type="date"
                                    value={newDueDate}
                                    onChange={(e) => setNewDueDate(e.target.value)}
                                    className="px-3 py-2 text-sm bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)]"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-medium text-[var(--color-text-primary)]">
                                    Due Time <span className="text-[var(--color-text-muted)] font-normal">(optional)</span>
                                </label>
                                <input
                                    type="time"
                                    value={newDueTime}
                                    onChange={(e) => setNewDueTime(e.target.value)}
                                    className="px-3 py-2 text-sm bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)]"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-medium text-[var(--color-text-primary)]">
                                Tags <span className="text-[var(--color-text-muted)] font-normal">(comma-separated)</span>
                            </label>
                            <input
                                type="text"
                                value={newTags}
                                onChange={(e) => setNewTags(e.target.value)}
                                placeholder="e.g., finance, urgent, review"
                                className="px-3 py-2 text-sm bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)]"
                            />
                        </div>

                        <div className="flex justify-end gap-2 pt-1">
                            <button
                                type="button"
                                onClick={resetForm}
                                className="px-4 py-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-5 py-2 text-sm font-medium bg-[var(--color-primary)] text-white rounded-[var(--radius-md)] hover:bg-[var(--color-primary-dark)] transition-colors"
                            >
                                Add Task
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Global Add Task Button (when form is hidden) */}
            {!showAddForm && (
                <button
                    onClick={() => openAddForm('todo')}
                    className="w-full py-2.5 text-sm font-medium text-[var(--color-primary)] bg-[var(--color-primary-50)] rounded-[var(--radius-md)] hover:bg-[var(--color-primary-100)] transition-colors border border-dashed border-[var(--color-primary-light)]"
                >
                    ＋ Add New Task
                </button>
            )}

            {/* Board */}
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
                                {/* Per-column add button */}
                                <button
                                    onClick={() => openAddForm(column.id)}
                                    className="text-xs w-5 h-5 rounded flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-50)] transition-colors"
                                    title={`Add task to ${column.label}`}
                                >
                                    ＋
                                </button>
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
                                            <div className="flex items-center gap-2">
                                                {task.dueDate && (
                                                    <span>
                                                        {new Date(task.dueDate).toLocaleDateString('en-US', {
                                                            month: 'short',
                                                            day: 'numeric',
                                                        })}
                                                    </span>
                                                )}
                                                {task.dueTime && (
                                                    <span className="text-[var(--color-primary)]">
                                                        🕐 {task.dueTime}
                                                    </span>
                                                )}
                                            </div>
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
        </div>
    );
}
