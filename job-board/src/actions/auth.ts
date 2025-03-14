import { ApplicantSignup, Login } from '@/constants/schemas';
import { api } from '@/lib/api';
import {
  createSession,
  deleteSession,
  getSession,
  SessionPayload,
} from '@/lib/session';
import { isAxiosError } from 'axios';

export async function loginAction(formData: Login) {
  try {
    const res = await api.post('/auth/login/', formData);

    const expiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000);

    const session: SessionPayload = {
      user: res.data.user,
      accessToken: res.data.access_token,
      refreshToken: res.data.refresh_token,
      expiresAt,
    };

    await createSession(session);

    return {
      success: true,
      message: 'Login success!',
    };
  } catch (error) {
    console.log(error, 'error');
    return {
      success: false,
      message:
        isAxiosError(error) && error.response?.data
          ? Object.values(error.response.data).toString()
          : 'Error logging in, please try again',
    };
  }
}

export async function signupAction(formData: ApplicantSignup) {
  try {
    const res = await api.post('/auth/signup/', formData);

    return {
      success: true,
      message: res.data.message,
    };
  } catch (error) {
    console.log(error, 'error');
    return {
      success: false,
      message:
        isAxiosError(error) && error.response?.data
          ? Object.values(error.response.data).toString()
          : 'Error creating account, please try again',
    };
  }
}

export async function logout() {
  const session = await getSession();

  if (!session) return;

  try {
    const res = await api.post('/auth/logout/', {
      refresh_token: session.refreshToken,
    });

    if (res.status !== 200) return;
    await deleteSession();
  } catch (error) {
    console.log(error);
  }
}
