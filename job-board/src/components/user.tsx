import useToggle from '@/hooks/use-toggle';
import { User } from '@/interfaces';
import { UserIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import LogoutButton from './auth/logout-button';

const UserDropdown: React.FC<{ user: User }> = ({ user }) => {
  const [isVisible, toggle] = useToggle();

  return (
    <div className='relative'>
      <button
        type='button'
        aria-label='user-dropdown'
        className='bg-accent/20 p-2 rounded-full'
        onClick={toggle}
      >
        <UserIcon size={30} fill='#fff' color='#fff' />
      </button>

      <AnimatePresence mode='wait'>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: 1,
              y: 1,
              transition: { duration: 0.3, ease: 'easeInOut' },
            }}
            exit={{ opacity: 0, y: 10 }}
            className='absolute bg-white top-full mt-2 rounded-2xl border border-grey w-fit right-0 p-3 space-y-2 overflow-hidden max-w-48'
          >
            <p className='text-sm truncate'>{user.email}</p>
            <LogoutButton />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDropdown;
