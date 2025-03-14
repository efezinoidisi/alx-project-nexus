import SignupForm from '@/components/auth/signup-form';
import { getSession } from '@/lib/session';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function SignupPage() {
  const session = await getSession();

  if (session) {
    redirect('/');
  }
  return (
    <main className='grid place-items-center py-5 md:py-10 bg-primary/10 w-full max-w-md mx-auto mt-14 mb-10 rounded-4xl relative px-5'>
      <div className='my-5 space-y-1 text-center'>
        <h2 className='font-medium text-xl'>Join the number 1 Job board</h2>
        <p className='text-sm text-gray-500'>Apply for all kinds of Jobs</p>
      </div>

      <SignupForm />

      <div className='mt-3'>
        <p className='text-sm'>
          Already have an account?{' '}
          <Link href={'/login'} className='text-primary font-bold'>
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
