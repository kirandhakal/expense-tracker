import { Member } from '@/types';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

interface MemberCardProps {
    member: Member;
}

const roleBadgeVariant: Record<string, 'success' | 'info' | 'warning' | 'default'> = {
    owner: 'success',
    admin: 'info',
    member: 'default',
    child: 'warning',
};

const accountTypeLabels: Record<string, string> = {
    personal: '👤 Personal',
    family: '👨‍👩‍👧‍👦 Family',
    business: '💼 Business',
};

export default function MemberCard({ member }: MemberCardProps) {
    return (
        <Card interactive id={`member-${member.id}`}>
            <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-[var(--color-primary-50)] text-[var(--color-primary)] flex items-center justify-center text-base font-bold flex-shrink-0">
                    {member.avatar}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-[var(--color-text-primary)] truncate">
                            {member.name}
                        </h3>
                        <Badge variant={roleBadgeVariant[member.role] || 'default'}>
                            {member.role}
                        </Badge>
                    </div>
                    <p className="text-xs text-[var(--color-text-muted)] truncate">
                        {member.email}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs text-[var(--color-text-muted)]">
                            {accountTypeLabels[member.accountType]}
                        </span>
                        <span className="text-xs text-[var(--color-text-muted)]">
                            Joined{' '}
                            {new Date(member.joinedDate).toLocaleDateString('en-US', {
                                month: 'short',
                                year: 'numeric',
                            })}
                        </span>
                    </div>
                </div>
            </div>
        </Card>
    );
}
