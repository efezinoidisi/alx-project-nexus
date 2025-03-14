'use server';

import { api } from '@/lib/api';
import { JobApplication } from '@/lib/schemas';
import { getSession } from '@/lib/session';
import { isAxiosError } from 'axios';

export async function applyForJobAction(data: JobApplication) {
  try {
    const session = await getSession();

    const res = await api.post('/application/', data, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });

    if (res.status === 201) {
      return { success: true, message: 'Applied successfully!' };
    }
    return { success: false, message: '' };
  } catch (error) {
    return {
      success: false,
      message:
        isAxiosError(error) && error.response?.data
          ? Object.values(error.response.data).toString()
          : 'An error occurred',
    };
  }
}
