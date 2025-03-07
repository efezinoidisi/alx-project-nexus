import { useState } from 'react';

export default function useToggle(
  defaultValue: boolean = false
): [boolean, () => void] {
  const [value, setValue] = useState(defaultValue);

  const toggleValue = () => {
    setValue((prev) => !prev);
  };

  return [value, toggleValue];
}
