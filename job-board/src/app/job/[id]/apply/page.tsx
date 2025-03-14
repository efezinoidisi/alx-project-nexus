import { getSession } from '@/lib/session';

interface JobApplicationPageProps {
  params: Promise<{ id: string }>;
}

export default async function JobApplicationPage({
  params,
}: JobApplicationPageProps) {
  const { id } = await params;
  const session = await getSession();

  return (
    <main>
      <h2>Job application page {id}</h2>
    </main>
  );
}
