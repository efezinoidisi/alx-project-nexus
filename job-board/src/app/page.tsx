"use client";

import JobList from "@/components/job/job-list";
import useJobs from "@/hooks/use-jobs";

export default function Home() {
  const { jobs, isError, isLoading } = useJobs();

  return (
    <main>
      <section className='h-[50vh] grid place-items-center hero'>
        <h1 className='text-center font-bold text-xl text-balance md:text-3xl leading-relaxed'>
          Join a network of over 10,000 Freelancers that are fiding work they
          love and making a great living
        </h1>
      </section>

      {isLoading ? (
        <div>
          <p>fetching jobs</p>
        </div>
      ) : (
        <JobList jobs={jobs} />
      )}
    </main>
  );
}
