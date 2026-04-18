'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import MemberCard from '@/components/features/MemberCard';
import { mockMembers } from '@/data/mockData';
import { Member, AccountType, MemberRole } from '@/types';

const accountTypeOptions = [
    { value: 'personal', label: 'Personal' },
    { value: 'family', label: 'Family' },
    { value: 'business', label: 'Business' },
];

// Default hardcoded roles
const defaultRoles = [
    { value: 'owner', label: 'Owner' },
    { value: 'admin', label: 'Admin' },
    { value: 'member', label: 'Member' },
    { value: 'child', label: 'Child' },
];

const filterTabs = [
    { value: 'all', label: 'All' },
    { value: 'personal', label: '👤 Personal' },
    { value: 'family', label: '👨‍👩‍👧‍👦 Family' },
    { value: 'business', label: '💼 Business' },
];

export default function MembersPage() {
    const [members, setMembers] = useState<Member[]>(mockMembers);
    const [showForm, setShowForm] = useState(false);
    const [activeTab, setActiveTab] = useState('all');

    // Dynamic roles (includes hardcoded + user-created)
    const [customRoles, setCustomRoles] = useState<{ value: string; label: string }[]>([]);
    const allRoleOptions = [
        ...defaultRoles,
        ...customRoles,
        { value: '__other__', label: '✏️ Other (custom)' },
    ];

    // Form state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState<MemberRole>('member');
    const [accountType, setAccountType] = useState<AccountType>('personal');
    const [customRoleInput, setCustomRoleInput] = useState('');
    const [showCustomRoleInput, setShowCustomRoleInput] = useState(false);

    const handleRoleChange = (value: string) => {
        if (value === '__other__') {
            setShowCustomRoleInput(true);
            setRole('');
        } else {
            setShowCustomRoleInput(false);
            setRole(value as MemberRole);
        }
    };

    const handleCustomRoleConfirm = () => {
        const trimmed = customRoleInput.trim();
        if (!trimmed) return;

        const normalizedValue = trimmed.toLowerCase().replace(/\s+/g, '-');

        // Check if already exists
        const exists = allRoleOptions.some(
            (r) => r.value === normalizedValue || r.label.toLowerCase() === trimmed.toLowerCase()
        );

        if (!exists) {
            setCustomRoles((prev) => [
                ...prev,
                { value: normalizedValue, label: trimmed.charAt(0).toUpperCase() + trimmed.slice(1) },
            ]);
        }

        setRole(normalizedValue as MemberRole);
        setShowCustomRoleInput(false);
        setCustomRoleInput('');
    };

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !email.trim() || !role) return;

        const newMember: Member = {
            id: `mem-${Date.now()}`,
            name: name.trim(),
            email: email.trim(),
            role,
            avatar: name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2),
            accountType,
            joinedDate: new Date().toISOString().split('T')[0],
        };

        setMembers([...members, newMember]);
        setName('');
        setEmail('');
        setRole('member');
        setShowForm(false);
        setShowCustomRoleInput(false);
        setCustomRoleInput('');
    };

    const filtered =
        activeTab === 'all'
            ? members
            : members.filter((m) => m.accountType === activeTab);

    // Count by type
    const countByType = (type: string) =>
        type === 'all'
            ? members.length
            : members.filter((m) => m.accountType === type).length;

    return (
        <DashboardLayout pageTitle="Members">
            {/* Tabs */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
                {filterTabs.map((tab) => (
                    <button
                        key={tab.value}
                        onClick={() => setActiveTab(tab.value)}
                        className={`px-4 py-2 text-sm font-medium rounded-[var(--radius-md)] transition-colors ${activeTab === tab.value
                            ? 'bg-[var(--color-primary)] text-white'
                            : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)]'
                            }`}
                    >
                        {tab.label}{' '}
                        <span className="ml-1 text-xs opacity-75">
                            ({countByType(tab.value)})
                        </span>
                    </button>
                ))}

                <button
                    onClick={() => setShowForm(!showForm)}
                    className="ml-auto px-4 py-2 text-sm font-medium rounded-[var(--radius-md)] bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition-colors"
                >
                    {showForm ? 'Cancel' : '+ Add Member'}
                </button>
            </div>

            {/* Add Member Form */}
            {showForm && (
                <Card className="mb-6" id="add-member-form">
                    <h2 className="text-base font-semibold text-[var(--color-text-primary)] mb-4">
                        Add New Member
                    </h2>
                    <form onSubmit={handleAdd} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input
                                label="Full Name"
                                placeholder="e.g., Sita Dhakal"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <Input
                                label="Email"
                                type="email"
                                placeholder="e.g., sita@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Select
                                label="Account Type"
                                options={accountTypeOptions}
                                value={accountType}
                                onChange={(e) =>
                                    setAccountType(e.target.value as AccountType)
                                }
                            />
                            <div className="flex flex-col gap-1.5">
                                <Select
                                    label="Role"
                                    options={allRoleOptions}
                                    value={showCustomRoleInput ? '__other__' : role}
                                    onChange={(e) => handleRoleChange(e.target.value)}
                                />

                                {/* Custom Role Input */}
                                {showCustomRoleInput && (
                                    <div className="flex gap-2 mt-1">
                                        <input
                                            type="text"
                                            value={customRoleInput}
                                            onChange={(e) => setCustomRoleInput(e.target.value)}
                                            placeholder="Type custom role name..."
                                            className="flex-1 px-3 py-2 text-sm bg-[var(--color-bg)] border border-[var(--color-border)] rounded-[var(--radius-md)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)]"
                                            autoFocus
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    handleCustomRoleConfirm();
                                                }
                                            }}
                                        />
                                        <button
                                            type="button"
                                            onClick={handleCustomRoleConfirm}
                                            disabled={!customRoleInput.trim()}
                                            className="px-3 py-2 text-sm font-medium bg-[var(--color-success)] text-white rounded-[var(--radius-md)] hover:opacity-90 disabled:opacity-50 transition-colors"
                                        >
                                            ✓
                                        </button>
                                    </div>
                                )}

                                {/* Show existing custom roles info */}
                                {customRoles.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        <span className="text-[10px] text-[var(--color-text-muted)]">Custom roles:</span>
                                        {customRoles.map((cr) => (
                                            <span
                                                key={cr.value}
                                                className="text-[10px] px-1.5 py-0.5 bg-[var(--color-primary-50)] text-[var(--color-primary)] rounded-full"
                                            >
                                                {cr.label}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-end pt-2">
                            <Button type="submit" size="lg">
                                Add Member
                            </Button>
                        </div>
                    </form>
                </Card>
            )}

            {/* Members grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filtered.map((member) => (
                    <MemberCard key={member.id} member={member} />
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-[var(--color-text-muted)]">
                        No members found in this category.
                    </p>
                </div>
            )}
        </DashboardLayout>
    );
}
