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

const roleOptions = [
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

    // Form state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState<MemberRole>('member');
    const [accountType, setAccountType] = useState<AccountType>('personal');

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !email.trim()) return;

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
        setShowForm(false);
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
                            <Select
                                label="Role"
                                options={roleOptions}
                                value={role}
                                onChange={(e) => setRole(e.target.value as MemberRole)}
                            />
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
