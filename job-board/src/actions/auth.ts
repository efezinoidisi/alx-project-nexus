import { ApplicantSignup, Login } from '@/constants/schemas';
import { api } from '@/lib/api';
import { isAxiosError } from 'axios';

export async function loginAction(formData: Login) {
  try {
    const res = await api.post('/auth/login/', formData);

    console.log(res);

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
