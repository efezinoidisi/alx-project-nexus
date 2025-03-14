import { EXPERIENCE_LEVELS, JOB_TYPES } from '@/constants';
import useFilter from '@/hooks/use-filter';
import { useIsMobile } from '@/hooks/use-mobile';
import useToggle from '@/hooks/use-toggle';
import { JobListProps } from '@/interfaces';
import { cn } from '@/utils';
import { Filter, MapPinned } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import React from 'react';
import Checkbox from '../common/checkbox';
import Search from '../common/search';
import Category from '../filters/category';
import JobCard from './job-card';

const JobList: React.FC<JobListProps> = ({ jobs: allJobs }) => {
  const {
    filters,
    handleCategoryChange,
    selectedLevels,
    selectedTypes,
    toggleLevels,
    toggleTypes,
    applyFilters,
    handleLocationChange,
    resetFilters,
  } = useFilter();

  const [showFilters, toggleFiltersVisibility] = useToggle();

  const isMobile = useIsMobile();

  const shouldAnimate = isMobile && showFilters;

  const categories = allJobs
    .flatMap((job) => job.category)
    .filter((category, index, self) => self.indexOf(category) === index);
  const jobs = allJobs.filter((job) => {
    const category =
      filters.category === '' || job.category === filters.category;

    const search = filters.location
      ? job.location
          .toLowerCase()
          .includes(filters.location.trim().toLowerCase())
      : true;

    const jobTypes =
      filters.type.length > 0
        ? filters.type.some((jobtype) => job.type.includes(jobtype))
        : true;

    const experienceLevels =
      filters.level.length > 0
        ? filters.level.includes(job.experience_level.toLowerCase())
        : true;

    return category && search && jobTypes && experienceLevels;
  });
  return (
    <section className='px-4 py-7 md:py-10 md:px-11 lg:px-28'>
      <div className='mb-5 flex items-center justify-between'>
        <h2 className='font-semibold text-xl'>Job Board</h2>

        <button
          className='md:hidden'
          aria-label='show filters'
          onClick={toggleFiltersVisibility}
        >
          <Filter className='text-foreground' />
        </button>
      </div>

      <div className='flex mb-7 gap-x-1'>
        <Search
          Icon={MapPinned}
          name='location-search'
          id='location-search'
          placeholder='Search Location'
          value={filters.location}
          onChange={handleLocationChange}
          className='pl-8 bg-light'
          autoComplete='off'
        />
      </div>

      <section className='px-4 grid md:grid-cols-[1fr_auto] min-h-screen md:gap-6 lg:gap-16'>
        <div className='space-y-5'>
          {jobs.length > 0 ? (
            jobs.map((job) => <JobCard key={job.id} job={job} />)
          ) : (
            <div className='text-center oops  flex flex-col justify-start items-center'>
              <Image
                src={'/assets/images/oops-rafiki.png'}
                alt='not found'
                width={300}
                height={200}
                unoptimized
              />
              <p>No Job found!</p>
            </div>
          )}
        </div>

        {/* FILTERS */}
        <>
          {shouldAnimate && (
            <div
              className='inset-0 z-50 bg-black/50 fixed'
              onClick={toggleFiltersVisibility}
            />
          )}
          <motion.section
            id='filter section'
            className={cn(
              'hidden md:block md:w-2xs lg:w-[18.75rem] space-y-4',
              {
                'block fixed inset-0 bg-light h-5/6 mt-auto z-[1000] w-full px-10 py-5 rounded-t-3xl md:static  overflow-y-auto':
                  shouldAnimate,
              }
            )}
          >
            <div className='flex items-center justify-between'>
              <h3 className='font-semibold text-lg'>Filters</h3>

              <button onClick={resetFilters} className='text-accent'>
                reset
              </button>
            </div>
            <hr className='opacity-50' />
            <Category
              categories={categories}
              selectedCategory={filters.category}
              handleChange={handleCategoryChange}
            />
            {/* EXPERIENCE LEVEL */}
            <div className='space-y-1'>
              <h4 className='font-medium text-lg'>Experience Level</h4>
              <div className='space-y-1'>
                {EXPERIENCE_LEVELS.map((level) => (
                  <Checkbox
                    key={level}
                    value={level}
                    label={level}
                    checked={selectedLevels.includes(level)}
                    onChange={() => toggleLevels(level)}
                    className='gap-2'
                    labelStyles='capitalize'
                  />
                ))}
              </div>
            </div>
            {/* JOB TYPE */}
            <div className='space-y-1'>
              <h4 className='font-medium text-lg'>Job Type</h4>
              <div className='space-y-1'>
                {JOB_TYPES.map((jobType) => (
                  <Checkbox
                    key={jobType}
                    value={jobType}
                    label={jobType}
                    checked={selectedTypes.includes(jobType)}
                    onChange={() => toggleTypes(jobType)}
                    className='gap-2'
                    labelStyles='capitalize'
                  />
                ))}
              </div>
            </div>

            <div className='grid place-items-center'>
              <button
                className='capitalize  text-white disabled:bg-primary/30 bg-primary py-2 font-medium px-5 rounded-lg'
                onClick={applyFilters}
                disabled={
                  selectedTypes.length === 0 && selectedLevels.length === 0
                }
              >
                Apply filters
              </button>
            </div>
          </motion.section>
        </>
      </section>
    </section>
  );
};

export default JobList;
