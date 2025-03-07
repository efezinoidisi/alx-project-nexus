import { LucideIcon } from 'lucide-react';

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  category: string;
  experienceLevel: string;
  description: string;
  salaryRange: string;
  jobType: string;
  postedDate: string;
  applicationDeadline: string;
  skillsRequired: Array<string>;
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
