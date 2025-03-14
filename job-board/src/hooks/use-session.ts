import { SessionContext } from '@/contexts/session-context';
import { use } from 'react';

export default function useSession() {
  const sessionContext = use(SessionContext);

  if (!sessionContext) {
    throw new Error('Must be within SessionProvider');
  }

  return sessionContext;
}
