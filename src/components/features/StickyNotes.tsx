'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { StickyNote } from '@/types';
import { mockStickyNotes } from '@/data/mockData';

const STICKY_COLORS = [
    { name: 'Yellow', value: '#FEF3C7', text: '#92400E' },
    { name: 'Blue', value: '#DBEAFE', text: '#1E40AF' },
    { name: 'Green', value: '#D1FAE5', text: '#065F46' },
    { name: 'Pink', value: '#FCE7F3', text: '#9D174D' },
    { name: 'Purple', value: '#EDE9FE', text: '#5B21B6' },
    { name: 'Orange', value: '#FED7AA', text: '#9A3412' },
];

export default function StickyNotesWidget() {
    const [notes, setNotes] = useState<StickyNote[]>(mockStickyNotes);
    const [isOpen, setIsOpen] = useState(false);
    const [newContent, setNewContent] = useState('');
    const [selectedColor, setSelectedColor] = useState(STICKY_COLORS[0]);
    const [draggingId, setDraggingId] = useState<string | null>(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editContent, setEditContent] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    const addNote = () => {
        if (!newContent.trim()) return;
        const newNote: StickyNote = {
            id: `note-${Date.now()}`,
            content: newContent.trim(),
            color: selectedColor.value,
            x: 50 + Math.random() * 200,
            y: 100 + Math.random() * 200,
            page: 'global',
            createdAt: new Date().toISOString(),
        };
        setNotes([...notes, newNote]);
        setNewContent('');
    };

    const deleteNote = (id: string) => {
        setNotes(notes.filter((n) => n.id !== id));
    };

    const startEdit = (note: StickyNote) => {
        setEditingId(note.id);
        setEditContent(note.content);
    };

    const saveEdit = (id: string) => {
        setNotes(notes.map((n) => n.id === id ? { ...n, content: editContent } : n));
        setEditingId(null);
        setEditContent('');
    };

    const handleMouseDown = useCallback((e: React.MouseEvent, noteId: string) => {
        const note = notes.find((n) => n.id === noteId);
        if (!note) return;
        setDraggingId(noteId);
        setDragOffset({
            x: e.clientX - note.x,
            y: e.clientY - note.y,
        });
    }, [notes]);

    useEffect(() => {
        if (!draggingId) return;

        const handleMouseMove = (e: MouseEvent) => {
            setNotes((prev) =>
                prev.map((n) =>
                    n.id === draggingId
                        ? { ...n, x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y }
                        : n
                )
            );
        };

        const handleMouseUp = () => {
            setDraggingId(null);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [draggingId, dragOffset]);

    return (
        <>
            {/* Floating Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-[999] w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-lg transition-all duration-300 hover:scale-110"
                style={{
                    background: 'linear-gradient(135deg, #FEF3C7, #FBBF24)',
                    boxShadow: '0 4px 20px rgba(251, 191, 36, 0.4)',
                }}
                title="Sticky Notes"
            >
                {isOpen ? '✕' : '📝'}
            </button>

            {/* Notes Panel */}
            {isOpen && (
                <div
                    className="fixed bottom-20 right-6 z-[998] w-80 max-h-[70vh] card p-4 overflow-y-auto custom-scrollbar"
                    style={{
                        animation: 'pageEnter 0.25s ease-out forwards',
                        boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
                    }}
                >
                    <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
                        📝 Sticky Notes
                        <span className="text-xs font-normal text-[var(--color-text-muted)]">
                            ({notes.length})
                        </span>
                    </h3>

                    {/* Add Note Form */}
                    <div className="space-y-2 mb-4 pb-4 border-b border-[var(--color-border-light)]">
                        <textarea
                            value={newContent}
                            onChange={(e) => setNewContent(e.target.value)}
                            placeholder="Write a quick note..."
                            rows={2}
                            className="w-full px-3 py-2 text-sm bg-[var(--color-bg)] border border-[var(--color-border)] rounded-[var(--radius-md)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)] resize-none"
                        />
                        <div className="flex items-center justify-between">
                            <div className="flex gap-1.5">
                                {STICKY_COLORS.map((color) => (
                                    <button
                                        key={color.value}
                                        onClick={() => setSelectedColor(color)}
                                        className={`w-5 h-5 rounded-full border-2 transition-transform ${selectedColor.value === color.value
                                                ? 'scale-125 border-[var(--color-primary)]'
                                                : 'border-transparent hover:scale-110'
                                            }`}
                                        style={{ backgroundColor: color.value }}
                                        title={color.name}
                                    />
                                ))}
                            </div>
                            <button
                                onClick={addNote}
                                disabled={!newContent.trim()}
                                className="px-3 py-1 text-xs font-medium bg-[var(--color-primary)] text-white rounded-[var(--radius-sm)] hover:bg-[var(--color-primary-dark)] disabled:opacity-50 transition-colors"
                            >
                                Add
                            </button>
                        </div>
                    </div>

                    {/* Notes List */}
                    <div className="space-y-2">
                        {notes.map((note) => {
                            const colorConfig = STICKY_COLORS.find((c) => c.value === note.color) || STICKY_COLORS[0];
                            return (
                                <div
                                    key={note.id}
                                    className="p-3 rounded-[var(--radius-md)] relative group transition-all duration-200 hover:shadow-md"
                                    style={{ backgroundColor: note.color, color: colorConfig.text }}
                                >
                                    {editingId === note.id ? (
                                        <div className="space-y-2">
                                            <textarea
                                                value={editContent}
                                                onChange={(e) => setEditContent(e.target.value)}
                                                rows={2}
                                                className="w-full px-2 py-1 text-xs rounded border border-current/20 bg-white/50 resize-none focus:outline-none"
                                                autoFocus
                                            />
                                            <div className="flex justify-end gap-1">
                                                <button
                                                    onClick={() => setEditingId(null)}
                                                    className="text-[10px] px-2 py-0.5 opacity-70 hover:opacity-100"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={() => saveEdit(note.id)}
                                                    className="text-[10px] px-2 py-0.5 font-medium bg-white/30 rounded"
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <p className="text-xs leading-relaxed pr-10">{note.content}</p>
                                            <p className="text-[10px] mt-1.5 opacity-50">
                                                {new Date(note.createdAt).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </p>
                                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                                <button
                                                    onClick={() => startEdit(note)}
                                                    className="w-5 h-5 rounded flex items-center justify-center text-[10px] bg-white/40 hover:bg-white/60 transition-colors"
                                                    title="Edit"
                                                >
                                                    ✏️
                                                </button>
                                                <button
                                                    onClick={() => deleteNote(note.id)}
                                                    className="w-5 h-5 rounded flex items-center justify-center text-[10px] bg-white/40 hover:bg-red-200 transition-colors"
                                                    title="Delete"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            );
                        })}
                        {notes.length === 0 && (
                            <p className="text-center text-xs text-[var(--color-text-muted)] py-4">
                                No notes yet. Add one above! ✨
                            </p>
                        )}
                    </div>
                </div>
            )}

            {/* Floating Sticky Notes (draggable, shown on desktop) */}
            <div ref={containerRef} className="hidden lg:block">
                {notes.map((note) => {
                    const colorConfig = STICKY_COLORS.find((c) => c.value === note.color) || STICKY_COLORS[0];
                    return (
                        <div
                            key={`float-${note.id}`}
                            className={`fixed z-[997] w-44 p-3 rounded-[var(--radius-md)] shadow-lg cursor-grab select-none transition-shadow hover:shadow-xl ${draggingId === note.id ? 'cursor-grabbing shadow-xl scale-105' : ''
                                }`}
                            style={{
                                left: note.x,
                                top: note.y,
                                backgroundColor: note.color,
                                color: colorConfig.text,
                                transform: `rotate(${(note.id.charCodeAt(note.id.length - 1) % 7) - 3}deg)`,
                            }}
                            onMouseDown={(e) => handleMouseDown(e, note.id)}
                        >
                            <p className="text-xs leading-relaxed font-medium">{note.content}</p>
                            <p className="text-[9px] mt-2 opacity-40">
                                {new Date(note.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </p>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
