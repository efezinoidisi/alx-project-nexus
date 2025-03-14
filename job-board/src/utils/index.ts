import { Job } from '@/interfaces';
import { api } from '@/lib/api';
import { clsx, type ClassValue } from 'clsx';
import { formatDistanceToNow } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTimeAgo(value: string) {
  const date = new Date(value);

  return formatDistanceToNow(date, { addSuffix: true });
}

export async function fetchJob(id: string): Promise<Job | undefined> {
  try {
    const res = await api.get(`/job/${id}/`);

    if (res.status !== 200) return undefined;

    return res.data;
  } catch (error) {
    console.log(error);

    return undefined;
  }
}
