import ApplyForJobForm from '@/components/job/apply-for-job-form';
import { JobApplicationPageProps } from '@/interfaces';
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';

export default async function JobApplicationPage({
  params,
  searchParams,
}: JobApplicationPageProps) {
  const { id } = await params;

  const { company, title } = await searchParams;
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  return (
    <main className='py-5 md:py-10 space-y-10'>
      <div className='text-center space-y-2'>
        <h1 className='font-semibold capitalize text-3xl md:text-4xl'>
          Job application
        </h1>

        <p className='text-lg'>
          <span className='font-semibold border-b-2'> {title}</span> at{' '}
          <span className='font-semibold'>{company}</span>
        </p>
      </div>
      <ApplyForJobForm jobId={id} />
    </main>
  );
}
