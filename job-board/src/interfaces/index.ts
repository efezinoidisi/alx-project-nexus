import { LucideIcon } from 'lucide-react';

export interface Job {
  id: string;
  no_of_applicants: string;
  title: string;
  company: string;
  location: string;
  wage: string;
  type: string[];
  experience_level: string;
  description: string;
  posted_at: string;
  responsibilities: string[];
  required_skills: string[];
  picture: string;
  industry: string;
  category: string;
  posted_by: string;
  is_active: boolean;
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name?: string;
  is_staff: boolean;
  is_active: boolean;
  phone: string;
}

export interface JobCardProps {
  job: Job;
}

export interface InputProps extends React.ComponentProps<'input'> {
  isError?: boolean;
}

export interface FieldProps {
  label: string;
  children: React.ReactNode;
  id?: string;
  error?: string;
}

export interface CheckboxProps extends React.ComponentProps<'input'> {
  label: string;
  labelStyles?: string;
}

export interface DropdownProps {
  options: Array<{ name: string; icon?: string }>;
  label: string;
  value: string;
  handleSelect: (value: string) => void;
  name: string;
}

export interface SearchProps extends React.ComponentProps<'input'> {
  Icon?: LucideIcon;
}

export interface JobApplicationSearchParams {
  title: string;
  company: string;
}

export interface JobApplicationPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<JobApplicationSearchParams>;
}

export interface JobApplicationFormProps {
  jobId: string;
}
