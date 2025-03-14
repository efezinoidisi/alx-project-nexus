import { ICON_SIZE } from "@/constants";
import { Job } from "@/interfaces";
import { api } from "@/lib/api";
import { getTimeAgo } from "@/utils";
import {
  CircleCheckBig,
  Clock,
  Clock4,
  GraduationCap,
  MapPin,
  Pen,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface JobDetailsPageProps {
  params: Promise<{ id: string }>;
}

const fetchJob = async (id: string): Promise<Job | undefined> => {
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

  const timeAgo = getTimeAgo(job.posted_at);

  return (
    <main className='py-5 md:py-10 w-11/12 md:w-5/6 mx-auto space-y-10'>
      <section className='border rounded-2xl pt-3 md:pt-5'>
        <div className='flex items-start gap-3 md:gap-5 px-3 md:px-5'>
          <Image
            src={job.picture}
            alt={job.company}
            width={100}
            height={100}
            className='rounded-full border border-primary size-10 md:size-20 lg:size-24'
          />
          <div className='space-y-1.5'>
            <h1 className='text-3xl md:text-4xl lg:text-5xl font-semibold'>
              {job.title}
            </h1>
            <p className='text-sm md:text-base'>{job.company}</p>
          </div>
        </div>

        <div className='flex items-center gap-2 flex-wrap my-3 px-3 md:px-5'>
          <div className='flex items-center gap-1 capitalize text-xs md:text-sm bg-grey w-fit rounded-full py-1 px-3 border-[0.5px] border-accent'>
            <MapPin size={ICON_SIZE} />
            <p>{job.location}</p>
          </div>

          <div className='flex items-center gap-1 capitalize text-xs md:text-sm bg-grey w-fit rounded-full py-1 px-3 border-[0.5px] border-accent'>
            <GraduationCap size={ICON_SIZE} />
            <p className='capitalize'>{job.experience_level} level</p>
          </div>
          <div className='flex items-center gap-1 capitalize text-xs md:text-sm bg-grey w-fit rounded-full py-1 px-3 border-[0.5px] border-accent'>
            <Clock4 size={ICON_SIZE} />
            <p>{job.type.toString()}</p>
          </div>
        </div>

        <div className='flex items-center justify-between border-t py-3 px-3 text-sm md:text-base md:px-5'>
          <div className='flex items-center gap-1'>
            <Clock size={ICON_SIZE} />
            <p>posted {timeAgo}</p>
          </div>

          <p className=''>
            <span className='font-bold text-lg md:text-xl'>${job.wage}</span>
            <sub>/month</sub>{" "}
          </p>
        </div>
      </section>

      <section className='space-y-5 bg-white p-3 md:p-5 rounded-2xl'>
        <div className='flex items-center gap-2'>
          <div className='bg-grey rounded-xl p-3'>
            <Pen size={25} className='text-primary' />
          </div>
          <h2 className='font-semibold text-xl md:text-2xl lg:text-3xl'>
            Job Description
          </h2>
        </div>

        <p className='text-lg'>{job.description}</p>
      </section>

      <section className='space-y-5 bg-white p-3 md:p-5 rounded-2xl'>
        <div className='flex items-center gap-2'>
          <div className='bg-grey rounded-xl p-3'>
            <CircleCheckBig size={25} className='text-primary' />
          </div>
          <h2 className='font-semibold text-xl md:text-2xl lg:text-3xl'>
            Skills
          </h2>
        </div>

        <ul className='space-y-2'>
          {job.required_skills?.map((skill, index) => (
            <li key={index} className='list-disc list-inside'>
              {skill}
            </li>
          ))}
        </ul>
      </section>

      <section className='space-y-5 bg-white p-3 md:p-5 rounded-2xl'>
        <div className='flex items-center gap-2'>
          <div className='bg-grey rounded-xl p-3'>
            <User size={25} className='text-primary' />
          </div>
          <h2 className='font-semibold text-xl md:text-2xl lg:text-3xl'>
            Your Role
          </h2>
        </div>

        <ul className='space-y-2'>
          {job.responsibilities?.map((skill, index) => (
            <li key={index} className='list-disc list-inside'>
              {skill}
            </li>
          ))}
        </ul>
      </section>

      <div className='flex justify-center'>
        {job.is_active ? (
          <Link
            href={`/apply/${id}`}
            className='gradient2 py-3 px-16 rounded-full text-white font-semibold text-lg md:text-xl hover:scale-105 transition-all duration-200 ease-linear'
          >
            Apply now
          </Link>
        ) : (
          <p className='bg-grey py-3 font-medium text-lg md:text-xl rounded-lg px-2'>
            No longer accepting applications
          </p>
        )}
      </div>
    </main>
  );
}
