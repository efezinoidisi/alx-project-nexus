'use client';

import { ApplicantSignup, applicantSignupSchema } from '@/lib/schemas';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { signupAction } from '@/actions/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Field from '../common/field';
import Input from '../common/input';
import PasswordInput from '../common/password-input';

const SignupForm = () => {
  const [isLoading, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ApplicantSignup>({
    resolver: zodResolver(applicantSignupSchema),
    mode: 'onChange',
    defaultValues: {
      role: 'user',
    },
  });

  const onSubmit = handleSubmit((data) => {
    startTransition(async () => {
      const res = await signupAction(data);

      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  });

  return (
    <form onSubmit={onSubmit} className='w-full bg-white p-10 rounded-t-4xl'>
      <div className='space-y-4'>
        <div className='flex flex-col gap-4 md:flex-row'>
          <Field
            label='First Name'
            id='first_name'
            error={errors.first_name?.message}
          >
            <Input {...register('first_name')} />
          </Field>

          <Field
            label='Last Name'
            id='last_name'
            error={errors.last_name?.message}
          >
            <Input {...register('last_name')} />
          </Field>
        </div>
        <Field label='Email' id='email' error={errors.email?.message}>
          <Input {...register('email')} />
        </Field>

        <Field label='Password' id='password' error={errors.password?.message}>
          <PasswordInput {...register('password')} />
        </Field>
      </div>

      <div className='mt-5 flex justify-center'>
        <button
          disabled={!isValid || isLoading}
          className='gradient2 text-white rounded-full px-10 py-2 capitalize flex items-center gap-2 disabled:opacity-40'
        >
          create account
          {isLoading && <Loader2 className='animate-spin' />}
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
