'use client';

import { SessionContextInterface, SessionPayload } from '@/interfaces';
import { getSession } from '@/lib/session';
import { createContext, ReactNode, useEffect, useState } from 'react';

const SessionContext = createContext<SessionContextInterface | null>(null);

SessionContext.displayName = 'SessionContext';

const SessionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<SessionPayload | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const res = await getSession();

      if (res) {
        setSession(res);
      }
    };

    fetchSession();
  }, []);

  const updateSession = (newSession: SessionPayload | null) => {
    setSession(newSession);
  };

  return (
    <SessionContext value={{ session, updateSession }}>
      {children}
    </SessionContext>
  );
};

export { SessionContext, SessionProvider };
