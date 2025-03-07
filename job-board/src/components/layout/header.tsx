'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const Header = () => {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 1) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <header className='absolute w-full top-0 px-4 py-5 inset-x-0'>
      <Link href={''}>logo</Link>

      <nav></nav>
    </header>
  );
};

export default Header;
