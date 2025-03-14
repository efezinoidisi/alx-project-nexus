'use client';

import { ICON_SIZE } from '@/constants';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <main className='flex flex-col justify-center items-center gap-5 min-h-96 md:min-h-screen'>
      <h2 className='text-4xl font-bold'>Not Found</h2>
      <p className='text-center'>Could not find requested resource</p>
      <div className='flex items-center gap-5'>
        <Link href='/' className='border py-2 px-5 rounded-full'>
          Return Home
        </Link>

        <button
          className='bg-black py-2 px-5 rounded-full text-white flex items-center gap-2'
          onClick={() => router.back()}
        >
          <ChevronLeft size={ICON_SIZE} /> Go back
        </button>
      </div>
    </main>
  );
}
