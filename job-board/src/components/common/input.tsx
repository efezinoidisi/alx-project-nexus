import { InputProps } from '@/interfaces';
import { cn } from '@/utils';
import React from 'react';

const Input: React.FC<InputProps> = ({ className, isError, ...otherProps }) => {
  return (
    <input
      className={cn(
        'border border-grey w-full p-[15px] rounded-xl placeholder:text-foreground/50 placeholder:text-sm font-medium outline-none focus-within:outline-primary/20 focus-within:border-primary/50  h-[3.25rem] resize-none',
        className,
        { 'border-danger': isError }
      )}
      {...otherProps}
    />
  );
};

export default Input;
