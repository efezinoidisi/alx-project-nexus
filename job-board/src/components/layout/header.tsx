'use client';

import useSession from '@/hooks/use-session';
import { cn } from '@/utils';
import Link from 'next/link';
import UserDropdown from '../user';

const Header = () => {
  const { session } = useSession();

  return (
    <header
      className={cn(
        'sticky top-0   py-5 md:py-10 bg-background backdrop-blur-lg rounded-md shadow-sm w-full z-50'
      )}
    >
      <div className='w-11/12 md:w-5/6 mx-auto flex items-center justify-between '>
        <Link
          href={'/'}
          className='font-medium font-fira-code text-xl md:text-2xl'
        >
          Jobs
          <span className='text-primary'>GO</span>
        </Link>

        <nav>
          {session ? (
            <>
              <UserDropdown user={session.user} />
            </>
          ) : (
            <>
              <Link
                href={'/login'}
                className='capitalize  bg-accent text-white px-10 py-3 rounded-full border border-grey shadow-md font-semibold text-sm md:text-xl flex justify-center lg:hover:scale-105 transition-all duration-200 ease-linear'
              >
                get started
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
