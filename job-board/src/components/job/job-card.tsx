import { JobCardProps } from '@/interfaces';
import Link from 'next/link';
import React from 'react';

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const { title, id, company, location, category, salaryRange } = job;

  const salary = salaryRange.split('-');

  return (
    <div className='flex flex-col md:flex-row items-center bg-white border-grey rounded-xl p-4 w-full space-y-4 md:space-y-2.5 md:py-2.5 h-fit'>
      <div className='space-y-4 md:space-y-2.5 w-full'>
        <span className='inline-block uppercase text-xs'>{company}</span>
        <h3 className='capitalize font-bold md:text-lg'>{title}</h3>
        <div className='flex items-center gap-2 text-gray-500 text-xs lg:text-sm flex-wrap md:flex-nowrap'>
          <p>{location}</p>
          <span className='size-[3px] bg-gray-500 rounded-full' />
          <p>{category}</p>
          <span className='size-[3px] bg-gray-500 rounded-full' />{' '}
          <p>From {salary[0]}</p>
        </div>
      </div>
      <div className='w-full md:w-fit'>
        <Link
          href={''}
          className='gradient2 p-2.5 rounded-full bg-gray-400 font-medium px-3.5 text-nowrap w-full flex justify-center text-light'
        >
          Apply Now
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
