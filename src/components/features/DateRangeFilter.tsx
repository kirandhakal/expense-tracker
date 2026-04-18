'use client';

import { useState } from 'react';
import { TimeRangePreset } from '@/types';

interface DateRangeFilterProps {
    onRangeChange: (startDate: string, endDate: string, preset: TimeRangePreset) => void;
}

const presets: { value: TimeRangePreset; label: string; icon: string }[] = [
    { value: 'monthly', label: 'Monthly', icon: '📅' },
    { value: 'quarterly', label: 'Quarterly', icon: '📊' },
    { value: 'yearly', label: 'Yearly', icon: '📆' },
    { value: 'custom', label: 'Custom', icon: '🎯' },
];

function getPresetDates(preset: TimeRangePreset): { start: string; end: string } {
    const now = new Date();
    const end = now.toISOString().split('T')[0];

    switch (preset) {
        case 'monthly': {
            const start = new Date(now.getFullYear(), now.getMonth(), 1);
            return { start: start.toISOString().split('T')[0], end };
        }
        case 'quarterly': {
            const quarterStart = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
            return { start: quarterStart.toISOString().split('T')[0], end };
        }
        case 'yearly': {
            const yearStart = new Date(now.getFullYear(), 0, 1);
            return { start: yearStart.toISOString().split('T')[0], end };
        }
        default:
            return { start: end, end };
    }
}

export default function DateRangeFilter({ onRangeChange }: DateRangeFilterProps) {
    const [activePreset, setActivePreset] = useState<TimeRangePreset>('monthly');
    const [customStart, setCustomStart] = useState('');
    const [customEnd, setCustomEnd] = useState('');

    const handlePresetChange = (preset: TimeRangePreset) => {
        setActivePreset(preset);
        if (preset !== 'custom') {
            const { start, end } = getPresetDates(preset);
            onRangeChange(start, end, preset);
        }
    };

    const handleCustomApply = () => {
        if (customStart && customEnd) {
            onRangeChange(customStart, customEnd, 'custom');
        }
    };

    return (
        <div className="flex flex-wrap items-center gap-2">
            {/* Preset Buttons */}
            <div className="flex items-center rounded-[var(--radius-md)] border border-[var(--color-border)] overflow-hidden">
                {presets.map((preset) => (
                    <button
                        key={preset.value}
                        onClick={() => handlePresetChange(preset.value)}
                        className={`px-3 py-1.5 text-xs font-medium transition-all duration-200 border-r border-[var(--color-border)] last:border-r-0 ${activePreset === preset.value
                                ? 'bg-[var(--color-primary)] text-white'
                                : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]'
                            }`}
                    >
                        <span className="mr-1">{preset.icon}</span>
                        {preset.label}
                    </button>
                ))}
            </div>

            {/* Custom Date Inputs */}
            {activePreset === 'custom' && (
                <div className="flex items-center gap-2 animate-in">
                    <input
                        type="date"
                        value={customStart}
                        onChange={(e) => setCustomStart(e.target.value)}
                        className="px-2.5 py-1.5 text-xs bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)]"
                    />
                    <span className="text-xs text-[var(--color-text-muted)]">to</span>
                    <input
                        type="date"
                        value={customEnd}
                        onChange={(e) => setCustomEnd(e.target.value)}
                        className="px-2.5 py-1.5 text-xs bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)]"
                    />
                    <button
                        onClick={handleCustomApply}
                        disabled={!customStart || !customEnd}
                        className="px-3 py-1.5 text-xs font-medium bg-[var(--color-primary)] text-white rounded-[var(--radius-md)] hover:bg-[var(--color-primary-dark)] transition-colors disabled:opacity-50"
                    >
                        Apply
                    </button>
                </div>
            )}
        </div>
    );
}
