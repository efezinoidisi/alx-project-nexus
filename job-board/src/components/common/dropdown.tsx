'use client';

import { DropdownProps } from '@/interfaces';
import { cn } from '@/utils';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

const Dropdown = ({
  options,
  label,
  handleSelect,
  value,
  name,
}: DropdownProps) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };
  return (
    <div className='w-full relative'>
      <div className='w-full relative'>
        <button
          onClick={toggleDropdown}
          className='w-full border border-grey justify-between capitalize rounded-xl p-3.8'
        >
          <span>{value || label}</span>
          <ChevronDown
            size={20}
            className={cn(
              'transition-all duration-200 ease-linear text-black',
              isDropdownVisible && 'rotate-180'
            )}
          />
        </button>

        {isDropdownVisible && (
          <AnimatePresence>
            <motion.div
              key={`${name}-dropdown`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.7, type: 'spring' }}
              className='space-y-1 absolute top-full mt-2 bg-white border border-grey p-3.8 w-full rounded-xl'
            >
              {options.map((option) => {
                const isSelectedOption = value === option.name;

                return (
                  <button
                    key={option.name}
                    onClick={() => {
                      handleSelect(option.name);
                      toggleDropdown();
                    }}
                    className={cn(
                      'py-1.5 w-full justify-start',
                      isSelectedOption ? 'bg-primary/10' : ''
                    )}
                  >
                    {option.name}
                  </button>
                );
              })}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
