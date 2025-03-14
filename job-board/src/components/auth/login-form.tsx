'use client';

import { Login, loginSchema } from '@/lib/schemas';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { loginAction } from '@/actions/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import Field from '../common/field';
import Input from '../common/input';
import PasswordInput from '../common/password-input';

const LoginForm = () => {
  const [isLoading, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Login>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = handleSubmit((data) => {
    startTransition(async () => {
      const res = await loginAction(data);
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
        <Field label='Email' id='email' error={errors.email?.message}>
          <Input {...register('email')} />
        </Field>

        <Field label='Password' id='password' error={errors.password?.message}>
          <PasswordInput {...register('password')} />
        </Field>
      </div>
      <div className='mt-2 flex justify-end'>
        <Link href={''} className='font-medium text-sm text-red-700'>
          Forgot password
        </Link>
      </div>

      <div className='mt-5 flex justify-center'>
        <button
          disabled={!isValid || isLoading}
          className='gradient2 text-white rounded-full px-10 py-2 disabled:opacity-40 flex items-center gap-2'
        >
          Login
          {isLoading && <Loader2 className='animate-spin' />}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
