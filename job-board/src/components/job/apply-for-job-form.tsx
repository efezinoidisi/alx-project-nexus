'use client';

import { applyForJobAction } from '@/actions/job';
import { ICON_SIZE } from '@/constants';
import { JobApplicationFormProps } from '@/interfaces';
import { JobApplication, jobApplicationSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Field from '../common/field';
import Input from '../common/input';

export default function ApplyForJobForm({ jobId }: JobApplicationFormProps) {
  const router = useRouter();

  const [isLoading, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobApplication>({
    resolver: zodResolver(jobApplicationSchema),
    defaultValues: {
      job: jobId,
    },
  });

  const onSubmit = handleSubmit((data) => {
    startTransition(async () => {
      const res = await applyForJobAction(data);

      if (res.success) {
        router.back();
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  });
  return (
    <form
      onSubmit={onSubmit}
      className='bg-white w-11/12 mx-auto md:w-1/2 px-3 py-5 rounded-t-2xl max-w-md'
    >
      <div className='space-y-4'>
        <Field
          label='Resume Link'
          id='resume_link'
          error={errors.resume_link?.message}
        >
          <Input
            {...register('resume_link')}
            id='resume_link'
            placeholder='https://resumelink.example'
          />
        </Field>

        <Field
          label='Cover Letter'
          id='cover_letter'
          error={errors.cover_letter?.message}
        >
          <textarea
            {...register('cover_letter')}
            rows={4}
            cols={30}
            className='border border-grey bg-primary/2 w-full p-[15px] rounded-xl placeholder:text-foreground/50 placeholder:text-sm font-medium outline-none focus-within:outline-primary/20 focus-within:border-primary/50  resize-none'
            placeholder='Enter your cover letter'
          ></textarea>
        </Field>
      </div>

      <div className='flex justify-center mt-10'>
        <button
          className='uppercase w-full flex items-center gap-2 justify-center bg-accent text-white py-3 rounded-xl font-semibold text-lg disabled:opacity-40'
          disabled={isLoading}
        >
          send
          {isLoading && <Loader2 size={ICON_SIZE} className='animate-spin' />}
        </button>
      </div>
    </form>
  );
}
