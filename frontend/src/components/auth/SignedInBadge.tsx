import { useGetCallerUserProfile } from '../../features/auth/useCurrentUser';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User } from 'lucide-react';

export default function SignedInBadge() {
  const { data: userProfile, isLoading } = useGetCallerUserProfile();

  if (isLoading) {
    return null;
  }

  const displayName = userProfile?.name || 'User';
  const initials = displayName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <Badge variant="secondary" className="gap-2 px-3 py-1.5">
      <Avatar className="h-5 w-5">
        <AvatarFallback className="text-xs bg-primary/10">
          {initials || <User className="h-3 w-3" />}
        </AvatarFallback>
      </Avatar>
      <span className="text-sm font-medium">{displayName}</span>
    </Badge>
  );
}
