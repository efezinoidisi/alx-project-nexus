import useToggle from "@/hooks/use-toggle";
import { cn } from "@/utils";
import { Eye, EyeClosed } from "lucide-react";
import React from "react";

type PasswordInputProps = React.ComponentProps<"input"> & {
  isError?: boolean;
};

const PasswordInput: React.FC<PasswordInputProps> = ({
  className,
  isError,
  ...otherProps
}) => {
  const [isVisible, toggleVisibility] = useToggle();

  const type = isVisible ? "text" : "password";

  return (
    <div className='flex justify-between items-center relative'>
      <input
        type={type}
        className={cn(
          "border bg-primary/2 border-grey w-full p-[15px] rounded-xl placeholder:text-grey placeholder:text-sm font-medium outline-none focus-within:outline-primary/20 focus-within:border-primary/50 h-[3.25rem] resize-none",
          className,
          isError && "border-danger"
        )}
        {...otherProps}
      />
      <button
        type='button'
        onClick={toggleVisibility}
        aria-label='toggle password visibility'
        className='absolute top-1/2 -translate-y-1/2 right-4 z-10 cursor-pointer'
      >
        {isVisible ? <Eye /> : <EyeClosed />}
      </button>
    </div>
  );
};

export default PasswordInput;
