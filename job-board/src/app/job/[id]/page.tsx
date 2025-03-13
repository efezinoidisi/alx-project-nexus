import { api } from "@/lib/api";
import { notFound } from "next/navigation";

interface JobDetailsPageProps {
  params: Promise<{ id: string }>;
}

const fetchJob = async (id: string) => {
  try {
    const res = await api.get(`/job/${id}/`);

    if (res.status !== 200) return undefined;

    return res.data;
  } catch (error) {
    console.log(error);

    return undefined;
  }
};

export default async function JobDetailsPage({ params }: JobDetailsPageProps) {
  const { id } = await params;

  const job = await fetchJob(id);
  if (!job) {
    notFound();
  }

  console.log(job);

  return <main>page</main>;
}
