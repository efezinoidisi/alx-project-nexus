import { SearchProps } from '@/interfaces';
import React from 'react';
import Input from './input';

const Search: React.FC<SearchProps> = ({ Icon, ...otherProps }) => {
  return (
    <div className='relative w-full ml:max-w-80'>
      {Icon ? (
        <Icon
          className='absolute top-1/2 -translate-y-1/2 left-2 text-foreground/50'
          size={17}
        />
      ) : null}
      <Input type='search' {...otherProps} />
    </div>
  );
};

export default Search;
