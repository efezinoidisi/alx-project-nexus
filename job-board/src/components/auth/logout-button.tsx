'use client';

import { ICON_SIZE } from '@/constants';
import useSession from '@/hooks/use-session';
import { deleteSession } from '@/lib/session';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';

export default function LogoutButton() {
  const [isLoading, startTransition] = useTransition();
  const { updateSession } = useSession();
  const router = useRouter();

  const handleLogout = () => {
    startTransition(async () => {
      await deleteSession();
      updateSession(null);
      router.push('/login');
      toast.success('logout success!');
    });
  };

  return (
    <button
      className='flex items-center bg-accent/60 rounded-xl capitalize w-full justify-center py-1 text-white'
      onClick={handleLogout}
    >
      logout
      {isLoading && <Loader2 size={ICON_SIZE} className='animate-spin' />}
    </button>
  );
}
