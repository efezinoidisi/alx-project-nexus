import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }).trim(),
  password: z
    .string()
    .min(4, { message: 'password must be at least 4 characters' })
    .trim(),
});

export const applicantSignupSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }).trim(),
  password: z
    .string()
    .min(4, { message: 'password must be at least 4 characters' })
    .trim(),
  phone: z.string().optional(),
  first_name: z.string().min(1, { message: 'Please enter your first name' }),
  last_name: z.string().min(1, { message: 'Please enter your last name' }),

  role: z.enum(['user', 'employer']),
});

export type ApplicantSignup = z.infer<typeof applicantSignupSchema>;

export type Login = z.infer<typeof loginSchema>;

export const jobApplicationSchema = z.object({
  resume_link: z
    .string()
    .url({ message: 'Please provide a valid url' })
    .min(1, { message: 'resume link is required' })
    .max(255, { message: 'url is too long' }),
  cover_letter: z.string().min(1, { message: 'please provide a cover letter' }),
  job: z.string().min(1),
});

export type JobApplication = z.infer<typeof jobApplicationSchema>;
